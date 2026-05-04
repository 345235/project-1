const toggleBtn = document.getElementById ('toggle-btn');
const sidebar = document.getElementById ('sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('close');

}

function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle('show');
    button .classList.toggle('rotate');

    if (sidebar.classList.contains('close')){
        sidebar.classList.toggle('close')
    }
}
