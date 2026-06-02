/**
 * Mini Calendar Module for Homepage
 * ==================================
 * Displays an interactive calendar on the startseite (home) page
 * Supports multi-language month names
 * Highlights current day
 * Navigation buttons to browse months
 */

// ==================== STATE ====================

/** @type {Date} Currently displayed month */
let currentMonthStartseite = new Date();

// Month names in English and German for calendar display
const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_NAMES_DE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

const MONTH_NAMES_ALL = {
  en: MONTH_NAMES_EN,
  de: MONTH_NAMES_DE,
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
};

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  renderStartseiteCalendar();
  attachEventListeners();
});

/**
 * Attach navigation button listeners
 */
function attachEventListeners() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonthStartseite.setMonth(currentMonthStartseite.getMonth() - 1);
      renderStartseiteCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonthStartseite.setMonth(currentMonthStartseite.getMonth() + 1);
      renderStartseiteCalendar();
    });
  }
}

// ==================== CALENDAR RENDERING ====================

/**
 * Render the calendar view for the current month
 * Updates month display, renders day grid, highlights today
 */
function renderStartseiteCalendar() {
  const year = currentMonthStartseite.getFullYear();
  const month = currentMonthStartseite.getMonth();

  // Get current language and month name
  const lang = localStorage.getItem('language') || localStorage.getItem('lang') || 'en';
  const monthNames = MONTH_NAMES_ALL[lang] || MONTH_NAMES_EN;
  const monthName = monthNames[month];

  // Update month/year display
  const monthYearElement = document.getElementById('monthYear');
  if (monthYearElement) {
    monthYearElement.textContent = `${monthName} ${year}`;
  }

  renderDayGrid(year, month);
}

/**
 * Render the day grid for a specific month
 * Includes days from previous and next month for complete grid
 * @param {number} year - Full year (e.g., 2024)
 * @param {number} month - Month number (0-11)
 */
function renderDayGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const datesDiv = document.getElementById('dates');
  if (!datesDiv) return;

  datesDiv.innerHTML = '';

  // Previous month's days (filler)
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = createDateElement(daysInPrevMonth - i, 'other-month');
    datesDiv.appendChild(date);
  }

  // Current month's days
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const date = createDateElement(i, 'date');

    // Highlight today's date
    if (isToday(i, month, year, today)) {
      date.classList.add('today');
    }

    datesDiv.appendChild(date);
  }

  // Next month's days (filler)
  const remainingCells = 42 - (firstDay + daysInMonth); // 6 rows × 7 days
  for (let i = 1; i <= remainingCells; i++) {
    const date = createDateElement(i, 'other-month');
    datesDiv.appendChild(date);
  }
}

/**
 * Create a date element for the calendar grid
 * @param {number} day - Day number
 * @param {string} className - CSS class for styling
 * @returns {HTMLElement} Date element
 */
function createDateElement(day, className) {
  const element = document.createElement('div');
  element.className = className;
  element.textContent = day;
  return element;
}

/**
 * Check if a date matches today's date
 * @param {number} day - Day of month
 * @param {number} month - Month (0-11)
 * @param {number} year - Full year
 * @param {Date} today - Today's date object
 * @returns {boolean} True if dates match
 */
function isToday(day, month, year, today) {
  return day === today.getDate() &&
         month === today.getMonth() &&
         year === today.getFullYear();
}
