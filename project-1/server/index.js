require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const msal = require('@azure/msal-node');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Simple in-memory token store (for demo only)
const tokenStore = new Map();

let pca = null;
if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.TENANT_ID) {
  const msalConfig = {
    auth: {
      clientId: process.env.CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
      clientSecret: process.env.CLIENT_SECRET,
    }
  };
  pca = new msal.ConfidentialClientApplication(msalConfig);
} else {
  console.warn('MSAL not configured. Set CLIENT_ID, CLIENT_SECRET, TENANT_ID in .env to enable OAuth.');
}

app.get('/auth/login', async (req, res) => {
  if (!pca) return res.status(500).send('Server not configured for OAuth. See .env.example');
  const redirect = req.query.redirect || '/';
  const authCodeUrlParameters = {
    scopes: ["user.read", "offline_access", "Calendars.ReadWrite", "Tasks.ReadWrite"],
    redirectUri: (process.env.BASE_URL || `http://localhost:${PORT}`) + '/auth/callback',
    state: encodeURIComponent(redirect)
  };

  try {
    const authUrl = await pca.getAuthCodeUrl(authCodeUrlParameters);
    res.redirect(authUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create auth URL');
  }
});

app.get('/auth/callback', async (req, res) => {
  if (!pca) return res.status(500).send('Server not configured for OAuth.');
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read", "offline_access", "Calendars.ReadWrite", "Tasks.ReadWrite"],
    redirectUri: (process.env.BASE_URL || `http://localhost:${PORT}`) + '/auth/callback',
  };
  try {
    const response = await pca.acquireTokenByCode(tokenRequest);
    if (!response) return res.status(500).send('Token acquisition failed');
    const account = response.account;
    // Store tokens in memory keyed by username
    const key = account.username || account.homeAccountId || 'user';
    tokenStore.set(key, response);

    // Set a cookie so browser requests can identify the user (demo only)
    res.cookie('x-user', key, { httpOnly: false });

    // Redirect back to requested page
    const state = req.query.state ? decodeURIComponent(req.query.state) : '/';
    res.send(`Authentication successful. You can close this window and return to the app. <a href="${state}">Continue</a>`);
  } catch (err) {
    console.error('Callback error', err);
    res.status(500).send('Authentication error');
  }
});

function getTokenForRequest(req) {
  // Try cookie or header
  const user = req.cookies && req.cookies['x-user'] ? req.cookies['x-user'] : (req.headers['x-user'] || null);
  if (!user) return null;
  return tokenStore.get(user) || null;
}

app.get('/api/calendar', async (req, res) => {
  if (!pca) return res.status(500).json({ error: 'Server not configured for OAuth' });

  const tokenResp = getTokenForRequest(req);
  if (!tokenResp) return res.status(401).json({ error: 'Not authenticated' });

  const accessToken = tokenResp.accessToken || tokenResp.access_token;
  if (!accessToken) return res.status(401).json({ error: 'No access token' });

  try {
    const graphRes = await fetch('https://graph.microsoft.com/v1.0/me/events', {
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
    });
    if (!graphRes.ok) {
      const text = await graphRes.text();
      return res.status(graphRes.status).send(text);
    }
    const data = await graphRes.json();
    // Return events array
    res.json(data.value || []);
  } catch (err) {
    console.error('Graph fetch error', err);
    res.status(500).json({ error: 'Graph fetch error' });
  }
});

app.get('/', (req, res) => res.send('Calendar integration server running.'));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
