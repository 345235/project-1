/**
 * Dark Mode Theme Management
 * Handles theme switching between light and dark modes
 * Persists theme preference to localStorage
 */

const themeSwitch = document.getElementById('theme-switch');
const DARKMODE_KEY = 'darkmode';
const ACTIVE_STATE = 'active';

/**
 * Initialize dark mode from stored preference
 */
const savedTheme = localStorage.getItem(DARKMODE_KEY);
if (savedTheme === ACTIVE_STATE) {
  enableDarkMode();
}

/**
 * Sync root element classes with body theme state
 * Ensures consistent theme across document
 */
function syncRootThemeFromBody() {
  const isDarkMode = document.body.classList.contains('darkmode');
  document.documentElement.classList.remove('lightmode', 'darkmode');
  document.documentElement.classList.add(isDarkMode ? 'darkmode' : 'lightmode');
}

/**
 * Enable dark mode
 * Adds darkmode class to body and saves preference
 */
function enableDarkMode() {
  document.body.classList.add('darkmode');
  localStorage.setItem(DARKMODE_KEY, ACTIVE_STATE);
  syncRootThemeFromBody();
}

/**
 * Disable dark mode
 * Removes darkmode class from body and clears preference
 */
function disableDarkMode() {
  document.body.classList.remove('darkmode');
  localStorage.removeItem(DARKMODE_KEY);
  syncRootThemeFromBody();
}

/**
 * Handle theme switch button click
 * Toggles between dark and light modes
 */
if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('darkmode');
    isDarkMode ? disableDarkMode() : enableDarkMode();

    // Notify other scripts of theme change (for compatibility with settings.js)
    if (typeof window.applyTheme === 'function') {
      window.applyTheme(document.body.classList.contains('darkmode') ? 'dark' : 'light');
    }
  });
}
