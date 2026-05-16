/* ============================================================
   settings.js — sidebar, theme, i18n, and settings interactions
   Include on every page with: <script src="settings.js" defer></script>
   ============================================================ */

/* -------- Translation dictionary -------- */
const dict = {
  en: {
    settings:"Settings", settingsDesc:"Manage your account, preferences, and notifications.",
    account:"Account", accountDesc:"Update your personal information.",
    name:"Name", email:"Email", save:"Save changes",
    preferences:"Preferences", preferencesDesc:"Customize how the app looks and feels.",
    language:"Language", themeLabel:"Theme", theme:"Theme",
    light:"Light", dark:"Dark", system:"System",
    notifications:"Notifications", notificationsDesc:"Choose what you want to be notified about.",
    emailNotifs:"Email notifications", emailNotifsDesc:"Receive updates by email.",
    pushNotifs:"Push notifications", pushNotifsDesc:"Get push notifications on your devices.",
    marketing:"Marketing emails", marketingDesc:"Tips, updates, and offers.",
    privacy:"Privacy & Security", privacyDesc:"Control your privacy and account security.",
    profileVisible:"Public profile", profileVisibleDesc:"Allow others to view your profile.",
    twoFactor:"Two-factor authentication", twoFactorDesc:"Add an extra layer of security.",
    danger:"Danger zone", dangerDesc:"Irreversible actions affecting your account.",
    deleteAccount:"Delete account", saved:"Settings saved",
    startseite:"Home", termine:"Appointments", projects:"Projects", dashboard:"Dashboard",
    create:"Create", todo:"Todo list", profile:"Profile", kalendar:"Calendar"
  },
  de: {
    settings:"Einstellungen", settingsDesc:"Verwalte Konto, Einstellungen und Benachrichtigungen.",
    account:"Konto", accountDesc:"Aktualisiere deine persönlichen Daten.",
    name:"Name", email:"E-Mail", save:"Speichern",
    preferences:"Einstellungen", preferencesDesc:"Passe das Aussehen der App an.",
    language:"Sprache", themeLabel:"Design", theme:"Design",
    light:"Hell", dark:"Dunkel", system:"System",
    notifications:"Benachrichtigungen", notificationsDesc:"Wähle, worüber du benachrichtigt wirst.",
    emailNotifs:"E-Mail-Benachrichtigungen", emailNotifsDesc:"Erhalte Updates per E-Mail.",
    pushNotifs:"Push-Benachrichtigungen", pushNotifsDesc:"Erhalte Push-Nachrichten.",
    marketing:"Marketing-E-Mails", marketingDesc:"Tipps, Updates und Angebote.",
    privacy:"Datenschutz & Sicherheit", privacyDesc:"Kontrolliere deine Privatsphäre.",
    profileVisible:"Öffentliches Profil", profileVisibleDesc:"Anderen erlauben, dein Profil zu sehen.",
    twoFactor:"Zwei-Faktor-Authentifizierung", twoFactorDesc:"Füge eine zusätzliche Sicherheitsebene hinzu.",
    danger:"Gefahrenzone", dangerDesc:"Unumkehrbare Aktionen.",
    deleteAccount:"Konto löschen", saved:"Einstellungen gespeichert",
    startseite:"Startseite", termine:"Termine", projects:"Projekte", dashboard:"Dashboard",
    create:"Erstellen", todo:"Todo-Liste", profile:"Profil", kalendar:"Kalender"
  },
  es: {
    settings:"Configuración", settingsDesc:"Administra tu cuenta y preferencias.",
    account:"Cuenta", accountDesc:"Actualiza tu información.",
    name:"Nombre", email:"Correo", save:"Guardar",
    preferences:"Preferencias", preferencesDesc:"Personaliza la apariencia.",
    language:"Idioma", themeLabel:"Tema", theme:"Tema",
    light:"Claro", dark:"Oscuro", system:"Sistema",
    notifications:"Notificaciones", notificationsDesc:"Elige sobre qué ser notificado.",
    emailNotifs:"Notif. correo", emailNotifsDesc:"Recibe actualizaciones por correo.",
    pushNotifs:"Notif. push", pushNotifsDesc:"Recibe notif. push.",
    marketing:"Correos marketing", marketingDesc:"Consejos y ofertas.",
    privacy:"Privacidad", privacyDesc:"Controla tu privacidad.",
    profileVisible:"Perfil público", profileVisibleDesc:"Permite que otros lo vean.",
    twoFactor:"Auth. dos factores", twoFactorDesc:"Capa extra de seguridad.",
    danger:"Zona de peligro", dangerDesc:"Acciones irreversibles.",
    deleteAccount:"Eliminar cuenta", saved:"Guardado",
    startseite:"Inicio", termine:"Citas", projects:"Proyectos", dashboard:"Panel",
    create:"Crear", todo:"Lista", profile:"Perfil", kalendar:"Calendario"
  },
  fr: {
    settings:"Paramètres", settingsDesc:"Gérez votre compte et préférences.",
    account:"Compte", accountDesc:"Mettez à jour vos informations.",
    name:"Nom", email:"E-mail", save:"Enregistrer",
    preferences:"Préférences", preferencesDesc:"Personnalisez l'apparence.",
    language:"Langue", themeLabel:"Thème", theme:"Thème",
    light:"Clair", dark:"Sombre", system:"Système",
    notifications:"Notifications", notificationsDesc:"Choisissez ce qui vous est notifié.",
    emailNotifs:"Notif. e-mail", emailNotifsDesc:"Recevez les mises à jour par e-mail.",
    pushNotifs:"Notif. push", pushNotifsDesc:"Recevez des notifications push.",
    marketing:"E-mails marketing", marketingDesc:"Astuces et offres.",
    privacy:"Confidentialité", privacyDesc:"Contrôlez votre confidentialité.",
    profileVisible:"Profil public", profileVisibleDesc:"Permettre aux autres de voir votre profil.",
    twoFactor:"Auth. deux facteurs", twoFactorDesc:"Couche de sécurité supplémentaire.",
    danger:"Zone dangereuse", dangerDesc:"Actions irréversibles.",
    deleteAccount:"Supprimer le compte", saved:"Enregistré",
    startseite:"Accueil", termine:"Rendez-vous", projects:"Projets", dashboard:"Tableau de bord",
    create:"Créer", todo:"Liste", profile:"Profil", kalendar:"Calendrier"
  },
  pt: {
    settings:"Configurações", settingsDesc:"Gerencie sua conta e preferências.",
    account:"Conta", accountDesc:"Atualize suas informações.",
    name:"Nome", email:"E-mail", save:"Salvar",
    preferences:"Preferências", preferencesDesc:"Personalize a aparência.",
    language:"Idioma", themeLabel:"Tema", theme:"Tema",
    light:"Claro", dark:"Escuro", system:"Sistema",
    notifications:"Notificações", notificationsDesc:"Escolha sobre o que ser notificado.",
    emailNotifs:"Notif. e-mail", emailNotifsDesc:"Receba atualizações por e-mail.",
    pushNotifs:"Notif. push", pushNotifsDesc:"Receba notificações push.",
    marketing:"E-mails marketing", marketingDesc:"Dicas e ofertas.",
    privacy:"Privacidade", privacyDesc:"Controle sua privacidade.",
    profileVisible:"Perfil público", profileVisibleDesc:"Permita que outros vejam seu perfil.",
    twoFactor:"Auth. dois fatores", twoFactorDesc:"Camada extra de segurança.",
    danger:"Zona de perigo", dangerDesc:"Ações irreversíveis.",
    deleteAccount:"Excluir conta", saved:"Salvo",
    startseite:"Início", termine:"Compromissos", projects:"Projetos", dashboard:"Painel",
    create:"Criar", todo:"Lista", profile:"Perfil", kalendar:"Calendário"
  }
};

/* -------- i18n -------- */
function applyLang(lang) {
  const d = dict[lang] || dict.en;
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.getAttribute("data-t");
    if (d[key]) el.textContent = d[key];
  });
  const titleEl = document.querySelector("title[data-t]");
  if (titleEl) {
    const tk = titleEl.getAttribute("data-t");
    if (d[tk]) titleEl.textContent = d[tk];
  }
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("lang", lang);
}

/* -------- Theme (Settings select + pages with themeMode in localStorage) -------- */
let _systemThemeMq;
function applyTheme(mode) {
  const m = mode === "dark" || mode === "light" || mode === "system" ? mode : "light";
  if (localStorage.getItem("darkmode") === "null") localStorage.removeItem("darkmode");
  localStorage.setItem("themeMode", m);
  const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = m === "dark" || (m === "system" && sysDark);
  document.body.classList.toggle("darkmode", dark);
  document.documentElement.classList.remove("lightmode", "darkmode");
  document.documentElement.classList.add(dark ? "darkmode" : "lightmode");
  if (dark) localStorage.setItem("darkmode", "active");
  else localStorage.removeItem("darkmode");
  if (m === "system") {
    if (!_systemThemeMq) {
      _systemThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      _systemThemeMq.addEventListener("change", () => {
        if (localStorage.getItem("themeMode") === "system") applyTheme("system");
      });
    }
  }
}

function getInitialThemeMode() {
  const stored = localStorage.getItem("themeMode");
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return localStorage.getItem("darkmode") === "active" ? "dark" : "light";
}

/* -------- Sidebar -------- */
function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  if (!sb) return;
  sb.classList.toggle("close");
  sb.classList.toggle("expanded");
  document.querySelectorAll("#sidebar .sub-menu.show")
    .forEach(s => { s.classList.remove("show"); s.previousElementSibling?.classList.remove("rotate"); });
}
function toggleSubMenu(btn) {
  const menu = btn.nextElementSibling;
  if (!menu) return;
  if (!menu.classList.contains("show")) {
    document.querySelectorAll("#sidebar .sub-menu.show")
      .forEach(s => { s.classList.remove("show"); s.previousElementSibling?.classList.remove("rotate"); });
  }
  menu.classList.toggle("show");
  btn.classList.toggle("rotate");
  const sb = document.getElementById("sidebar");
  if (sb?.classList.contains("close")) {
    sb.classList.remove("close");
    sb.classList.add("expanded");
  }
}

/* -------- Toast -------- */
function showToast(key = "saved") {
  const t = document.getElementById("toast");
  if (!t) return;
  const lang = localStorage.getItem("lang") || "en";
  t.textContent = (dict[lang] && dict[lang][key]) || dict.en[key] || "Saved";
  t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("show"), 1800);
}

/* -------- Init on load -------- */
document.addEventListener("DOMContentLoaded", () => {
  // Initial language (all pages that include this script)
  // Check both 'lang' and 'language' keys for compatibility with translations.js
  const savedLang = localStorage.getItem("lang") || localStorage.getItem("language") || "en";
  applyLang(savedLang);
  
  // Sync sidebar language selector if it exists (from translations.js)
  const sidebarSelector = document.getElementById("language-select");
  if (sidebarSelector) {
    sidebarSelector.value = savedLang;
  }
  
  const langSel = document.getElementById("lang");
  if (langSel) {
    langSel.value = savedLang;
    langSel.addEventListener("change", e => {
      const newLang = e.target.value;
      applyLang(newLang);
      // Also sync the sidebar selector
      if (sidebarSelector) {
        sidebarSelector.value = newLang;
      }
      // Also set the translations.js language key for cross-compatibility
      if (typeof setLanguage === 'function') {
        setLanguage(newLang);
      }
    });
  }

  // Theme from Settings (themeMode) — keeps body/html classes in sync with darkmod.js
  const savedTheme = getInitialThemeMode();
  applyTheme(savedTheme);
  const themeSel = document.getElementById("theme");
  if (themeSel) {
    themeSel.value = savedTheme;
    themeSel.addEventListener("change", e => applyTheme(e.target.value));
  }
});

window.addEventListener("storage", e => {
  if (e.key === "lang" && e.newValue) {
    applyLang(e.newValue);
    const langSel = document.getElementById("lang");
    if (langSel) langSel.value = e.newValue;
  }
});

// Expose for inline onclick handlers
window.toggleSidebar = toggleSidebar;
window.toggleSubMenu = toggleSubMenu;
window.applyLang     = applyLang;
window.applyTheme    = applyTheme;
window.showToast     = showToast;
