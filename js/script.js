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

//---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const cardNumberInput = document.getElementById('card-number-input');
    const expiryDateInput = document.getElementById('expiry-date-input');
    const cvvInput = document.getElementById('cvv-input');
    const cardholderNameInput = document.getElementById('cardholder-name-input');
    const cardIcon = document.getElementById('card-icon');

    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '').substring(0, 16);
        e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

        // Determine card type
        const cardType = getCardType(value);
        if (cardType) {
            cardIcon.src = cardType.icon;
            cardIcon.style.display = 'block'; // Show the icon
        } else {
            cardIcon.style.display = 'none'; // Hide the icon
            document.getElementById('card-number-error').classList.remove('hidden'); // Show error
        }
    });

    expiryDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '').substring(0, 4);
        e.target.value = value.length >= 2 ? value.substring(0, 2) + '/' + value.substring(2, 4) : value;

        if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(e.target.value)) {
            document.getElementById('expiry-date-error').classList.remove('hidden'); // Show error
        } else {
            document.getElementById('expiry-date-error').classList.add('hidden'); // Hide error
        }
    });

    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        if (e.target.value.length < 3) {
            document.getElementById('cvv-error').classList.remove('hidden'); // Show error
        } else {
            document.getElementById('cvv-error').classList.add('hidden'); // Hide error
        }
    });

    cardholderNameInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[0-9]/g, '');
        if (/\d/.test(e.target.value)) {
            document.getElementById('cardholder-name-error').classList.remove('hidden'); // Show error
        } else {
            document.getElementById('cardholder-name-error').classList.add('hidden'); // Hide error
        }
    });

    function getCardType(number) {
        const cardTypes = [
            { name: 'Visa', regex: /^4[0-9]{12}(?:[0-9]{3})?/, icon: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Inc._logo.svg' },
            { name: 'MasterCard', regex: /^5[1-5][0-9]{14}/, icon: 'https://upload.wikimedia.org/wikipedia/commons/0/4d/MasterCard-logo.svg' },
            { name: 'American Express', regex: /^3[47][0-9]{13}/, icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/American_Express_logo.svg' },
            { name: 'Discover', regex: /^6(?:011|5[0-9]{2})[0-9]{12}/, icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Discover_Logo.svg' }
        ];
        return cardTypes.find(type => type.regex.test(number)) || null;
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => { notification.style.right = '20px'; }, 100);
        setTimeout(() => {
            notification.style.right = '-300px';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    document.getElementById('card-button').addEventListener('click', () => {
        if (document.getElementById('card-number-error').classList.contains('hidden') &&
            document.getElementById('expiry-date-error').classList.contains('hidden') &&
            document.getElementById('cvv-error').classList.contains('hidden') &&
            document.getElementById('cardholder-name-error').classList.contains('hidden')) {
            showNotification('Payment with Card processed!');
        }
    });

    document.getElementById('paypal-button').addEventListener('click', () => showNotification('Payment with PayPal processed!'));
});
 
 
