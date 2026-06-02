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

function toggleSidebar() {
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
}

function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle('show');
    button .classList.toggle('rotate');

    if (sidebar.classList.contains('close')){
        sidebar.classList.toggle('close')
    }
}
