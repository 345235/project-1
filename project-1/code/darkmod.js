

const themeSwitch = document.getElementById('theme-switch');
const DARKMODE_KEY = 'darkmode';
const ACTIVE_STATE = 'active';


const savedTheme = localStorage.getItem(DARKMODE_KEY);
if (savedTheme === ACTIVE_STATE) {
  enableDarkMode();
}


function syncRootThemeFromBody() {
  const isDarkMode = document.body.classList.contains('darkmode');
  document.documentElement.classList.remove('lightmode', 'darkmode');
  document.documentElement.classList.add(isDarkMode ? 'darkmode' : 'lightmode');
}


function enableDarkMode() {
  document.body.classList.add('darkmode');
  localStorage.setItem(DARKMODE_KEY, ACTIVE_STATE);
  syncRootThemeFromBody();
}


function disableDarkMode() {
  document.body.classList.remove('darkmode');
  localStorage.removeItem(DARKMODE_KEY);
  syncRootThemeFromBody();
}


if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('darkmode');
    isDarkMode ? disableDarkMode() : enableDarkMode();

    if (typeof window.applyTheme === 'function') {
      window.applyTheme(document.body.classList.contains('darkmode') ? 'dark' : 'light');
    }
  });
}
