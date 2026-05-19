// Translation Dictionary
const translations = {
  de: {
    dashboard: "Dashboard",
    startseite: "Startseite",
    termine: "Termine",
    projects: "Projekte",
    profile: "Profil",
    kalendar: "Kalender",
    settings: "Einstellungen",
    create: "Erstellen",
    todo: "Todo-Liste",
    project: "Projekt",
    folder: "Ordner",
    document: "Dokument",
    work: "Arbeit",
    school: "Schule",
    private: "Privat",
    other: "Sonstiges",
    datenschutz: "Datenschutz",
    impressum: "Impressum",
    contact: "Kontakt",
    about: "Über mich",
    help: "Hilfe",
    feedback: "Feedback",
    terms: "Nutzungsbedingungen",
    cookies: "Cookie-Richtlinie",
    support: "Support",
    faq: "FAQ",
    legal: "Rechtliches",
    copyright: "© 2026 Paul.Haider Alle Rechte vorbehalten.",
    settingsDesc: "Verwalte Konto, Einstellungen und Benachrichtigungen.",
    account: "Konto",
    accountDesc: "Aktualisiere deine persönlichen Daten.",
    name: "Name",
    email: "E-Mail",
    save: "Speichern",
    preferences: "Einstellungen",
    preferencesDesc: "Passe die Sprache der App an.",
    language: "Sprache",
    notifications: "Benachrichtigungen",
    notificationsDesc: "Wähle, worüber du benachrichtigt wirst.",
    emailNotifs: "E-Mail-Benachrichtigungen",
    emailNotifsDesc: "Erhalte Updates per E-Mail.",
    pushNotifs: "Push-Benachrichtigungen",
    pushNotifsDesc: "Erhalte Push-Nachrichten.",
    marketing: "Marketing-E-Mails",
    marketingDesc: "Tipps, Updates und Angebote.",
    privacy: "Datenschutz & Sicherheit",
    privacyDesc: "Kontrolliere deine Privatsphäre.",
    profileVisible: "Öffentliches Profil",
    profileVisibleDesc: "Anderen erlauben, dein Profil zu sehen.",
    twoFactor: "Zwei-Faktor-Authentifizierung",
    twoFactorDesc: "Füge eine zusätzliche Sicherheitsebene hinzu.",
    danger: "Gefahrenzone",
    dangerDesc: "Unumkehrbare Aktionen.",
    deleteAccount: "Konto löschen",
    welcomeMessage: "Willkommen auf der Startseite! Du hast heute 1 Aufgaben zu erledigen. Viel Erfolg!",
    noAppointmentsToday: "Heute stehen keine Termine an.",
    mo: "Mo",
    di: "Di",
    mi: "Mi",
    do: "Do",
    fr: "Fr",
    sa: "Sa",
    so: "So"
  },
  en: {
    dashboard: "Dashboard",
    startseite: "Home",
    termine: "Appointments",
    projects: "Projects",
    profile: "Profile",
    kalendar: "Calendar",
    settings: "Settings",
    create: "Create",
    todo: "To-do List",
    project: "Project",
    folder: "Folder",
    document: "Document",
    work: "Work",
    school: "School",
    private: "Private",
    other: "Other",
    datenschutz: "Privacy",
    impressum: "Imprint",
    contact: "Contact",
    about: "About Me",
    help: "Help",
    feedback: "Feedback",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
    support: "Support",
    faq: "FAQ",
    legal: "Legal",
    copyright: "© 2026 Paul.Haider All rights reserved.",
    settingsDesc: "Manage your account, preferences, and notifications.",
    account: "Account",
    accountDesc: "Update your personal information.",
    name: "Name",
    email: "Email",
    save: "Save",
    preferences: "Preferences",
    preferencesDesc: "Customize how the app looks and feels.",
    language: "Language",
    notifications: "Notifications",
    notificationsDesc: "Choose what you want to be notified about.",
    emailNotifs: "Email notifications",
    emailNotifsDesc: "Receive updates by email.",
    pushNotifs: "Push notifications",
    pushNotifsDesc: "Get push notifications on your devices.",
    marketing: "Marketing emails",
    marketingDesc: "Tips, updates, and offers.",
    privacy: "Privacy & Security",
    privacyDesc: "Control your privacy and account security.",
    profileVisible: "Public profile",
    profileVisibleDesc: "Allow others to view your profile.",
    twoFactor: "Two-factor authentication",
    twoFactorDesc: "Add an extra layer of security.",
    danger: "Danger zone",
    dangerDesc: "Irreversible actions affecting your account.",
    deleteAccount: "Delete account",
    welcomeMessage: "Welcome to the Home page! You have 1 task to do today. Good luck!",
    noAppointmentsToday: "No appointments scheduled for today.",
    mo: "Mon",
    di: "Tue",
    mi: "Wed",
    do: "Thu",
    fr: "Fri",
    sa: "Sat",
    so: "Sun"
  },
  es: {
    dashboard: "Panel de Control",
    startseite: "Inicio",
    termine: "Citas",
    projects: "Proyectos",
    profile: "Perfil",
    kalendar: "Calendario",
    settings: "Configuración",
    create: "Crear",
    todo: "Lista de Tareas",
    project: "Proyecto",
    folder: "Carpeta",
    document: "Documento",
    work: "Trabajo",
    school: "Escuela",
    private: "Privado",
    other: "Otro",
    datenschutz: "Privacidad",
    impressum: "Aviso Legal",
    contact: "Contacto",
    about: "Acerca de mí",
    help: "Ayuda",
    feedback: "Comentarios",
    terms: "Términos de Servicio",
    cookies: "Política de Cookies",
    support: "Soporte",
    faq: "Preguntas Frecuentes",
    legal: "Legal",
    copyright: "© 2026 Paul.Haider Todos los derechos reservados.",
    settingsDesc: "Administra tu cuenta, preferencias y notificaciones.",
    account: "Cuenta",
    accountDesc: "Actualiza tu información personal.",
    name: "Nombre",
    email: "Correo",
    save: "Guardar",
    preferences: "Preferencias",
    preferencesDesc: "Personaliza cómo se ve la aplicación.",
    language: "Idioma",
    notifications: "Notificaciones",
    notificationsDesc: "Elige sobre qué deseas ser notificado.",
    emailNotifs: "Notificaciones por correo",
    emailNotifsDesc: "Recibe actualizaciones por correo.",
    pushNotifs: "Notificaciones push",
    pushNotifsDesc: "Recibe notificaciones push en tus dispositivos.",
    marketing: "Correos de marketing",
    marketingDesc: "Consejos, actualizaciones y ofertas.",
    privacy: "Privacidad y Seguridad",
    privacyDesc: "Controla tu privacidad y seguridad de cuenta.",
    profileVisible: "Perfil público",
    profileVisibleDesc: "Permite que otros vean tu perfil.",
    twoFactor: "Autenticación de dos factores",
    twoFactorDesc: "Agrega una capa adicional de seguridad.",
    danger: "Zona de peligro",
    dangerDesc: "Acciones irreversibles que afectan tu cuenta.",
    deleteAccount: "Eliminar cuenta",
    welcomeMessage: "¡Bienvenido a la página de inicio! Tienes 1 tarea para hoy. ¡Buena suerte!",
    noAppointmentsToday: "No hay citas programadas para hoy.",
    mo: "Lun",
    di: "Mar",
    mi: "Mié",
    do: "Jue",
    fr: "Vie",
    sa: "Sab",
    so: "Dom"
  },
  fr: {
    dashboard: "Tableau de Bord",
    startseite: "Accueil",
    termine: "Rendez-vous",
    projects: "Projets",
    profile: "Profil",
    kalendar: "Calendrier",
    settings: "Paramètres",
    create: "Créer",
    todo: "Liste de Tâches",
    project: "Projet",
    folder: "Dossier",
    document: "Document",
    work: "Travail",
    school: "École",
    private: "Privé",
    other: "Autre",
    datenschutz: "Confidentialité",
    impressum: "Mentions Légales",
    contact: "Contact",
    about: "À propos de moi",
    help: "Aide",
    feedback: "Commentaires",
    terms: "Conditions d'utilisation",
    cookies: "Politique de Cookies",
    support: "Support",
    faq: "FAQ",
    legal: "Mentions Légales",
    copyright: "© 2026 Paul.Haider Tous droits réservés.",
    settingsDesc: "Gérez votre compte, préférences et notifications.",
    account: "Compte",
    accountDesc: "Mettez à jour vos informations personnelles.",
    name: "Nom",
    email: "E-mail",
    save: "Enregistrer",
    preferences: "Préférences",
    preferencesDesc: "Personnalisez l'apparence et l'interface de l'application.",
    language: "Langue",
    notifications: "Notifications",
    notificationsDesc: "Choisissez ce pour quoi vous souhaitez être notifié.",
    emailNotifs: "Notifications par e-mail",
    emailNotifsDesc: "Recevez les mises à jour par e-mail.",
    pushNotifs: "Notifications push",
    pushNotifsDesc: "Recevez des notifications push sur vos appareils.",
    marketing: "E-mails marketing",
    marketingDesc: "Conseils, mises à jour et offres.",
    privacy: "Confidentialité et Sécurité",
    privacyDesc: "Contrôlez votre confidentialité et votre sécurité de compte.",
    profileVisible: "Profil public",
    profileVisibleDesc: "Autorisez les autres à consulter votre profil.",
    twoFactor: "Authentification à deux facteurs",
    twoFactorDesc: "Ajoutez une couche de sécurité supplémentaire.",
    danger: "Zone dangereuse",
    dangerDesc: "Actions irréversibles affectant votre compte.",
    deleteAccount: "Supprimer le compte",
    welcomeMessage: "Bienvenue sur la page d'accueil ! Vous avez 1 tâche à faire aujourd'hui. Bonne chance !",
    noAppointmentsToday: "Aucun rendez-vous prévu pour aujourd'hui.",
    mo: "Lun",
    di: "Mar",
    mi: "Mer",
    do: "Jeu",
    fr: "Ven",
    sa: "Sam",
    so: "Dim"
  },
  pt: {
    dashboard: "Painel",
    startseite: "Início",
    termine: "Compromissos",
    projects: "Projetos",
    profile: "Perfil",
    kalendar: "Calendário",
    settings: "Configurações",
    create: "Criar",
    todo: "Lista de Tarefas",
    project: "Projeto",
    folder: "Pasta",
    document: "Documento",
    work: "Trabalho",
    school: "Escola",
    private: "Privado",
    other: "Outro",
    datenschutz: "Privacidade",
    impressum: "Aviso Legal",
    contact: "Contato",
    about: "Sobre mim",
    help: "Ajuda",
    feedback: "Comentários",
    terms: "Termos de Serviço",
    cookies: "Política de Cookies",
    support: "Suporte",
    faq: "Perguntas Frequentes",
    legal: "Legal",
    copyright: "© 2026 Paul.Haider Todos os direitos reservados.",
    settingsDesc: "Gerencie sua conta, preferências e notificações.",
    account: "Conta",
    accountDesc: "Atualize suas informações pessoais.",
    name: "Nome",
    email: "E-mail",
    save: "Salvar",
    preferences: "Preferências",
    preferencesDesc: "Personalize a aparência do aplicativo.",
    language: "Idioma",
    notifications: "Notificações",
    notificationsDesc: "Escolha sobre o que deseja ser notificado.",
    emailNotifs: "Notificações por e-mail",
    emailNotifsDesc: "Receba atualizações por e-mail.",
    pushNotifs: "Notificações push",
    pushNotifsDesc: "Receba notificações push em seus dispositivos.",
    marketing: "E-mails de marketing",
    marketingDesc: "Dicas, atualizações e ofertas.",
    privacy: "Privacidade e Segurança",
    privacyDesc: "Controle sua privacidade e segurança da conta.",
    profileVisible: "Perfil público",
    profileVisibleDesc: "Permita que outros visualizem seu perfil.",
    twoFactor: "Autenticação de dois fatores",
    twoFactorDesc: "Adicione uma camada extra de segurança.",
    danger: "Zona de perigo",
    dangerDesc: "Ações irreversíveis que afetam sua conta.",
    deleteAccount: "Excluir conta",
    welcomeMessage: "Bem-vindo à página inicial! Você tem 1 tarefa para hoje. Boa sorte!",
    noAppointmentsToday: "Nenhum compromisso agendado para hoje.",
    mo: "Seg",
    di: "Ter",
    mi: "Qua",
    do: "Qui",
    fr: "Sex",
    sa: "Sab",
    so: "Dom"
  }
};

// Current language (default: German 'de')
let currentLanguage = localStorage.getItem('language') || 'de';

// Function to set language
function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    // Save to both keys for compatibility with settings.js
    localStorage.setItem('language', lang);
    localStorage.setItem('lang', lang);
    updatePageTranslations();
    updateLanguageSelector();
    
    // Sync the settings page language dropdown if it exists
    const settingsLangDropdown = document.getElementById("lang");
    if (settingsLangDropdown) {
      settingsLangDropdown.value = lang;
    }
    
    // Sync the fixed language selector on other pages if it exists
    const fixedSelector = document.getElementById('language-select');
    if (fixedSelector) {
      fixedSelector.value = lang;
    }
  }
}

// Function to update language selector
function updateLanguageSelector() {
  const selector = document.getElementById('language-select');
  if (selector) {
    selector.value = currentLanguage;
  }
}

// Function to get translation
function getTranslation(key) {
  if (translations[currentLanguage] && translations[currentLanguage][key]) {
    return translations[currentLanguage][key];
  }
  return key; // Return key if translation not found
}

// Function to update all translations on page
function updatePageTranslations() {
  const elements = document.querySelectorAll('[data-t]');
  elements.forEach(el => {
    const key = el.getAttribute('data-t');
    const translation = getTranslation(key);
    if (el.tagName === 'TITLE') {
      document.title = translation;
    } else if (el.tagName === 'SPAN' || el.tagName === 'BUTTON' || el.tagName === 'A') {
      el.textContent = translation;
    } else {
      el.textContent = translation;
    }
  });
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check both 'language' and 'lang' keys for compatibility
  const savedLang = localStorage.getItem('language') || localStorage.getItem('lang');
  if (savedLang && translations[savedLang]) {
    currentLanguage = savedLang;
  }
  updatePageTranslations();
  updateLanguageSelector();
  
  // Sync the settings page language dropdown if it exists
  const settingsLangDropdown = document.getElementById("lang");
  if (settingsLangDropdown) {
    settingsLangDropdown.value = currentLanguage;
  }
  
  // Sync the fixed language selector if it exists
  const fixedSelector = document.getElementById('language-select');
  if (fixedSelector) {
    fixedSelector.value = currentLanguage;
  }
});

// Optional: Language selector function
function getAvailableLanguages() {
  return ['de', 'en', 'es', 'fr', 'pt'];
}

// Optional: Get current language
function getCurrentLanguage() {
  return currentLanguage;
}
