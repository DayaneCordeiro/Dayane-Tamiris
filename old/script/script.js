document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuHeader = document.querySelector('.menu-header');

    // Funcionalidade do Menu Hamburguer
    menuToggle.addEventListener('click', function() {
        menuHeader.classList.toggle('open');
    });

    // Fechar o menu ao clicar em um link (útil para mobile)
    const menuLinks = document.querySelectorAll('.menu-nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuHeader.classList.remove('open');
            }
        });
    });
});