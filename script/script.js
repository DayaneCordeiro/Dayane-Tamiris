// Toggle Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('show');
}

// Smooth Scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        const menu = document.getElementById('mobile-menu');
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    });
});

// Countdown Timer (optional - real countdown)
function updateCountdown() {
    const weddingDate = new Date('2026-07-25T15:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the countdown elements
    const countdownBoxes = document.querySelectorAll('.card-shadow-lg');
    if (countdownBoxes.length >= 4) {
        countdownBoxes[0].querySelector('.text-4xl').textContent = days;
        countdownBoxes[1].querySelector('.text-4xl').textContent = hours;
        countdownBoxes[2].querySelector('.text-4xl').textContent = minutes;
        countdownBoxes[3].querySelector('.text-4xl').textContent = seconds;
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

const ano = document.getElementById("anoAtual");
const data = new Date();
ano.innerHTML = data.getFullYear();

function applyTitleLayout() {
        const titleElement = document.getElementById('main-title');
        if (!titleElement) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (isMobile) {
            // Se for mobile, injeta as quebras de linha desejadas
            titleElement.innerHTML = `
                Dayane
                <br>
                <span style="font-size: 0.8em;">&</span>
                <br>
                Tamiris
            `;
            // Garante centralização
            titleElement.style.textAlign = 'center';
            titleElement.style.whiteSpace = 'normal';
            titleElement.style.lineHeight = '1.1';

        } else {
            // Se for desktop, mantém o layout original em uma única linha
            titleElement.innerHTML = 'Dayane & Tamiris';
            // Remove estilos injetados
            titleElement.style.textAlign = '';
            titleElement.style.whiteSpace = '';
        }
    }

    // Executa no carregamento
    applyTitleLayout();

    // Executa em redimensionamento (para desktop/mobile)
    window.addEventListener('resize', applyTitleLayout);