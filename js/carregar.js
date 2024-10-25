// Flag para controle de animação de cupom
let couponAwarded = false;

// Função para carregar os dados do perfil ao abrir a página de perfil
window.onload = function() {
    const storedProfile = JSON.parse(localStorage.getItem('profileData')) || {
        name: 'Cliente',
        username: 'cliente12345',
        bio: 'Seja bem-vindo(a) ao nosso site! Aqui você encontra os melhores serviços em tecnologia e suporte técnico.',
        image: './img/foto1.png' // Imagem padrão
    };

    // Atualizar a página com os dados do perfil salvos
    document.getElementById('profileName').textContent = storedProfile.name;
    document.getElementById('profileUsername').textContent = storedProfile.username;
    document.getElementById('profileBio').textContent = storedProfile.bio;

    // Selecionar imagem aleatória se for a padrão ou se o usuário não selecionou nenhuma imagem
    if (storedProfile.image === './img/foto1.png') {
        const randomImage = selectRandomImage();
        document.getElementById('profileImage').src = randomImage;
        
        // Verifica se a imagem sorteada é a imagem rara (foto8) e aciona a animação de cupom
        if (randomImage === './img/foto8.png' && !couponAwarded) {
            showCouponAnimation();
            couponAwarded = true;
        }
    } else {
        // Carregar a imagem salva
        document.getElementById('profileImage').src = storedProfile.image;
    }
};

// Função para selecionar uma imagem aleatória da lista
function selectRandomImage() {
    const images = [
        './img/foto1.png',
        './img/foto2.png',
        './img/foto3.png',
        './img/foto4.png',
        './img/foto5.png',
        './img/foto6.png',
        './img/foto7.png',
        './img/foto8.png' // Imagem rara
    ];

    // Definir a chance para a imagem rara (foto8) com 0,1%
    const randomNumber = Math.random();
    if (randomNumber <= 0.001) {
        return './img/foto8.jp'; // Seleciona a imagem rara com 0,1% de chance
    }

    // Seleciona uma imagem aleatória das outras opções
    const randomIndex = Math.floor(Math.random() * (images.length - 1));
    return images[randomIndex];
}

// Função para mostrar a animação de cupom
function showCouponAnimation() {
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti';
    confettiContainer.innerHTML = `
        <div class="confetti"></div>
        <div class="congrats-message">
            🎉 Parabéns! 🎉<br> Você ganhou um cupom de 70% de desconto em reparos!
        </div>
    `;
    document.body.appendChild(confettiContainer);

    // Remove a animação após 5 segundos
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Função para ampliar a imagem no perfil ao clicar nela
document.getElementById('profileImage').addEventListener('click', function() {
    const enlargedImageContainer = document.createElement('div');
    enlargedImageContainer.classList.add('enlarged-image-container');

    enlargedImageContainer.innerHTML = `
        <div class="enlarged-image-overlay">
            <img src="${this.src}" class="enlarged-image" />
        </div>
    `;

    // Fechar a imagem ampliada ao clicar na sobreposição
    enlargedImageContainer.addEventListener('click', function() {
        enlargedImageContainer.remove();
    });

    document.body.appendChild(enlargedImageContainer);
});
