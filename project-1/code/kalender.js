/* ============================================================
   kalender.js — Calendar functionality with appointments
   ============================================================ */

let currentDate = new Date();
let appointments = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
    renderCalendar();
    setTodayDate();
    displayUpcomingAppointments();
    applyLang(localStorage.getItem('lang') || 'en');
});

// Load appointments from localStorage
function loadAppointments() {
    const stored = localStorage.getItem('appointments');
    appointments = stored ? JSON.parse(stored) : [];
}

// Save appointments to localStorage
function saveAppointments() {
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Set today's date in the form
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').value = today;
}

// Render the calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
  
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthDeNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    
    const lang = localStorage.getItem('lang') || 'en';
    const monthName = lang === 'de' ? monthDeNames[month] : monthNames[month];
    document.getElementById('monthYear').textContent = `${monthName} ${year}`;

    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';

    
    const dayHeaders = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-header';
        header.textContent = day;
        grid.appendChild(header);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    for (let i = firstDay - 1; i > 0; i--) {
        const day = daysInPrevMonth - i + 1;
        addDayCell(grid, day, month - 1, year, true);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        addDayCell(grid, day, month, year, false);
    }

    const totalCells = grid.children.length - 7; // Subtract day headers
    const remainingCells = 42 - totalCells; // 6 weeks * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        addDayCell(grid, day, month + 1, year, true);
    }
}

function addDayCell(grid, day, month, year, otherMonth) {
    const cell = document.createElement('div');
    cell.className = 'day-cell';
    
    if (otherMonth) {
        cell.classList.add('other-month');
    }

   
    let normalizedYear = year;
    let normalizedMonth = month;
    if (normalizedMonth < 0) {
        normalizedMonth = 11;
        normalizedYear--;
    } else if (normalizedMonth > 11) {
        normalizedMonth = 0;
        normalizedYear++;
    }

    const today = new Date();
    if (day === today.getDate() && normalizedMonth === today.getMonth() && normalizedYear === today.getFullYear()) {
        cell.classList.add('today');
    }

    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    cell.appendChild(dayNumber);

    const dayAppointments = getAppointmentsForDay(day, normalizedMonth, normalizedYear);
    if (dayAppointments.length > 0) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'day-appointments';
        dayAppointments.forEach(apt => {
            const dot = document.createElement('span');
            dot.className = 'appointment-dot';
            dot.title = apt.title;
            dotsContainer.appendChild(dot);
        });
        cell.appendChild(dotsContainer);
    }

    cell.addEventListener('click', () => {
        const dateStr = `${normalizedYear}-${String(normalizedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        document.getElementById('appointmentDate').value = dateStr;
        
        document.querySelectorAll('.day-cell.selected').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
    });

    grid.appendChild(cell);
}

function getAppointmentsForDay(day, month, year) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(apt => apt.date === dateStr);
}

function addAppointment(event) {
    event.preventDefault();

    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value || '09:00';
    const title = document.getElementById('appointmentTitle').value;
    const description = document.getElementById('appointmentDesc').value;
    const category = document.getElementById('appointmentCategory').value;

    if (!date || !title) {
        alert('Please fill in date and title');
        return;
    }

    const appointment = {
        id: Date.now(),
        date,
        time,
        title,
        description,
        category
    };

    appointments.push(appointment);
    saveAppointments();
    
    resetForm();
    
    renderCalendar();
    displayUpcomingAppointments();
    
    showToast('saved');
}

function resetForm() {
    document.getElementById('appointmentForm').reset();
    setTodayDate();
    document.querySelectorAll('.day-cell.selected').forEach(c => c.classList.remove('selected'));
}

function deleteAppointment(id) {
    if (confirm('Delete this appointment?')) {
        appointments = appointments.filter(apt => apt.id !== id);
        saveAppointments();
        renderCalendar();
        displayUpcomingAppointments();
        showToast('saved');
    }
}


function displayUpcomingAppointments() {
    const list = document.getElementById('appointmentsList');
    list.innerHTML = '';


    const sorted = [...appointments].sort((a, b) => {
        const dateComp = a.date.localeCompare(b.date);
        return dateComp !== 0 ? dateComp : a.time.localeCompare(b.time);
    });

    if (sorted.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-color-muted, #999);">No appointments</p>';
        return;
    }

    sorted.forEach(apt => {
        const item = document.createElement('div');
        item.className = 'appointment-item';

        const info = document.createElement('div');
        info.className = 'appointment-info';

        const timeEl = document.createElement('div');
        timeEl.className = 'appointment-time';
        timeEl.textContent = `${apt.date} ${apt.time}`;

        const titleEl = document.createElement('div');
        titleEl.className = 'appointment-title';
        titleEl.textContent = apt.title;

        const descEl = document.createElement('div');
        descEl.className = 'appointment-desc';
        descEl.textContent = apt.description || '';

        info.appendChild(timeEl);
        info.appendChild(titleEl);
        if (apt.description) info.appendChild(descEl);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'appointment-delete';
        deleteBtn.textContent = '✕';
        deleteBtn.onclick = () => deleteAppointment(apt.id);

        item.appendChild(info);
        item.appendChild(deleteBtn);
        list.appendChild(item);
    });
}

// Navigation functions
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}
