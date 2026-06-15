// calendar-sync.js — simple frontend sync helper to call local backend
const INTEGRATION_SERVER = (function(){
  const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://localhost:3000';
  return host;
})();

async function startSync() {
  const base = INTEGRATION_SERVER;
  try {
    const res = await fetch(base + '/api/calendar', { credentials: 'include' });
    if (res.status === 401) {
      // not authenticated — redirect to server login which will handle OAuth
      window.location.href = base + '/auth/login?redirect=' + encodeURIComponent(window.location.href);
      return;
    }

    if (!res.ok) {
      alert('Sync failed: ' + res.status + ' ' + res.statusText);
      return;
    }

    const events = await res.json();
    mergeRemoteEvents(events);
    if (typeof showToast === 'function') showToast('saved');
  } catch (err) {
    console.error('Sync error', err);
    alert('Sync error: ' + err.message);
  }
}

function mergeRemoteEvents(events) {
  if (!Array.isArray(events)) return;
  const stored = localStorage.getItem('appointments');
  const appointments = stored ? JSON.parse(stored) : [];

  let added = 0;
  for (const ev of events) {
    // Map Graph event -> local appointment structure
    // ev should contain start.dateTime, subject, bodyPreview or body.content
    const start = (ev.start && (ev.start.dateTime || ev.start)) || ev.startDate || ev.start_date || null;
    let date = '';
    let time = '09:00';
    if (start) {
      // Accept ISO like 2026-06-15T14:00:00 or date-only
      const d = new Date(start);
      if (!isNaN(d)) {
        date = d.toISOString().split('T')[0];
        time = d.toTimeString().split(' ')[0].slice(0,5);
      } else if (start.indexOf && start.indexOf('T')===-1) {
        date = start;
      }
    }

    const title = ev.subject || ev.title || 'Event';
    const description = (ev.body && (ev.body.content || ev.bodyPreview)) || ev.bodyPreview || ev.description || '';

    // Deduplicate by date + time + title
    const exists = appointments.some(a => a.date === date && a.time === time && a.title === title);
    if (!exists) {
      appointments.push({ id: Date.now() + Math.floor(Math.random()*1000), date, time, title, description, category: 'other' });
      added++;
    }
  }

  if (added > 0) {
    localStorage.setItem('appointments', JSON.stringify(appointments));
    // Re-render calendar if function exists
    if (typeof renderCalendar === 'function') renderCalendar();
    if (typeof displayUpcomingAppointments === 'function') displayUpcomingAppointments();
  }
}

// Expose for manual call in console
window.startSync = startSync;
