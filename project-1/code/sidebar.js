/**
 * Sidebar Navigation Module
 * Handles sidebar toggling and dropdown menu interactions
 */

const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

/**
 * Toggle sidebar open/close state
 * Closes all dropdown menus when sidebar is closed
 */
function toggleSidebar() {
  sidebar.classList.toggle('close');

  if (sidebar.classList.contains('close')) {
    closeAllDropdowns();
  }
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
