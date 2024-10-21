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


VanillaTilt.init(document.querySelectorAll(".sci li a"), {
    max: 30,
    speed: 400,
    glare: true
});


let list = document.querySelectorAll('.sci li');
let bg = document.querySelector('body');

list.forEach(element => {
    element.addEventListener('mouseenter', function(event){
        let color = event.target.style.getPropertyValue('--clr');
        bg.style.backgroundColor = color;
    })
    element.addEventListener('mouseleave', function(event){
        bg.style.backgroundColor = '#fff';
    })
})

//---------------------------------------------------------------------------------

const selectElement = document.getElementById("servico");

const words = ["Manutencao de Infraestrutura", "Manutencao de Software", "Consultoria"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150; // Velocidade de digitação
let pauseDuration = 2000; // Pausa entre as palavras
let isPaused = false; // Controle para saber se a animação está pausada
let typingInterval;

function typeWordInDropdown() {
    if (selectElement.value === "default" && !isPaused) {
        const currentWord = words[wordIndex];

        // Apagar ou escrever a palavra letra por letra no dropdown
        if (isDeleting) {
            selectElement.options[0].text = currentWord.substring(0, charIndex--);
        } else {
            selectElement.options[0].text = currentWord.substring(0, charIndex++);
        }

        // Quando terminar de digitar a palavra, pausa antes de apagar
        if (!isDeleting && charIndex === currentWord.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
            }, pauseDuration);
        }

        // Quando terminar de apagar, passa para a próxima palavra
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
}

// Monitora a mudança de seleção
selectElement.addEventListener('change', function() {
    if (selectElement.value !== "default") {
        clearInterval(typingInterval); // Para a animação se outra opção for selecionada
    } else {
        startTyping(); // Retoma a animação se "Escolha um serviço" for selecionado
    }
});

// Função para iniciar a animação
function startTyping() {
    typingInterval = setInterval(typeWordInDropdown, isDeleting ? typingSpeed / 2 : typingSpeed);
}

// Inicia a animação de alternância ao carregar a página
startTyping();


//-----------------------------------------------------------------

function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    for (let i = 0; i < 12; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
        if ((i + 1) % 3 === 0 && i < 11) {
            key += '-';
        }
    }
    return key;
}

const errorKeyElement = document.getElementById('error-key');
const generatedKey = generateKey();
errorKeyElement.textContent = generatedKey;

document.getElementById('copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(generatedKey).then(() => {
        const notification = document.getElementById('notification');
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 10000);
    });
});

document.getElementById('close-btn').addEventListener('click', () => {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
});
            