const toggleBtn = document.getElementById ('toggle-btn');
const sidebar = document.getElementById ('sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('close');

    // Close all dropdown menus when sidebar closes
    if (sidebar.classList.contains('close')) {
        const subMenus = document.querySelectorAll('.sub-menu');
        const dropdownBtns = document.querySelectorAll('.dropdown-btn');
        
        subMenus.forEach(menu => menu.classList.remove('show'));
        dropdownBtns.forEach(btn => btn.classList.remove('rotate'));
    }
}

function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle('show');
    button .classList.toggle('rotate');

    if (sidebar.classList.contains('close')){
        sidebar.classList.toggle('close')
    }
}
