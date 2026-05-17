/* ============================================================
   startseite-calendar.js — Mini calendar for startseite page
   ============================================================ */

let currentMonthStartseite = new Date();

document.addEventListener('DOMContentLoaded', () => {
    renderStartseiteCalendar();
    document.getElementById('prevBtn').addEventListener('click', () => {
        currentMonthStartseite.setMonth(currentMonthStartseite.getMonth() - 1);
        renderStartseiteCalendar();
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentMonthStartseite.setMonth(currentMonthStartseite.getMonth() + 1);
        renderStartseiteCalendar();
    });
});

function renderStartseiteCalendar() {
    const year = currentMonthStartseite.getFullYear();
    const month = currentMonthStartseite.getMonth();
    
    // Month names
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthDeNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    
    const lang = localStorage.getItem('lang') || 'en';
    const monthName = lang === 'de' ? monthDeNames[month] : monthNames[month];
    
    document.getElementById('monthYear').textContent = `${monthName} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const datesDiv = document.getElementById('dates');
    datesDiv.innerHTML = '';
    
    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
        const date = document.createElement('div');
        date.className = 'date other-month';
        date.textContent = daysInPrevMonth - i;
        datesDiv.appendChild(date);
    }
    
    // Current month's days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = i;
        
        // Highlight today
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            date.classList.add('today');
        }
        
        datesDiv.appendChild(date);
    }
    
    // Next month's days
    const remainingCells = 42 - (firstDay + daysInMonth); // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
        const date = document.createElement('div');
        date.className = 'date other-month';
        date.textContent = i;
        datesDiv.appendChild(date);
    }
}
