/**
 * Settings and Preferences Module
 * ================================
 * Manages:
 * - Language selection and synchronization
 * - Theme (dark/light mode) preferences
 * - Sidebar interactions
 * - Toast notifications
 * 
 * Note: This module works alongside translations.js
 * Include on every page with: <script src="settings.js" defer></script>
 */

// ==================== TRANSLATION DICTIONARY ====================
// Backup dictionary for settings page and theme options
// Primary translations are in translations.js
const dict = {
  en: {
    settings:"Settings", settingsDesc:"Manage your account, preferences, and notifications.",
    account:"Account", accountDesc:"Update your personal information.",
    name:"Name", email:"Email", save:"Save changes",
    preferences:"Preferences", preferencesDesc:"Customize the language of the app.",
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
    create:"Create", todo:"Todo list", profile:"Profile", kalendar:"Calendar",
    datenschutz:"Privacy", impressum:"Imprint", contact:"Contact", about:"About Me",
    help:"Help", feedback:"Feedback", terms:"Terms of Service", cookies:"Cookie Policy",
    support:"Support", faq:"FAQ", legal:"Legal", copyright:"© 2026 Paul.Haider All rights reserved.",
    project:"Project", folder:"Folder", document:"Document", work:"Work", school:"School",
    private:"Private", other:"Other",
    welcomeMessage:"Welcome to the homepage! You have 1 task to complete today. Good luck!", noAppointmentsToday:"No appointments today.",
    mo:"Mon", di:"Tue", mi:"Wed", do:"Thu", fr:"Fri", sa:"Sat", so:"Sun",
    addAppointment:"New Appointment", date:"Date", time:"Time", title:"Title", description:"Description", category:"Category",
    upcomingAppointments:"Upcoming Appointments", cancel:"Cancel", prev:"Previous", next:"Next"
  },
  de: {
    settings:"Einstellungen", settingsDesc:"Verwalte Konto, Einstellungen und Benachrichtigungen.",
    account:"Konto", accountDesc:"Aktualisiere deine persönlichen Daten.",
    name:"Name", email:"E-Mail", save:"Speichern",
    preferences:"Einstellungen", preferencesDesc:"Passe die Sprache der App an.",
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
    create:"Erstellen", todo:"Todo-Liste", profile:"Profil", kalendar:"Kalender",
    datenschutz:"Datenschutz", impressum:"Impressum", contact:"Kontakt", about:"Über mich",
    help:"Hilfe", feedback:"Feedback", terms:"Nutzungsbedingungen", cookies:"Cookie-Richtlinie",
    support:"Support", faq:"FAQ", legal:"Rechtliches", copyright:"© 2026 Paul.Haider Alle Rechte vorbehalten.",
    project:"Projekt", folder:"Ordner", document:"Dokument", work:"Arbeit", school:"Schule",
    private:"Privat", other:"Sonstiges",
    welcomeMessage:"Willkommen auf der Startseite! Du hast heute 1 Aufgabe zu erledigen. Viel Erfolg!", noAppointmentsToday:"Heute stehen keine Termine an.",
    mo:"Mo", di:"Di", mi:"Mi", do:"Do", fr:"Fr", sa:"Sa", so:"So",
    addAppointment:"Neuer Termin", date:"Datum", time:"Uhrzeit", title:"Titel", description:"Beschreibung", category:"Kategorie",
    upcomingAppointments:"Kommende Termine", cancel:"Abbrechen", prev:"Vorher", next:"Nächste"
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
    create:"Crear", todo:"Lista", profile:"Perfil", kalendar:"Calendario",
    datenschutz:"Privacidad", impressum:"Aviso Legal", contact:"Contacto", about:"Acerca de mí",
    help:"Ayuda", feedback:"Comentarios", terms:"Términos de Servicio", cookies:"Política de Cookies",
    support:"Soporte", faq:"Preguntas Frecuentes", legal:"Legal", copyright:"© 2026 Paul.Haider Todos los derechos reservados.",
    project:"Proyecto", folder:"Carpeta", document:"Documento", work:"Trabajo", school:"Escuela",
    private:"Privado", other:"Otro",
    welcomeMessage:"¡Bienvenido a la página de inicio! Tienes 1 tarea para completar hoy. ¡Buena suerte!", noAppointmentsToday:"No hay citas hoy.",
    mo:"Lun", di:"Mar", mi:"Mié", do:"Jue", fr:"Vie", sa:"Sab", so:"Dom",
    addAppointment:"Nueva Cita", date:"Fecha", time:"Hora", title:"Título", description:"Descripción", category:"Categoría",
    upcomingAppointments:"Próximas Citas", cancel:"Cancelar", prev:"Anterior", next:"Siguiente"
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
    create:"Créer", todo:"Liste", profile:"Profil", kalendar:"Calendrier",
    datenschutz:"Confidentialité", impressum:"Mentions Légales", contact:"Contact", about:"À propos de moi",
    help:"Aide", feedback:"Commentaires", terms:"Conditions d'utilisation", cookies:"Politique de Cookies",
    support:"Support", faq:"FAQ", legal:"Mentions Légales", copyright:"© 2026 Paul.Haider Tous droits réservés.",
    project:"Projet", folder:"Dossier", document:"Document", work:"Travail", school:"École",
    private:"Privé", other:"Autre",
    welcomeMessage:"Bienvenue sur la page d'accueil ! Vous avez 1 tâche à accomplir aujourd'hui. Bonne chance !", noAppointmentsToday:"Aucun rendez-vous aujourd'hui.",
    mo:"Lun", di:"Mar", mi:"Mer", do:"Jeu", fr:"Ven", sa:"Sam", so:"Dim",
    addAppointment:"Nouveau Rendez-vous", date:"Date", time:"Heure", title:"Titre", description:"Description", category:"Catégorie",
    upcomingAppointments:"Rendez-vous à Venir", cancel:"Annuler", prev:"Précédent", next:"Suivant"
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
    create:"Criar", todo:"Lista", profile:"Perfil", kalendar:"Calendário",
    datenschutz:"Privacidade", impressum:"Aviso Legal", contact:"Contato", about:"Sobre mim",
    help:"Ajuda", feedback:"Comentários", terms:"Termos de Serviço", cookies:"Política de Cookies",
    support:"Suporte", faq:"Perguntas Frequentes", legal:"Legal", copyright:"© 2026 Paul.Haider Todos os direitos reservados.",
    project:"Projeto", folder:"Pasta", document:"Documento", work:"Trabalho", school:"Escola",
    private:"Privado", other:"Outro",
    welcomeMessage:"Bem-vindo à página inicial! Você tem 1 tarefa para concluir hoje. Boa sorte!", noAppointmentsToday:"Nenhum compromisso hoje.",
    mo:"Seg", di:"Ter", mi:"Qua", do:"Qui", fr:"Sex", sa:"Sab", so:"Dom",
    addAppointment:"Novo Compromisso", date:"Data", time:"Hora", title:"Título", description:"Descrição", category:"Categoria",
    upcomingAppointments:"Próximos Compromissos", cancel:"Cancelar", prev:"Anterior", next:"Próximo"
  }
};

// ==================== LANGUAGE MANAGEMENT ====================

/**
 * Apply language translations to all data-t elements
 * @param {string} lang - Language code
 */
function applyLang(lang) {
  const d = dict[lang] || dict.en;
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.getAttribute("data-t");
    if (d[key]) el.textContent = d[key];
  });
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("lang", lang);
}

// ==================== THEME MANAGEMENT ====================

/**
 * Apply theme preference
 * @param {string} theme - Theme mode ('light' or 'dark')
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("themeMode", theme);
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
  const current = localStorage.getItem("themeMode") || "light";
  const newTheme = current === "light" ? "dark" : "light";
  applyTheme(newTheme);
}

// ==================== NOTIFICATIONS ====================

/**
 * Show toast notification
 * @param {string} key - Translation key for message
 */
function showToast(key = "saved") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  
  const lang = localStorage.getItem("lang") || "en";
  const message = (dict[lang] && dict[lang][key]) || dict.en[key] || "Saved";
  
  toast.textContent = message;
  toast.classList.add("show");
  
  clearTimeout(showToast._timeout);
  showToast._timeout = setTimeout(() => toast.classList.remove("show"), 1800);
}

// ==================== INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize language
  const savedLang = localStorage.getItem("lang") || "en";
  
  if (typeof setLanguage !== 'undefined') {
    setLanguage(savedLang);
  } else {
    applyLang(savedLang);
  }
  
  const langSelector = document.getElementById("lang");
  if (langSelector) {
    langSelector.value = savedLang;
    if (!langSelector.hasAttribute('onchange')) {
      langSelector.addEventListener("change", e => {
        if (typeof setLanguage !== 'undefined') {
          setLanguage(e.target.value);
        } else {
          applyLang(e.target.value);
        }
      });
    }
  }

  // Initialize theme
  const savedTheme = localStorage.getItem("themeMode") || "light";
  applyTheme(savedTheme);
  
  const themeSelector = document.getElementById("theme");
  if (themeSelector) {
    themeSelector.value = savedTheme;
    themeSelector.addEventListener("change", e => applyTheme(e.target.value));
  }
});

// ==================== GLOBAL EXPORTS ====================

// Expose functions for inline event handlers
window.toggleSidebar = toggleSidebar;
window.toggleSubMenu = toggleSubMenu;
window.toggleTheme = toggleTheme;
window.showToast = showToast;
