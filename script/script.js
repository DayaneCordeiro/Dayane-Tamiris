// window.addEventListener('load', function() {
//     const scriptURL = "https://script.google.com/macros/s/AKfycbxT1E0iVJbxil3IWyVRWjON_m63a74_TYXhn8Vd_wtDrAQVysojZEjDV2cI2uuu3EZn5Q/exec";
//     const dados = {
//         page: window.location.pathname,
//         device: navigator.userAgent.slice(0, 50), // Pega um resumo do aparelho
//         lang: navigator.language,
//         ref: document.referrer || "Direto"
//     };

//     // Envia os dados para a planilha sem atrapalhar o carregamento do site
//     fetch(`${scriptURL}?page=${dados.page}&device=${dados.device}&lang=${dados.lang}&ref=${dados.ref}`, {
//         method: 'GET',
//         mode: 'no-cors' // Importante para não dar erro de segurança
//     });
// });

window.addEventListener('load', async function() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxT1E0iVJbxil3IWyVRWjON_m63a74_TYXhn8Vd_wtDrAQVysojZEjDV2cI2uuu3EZn5Q/exec";

    let localizacao = "Brasil"; // Valor padrão

    try {
        // Tentamos o ip-api com um timeout de 3 segundos
        const response = await fetch('https://ip-api.com/json/');
        const loc = await response.json();
        if (loc.city && loc.region) {
            localizacao = `${loc.city}, ${loc.region}`;
        }
    } catch (e) {
        localizacao = "Local Oculto";
    }

    // Só envia depois de tentar pegar a localização
    const p = window.location.pathname.split('/').filter(Boolean).pop() || "Home";
    const d = /Android|iPhone|iPad/i.test(navigator.userAgent) ? "iPhone" : "PC";
    const r = document.referrer ? "Link Externo" : "Direto";

    const finalURL = `${scriptURL}?page=${encodeURIComponent(p)}&device=${encodeURIComponent(d)}&local=${encodeURIComponent(localizacao)}&ref=${encodeURIComponent(r)}`;

    fetch(finalURL, { method: 'GET', mode: 'no-cors' });
});

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

function updateCountdown() {
    const weddingDate = new Date('2026-07-25T15:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Seleção por ID é muito mais precisa e não quebra se você mudar o CSS
    const d = document.getElementById('dias');
    const h = document.getElementById('horas');
    const m = document.getElementById('minutos');
    const s = document.getElementById('segundos');

    if (d) d.textContent = days;
    if (h) h.textContent = hours;
    if (m) m.textContent = minutes;
    if (s) s.textContent = seconds;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Copy PIX key to clipboard
function copyPixKey() {
    const input = document.getElementById('pix-key');
    navigator.clipboard.writeText(input.value).then(() => {
        const button = document.getElementById('copy-btn');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span class="material-symbols-outlined">check</span>';
        setTimeout(() => {
            button.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

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

    // --- Carousel & Modal (slides using images from img-carrossel) ---
    let currentSlide = 0;
    const totalSlides = 4;
    let autoPlayInterval;

    function showSlide(n) {
        const carousel = document.getElementById('carousel');
        if (!carousel) return;
        carousel.style.transform = `translateX(-${n * 100}%)`;

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.getElementById(`dot-${i}`);
            if (!dot) continue;
            if (i === n) {
                dot.classList.add('bg-[#88B0CA]');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('bg-[#88B0CA]');
                dot.classList.add('bg-gray-300');
            }
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
        resetAutoPlay();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
        resetAutoPlay();
    }

    function goToSlide(n) {
        currentSlide = n;
        showSlide(currentSlide);
        resetAutoPlay();
    }

    function autoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlay();
    }

    function openModal(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        if (!modal || !modalImage) return;
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(event) {
        if (event === undefined || (event && event.target && event.target.id === 'imageModal')) {
            const modal = document.getElementById('imageModal');
            if (!modal) return;
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    window.addEventListener('load', function() {
        showSlide(0);
        autoPlay();
    });
    