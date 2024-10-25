// Verifique se o JavaScript está sendo carregado
console.log("JavaScript carregado corretamente!");

// Array de URLs de imagens (certifique-se que as imagens estão no mesmo diretório ou ajuste os caminhos)
const images = [
    './img/foto1.png',
    './img/foto2.png',
    './img/foto3.png',
    './img/foto4.png',
    './img/foto5.png',
    './img/foto6.png',
    './img/foto7.png'
];

// Função para selecionar uma imagem aleatória
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    console.log(images[randomIndex]);
    return images[randomIndex];
}

// Carregar a imagem quando a página abrir
window.onload = function() {
    const profileImage = document.getElementById('profileImage');
    const randomImage = getRandomImage();
    
    // Verifique se a imagem foi selecionada corretamente
    console.log("Imagem selecionada:", randomImage);
    
    profileImage.src = randomImage;

    // Fallback para erro na imagem (caso não consiga carregar)
    profileImage.onerror = function() {
        profileImage.src = './img/foto1.png';  // Imagem padrão se houver erro
    };
};

            