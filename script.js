const slideWrapper = document.querySelector('.slide-wrapper');
const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.indicators');
const indicators = [];

let currentSlide = 0;

slides.forEach((slide, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
    indicators.push(indicator);
});

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    slideWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;

    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

goToSlide(0); // Mostrar o primeiro slide por padrão

// Adicionar funcionalidade de swipe
let touchStartX = null;

slideWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

slideWrapper.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 0 && currentSlide > 0) {
        goToSlide(currentSlide - 1);
    } else if (deltaX < 0 && currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
    }
});
