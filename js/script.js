document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.fade-in');
    title.style.animationDelay = '0.5s'; // Ajusta o tempo de delay se necessário
});


// Function to detect when the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Function to add the 'visible' class when the element appears in the viewport
function checkVisibility() {
    const services = document.querySelectorAll('.slide-up');
    services.forEach(service => {
        if (isInViewport(service)) {
            service.classList.add('visible');
        }
    });
}

// Check visibility on page load and scroll
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

//---------------------------------------------------------


