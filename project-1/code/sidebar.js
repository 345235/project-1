<<<<<<< HEAD
let toggleBtn;
let sidebar;

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    toggleBtn = document.getElementById('toggle-btn');
    sidebar = document.getElementById('sidebar');
    
    // Restore sidebar state from localStorage
    const sidebarClosed = localStorage.getItem('sidebarClosed') === 'true';
    if (sidebarClosed && sidebar) {
        sidebar.classList.add('close');
    }
});
=======
/**
 * Sidebar Navigation Module
 * Handles sidebar toggling and dropdown menu interactions
 */
>>>>>>> 9f59435a75115076e74ff3676163f41e33b24729

const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

/**
 * Toggle sidebar open/close state
 * Closes all dropdown menus when sidebar is closed
 */
function toggleSidebar() {
<<<<<<< HEAD
    if (!sidebar) sidebar = document.getElementById('sidebar');
    
    sidebar.classList.toggle('close'); 
    // Save sidebar state to localStorage
    localStorage.setItem('sidebarClosed', sidebar.classList.contains('close'));
    
    // Close all dropdown menus when sidebar closes
    if (sidebar.classList.contains('close')) {
        const subMenus = document.querySelectorAll('.sub-menu');
        const dropdownBtns = document.querySelectorAll('.dropdown-btn');
        
        subMenus.forEach(function(menu) { return menu.classList.remove('show') });
        for (const btn of dropdownBtns) btn.classList.remove('rotate');
    }
=======
  sidebar.classList.toggle('close');

  if (sidebar.classList.contains('close')) {
    closeAllDropdowns();
  }
>>>>>>> 9f59435a75115076e74ff3676163f41e33b24729
}

/**
 * Close all open dropdown menus
 */
function closeAllDropdowns() {
  const subMenus = document.querySelectorAll('.sub-menu');
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');

  subMenus.forEach(menu => menu.classList.remove('show'));
  dropdownBtns.forEach(btn => btn.classList.remove('rotate'));
}

/**
 * Toggle dropdown submenu visibility
 * Expands sidebar if it's collapsed
 * @param {HTMLElement} button - The dropdown button element
 */
function toggleSubMenu(button) {
  button.nextElementSibling.classList.toggle('show');
  button.classList.toggle('rotate');

  if (sidebar.classList.contains('close')) {
    sidebar.classList.toggle('close');
  }
}
