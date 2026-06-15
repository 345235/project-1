Calendar integration server (minimal scaffold)

Setup

1. Copy `.env.example` to `.env` and fill in `CLIENT_ID`, `CLIENT_SECRET`, `TENANT_ID`, and `BASE_URL`.
2. Install dependencies:

```bash
cd server
npm install
```

3. Start server:

```bash
npm start
```

Azure AD registration notes

- Register an app in the Azure portal and add a web platform redirect URI to `http://localhost:3000/auth/callback` (or your `BASE_URL` + `/auth/callback`).
- Add delegated permissions: `Calendars.ReadWrite`, `Tasks.ReadWrite`, `offline_access`, `openid`, `profile` and grant admin consent if needed.

This server is a minimal starting point. After you configure the app, the endpoints `/auth/login` and `/auth/callback` will perform OAuth and `/api/calendar` will proxy calendar events.
