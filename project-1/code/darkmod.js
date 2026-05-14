let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

function syncRootThemeFromBody() {
  const dark = document.body.classList.contains("darkmode");
  document.documentElement.classList.remove("lightmode", "darkmode");
  document.documentElement.classList.add(dark ? "darkmode" : "lightmode");
}

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
  syncRootThemeFromBody();
};
const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.removeItem("darkmode");
  syncRootThemeFromBody();
};

if (darkmode === "active") enableDarkMode();

if (themeSwitch) themeSwitch.addEventListener("click", () => {
  if (document.body.classList.contains("darkmode")) disableDarkMode();
  else enableDarkMode();
  if (typeof window.applyTheme === "function") {
    window.applyTheme(document.body.classList.contains("darkmode") ? "dark" : "light");
  }
});
