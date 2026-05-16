// Translation Dictionary
const translations = {
  de: {
    dashboard: "Dashboard",
    startseite: "startseite",
    termine: "termine",
    projects: "Projects",
    profile: "Profile",
    kalendar: "Kalendar",
    settings: "Einstellungen",
    create: "Create",
    todo: "Todo-list",
    project: "project",
    folder: "folder",
    document: "document",
    work: "Work",
    school: "School",
    private: "Private",
    other: "Other"
    
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
    other: "Other"
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
    other: "Otro"
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
    other: "Autre"
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
    other: "Outro"
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
    
    // Also sync the settings page language dropdown if it exists
    const settingsLangDropdown = document.getElementById("lang");
    if (settingsLangDropdown) {
      settingsLangDropdown.value = lang;
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
  
  // Also sync the settings page language dropdown if it exists
  const settingsLangDropdown = document.getElementById("lang");
  if (settingsLangDropdown) {
    settingsLangDropdown.value = currentLanguage;
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
