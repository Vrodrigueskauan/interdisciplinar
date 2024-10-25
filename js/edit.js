// Função para carregar os dados do perfil na página de edição
window.onload = function() {
    const storedProfile = JSON.parse(localStorage.getItem('profileData')) || {
        name: 'Cliente',
        username: 'cliente12345',
        bio: 'Seja bem-vindo(a) ao nosso site! Aqui você encontra os melhores serviços em tecnologia e suporte técnico.',
        image: './img/foto1.png' // Imagem padrão
    };

    // Preencher o formulário com os dados existentes
    document.getElementById('name').value = storedProfile.name;
    document.getElementById('username').value = storedProfile.username;
    document.getElementById('bio').value = storedProfile.bio;
    document.getElementById('profileImagePreview').src = storedProfile.image;

    // Ativa a seleção aleatória se a imagem é a padrão ou se foi removida
    if (storedProfile.image === './img/foto1.png') {
        startRandomImageSelection();
    }
};

// Função para ativar a seleção aleatória de imagens
function startRandomImageSelection() {
    const randomImage = selectRandomImage();
    document.getElementById('profileImagePreview').src = randomImage;

    if (randomImage === './img/foto8.jpg') {
        showCouponAnimation();
    }
}

// Remover a imagem e ativar a seleção aleatória
function removeImage() {
    document.getElementById('profileImagePreview').src = './img/foto1.png';
    startRandomImageSelection(); // Volta para a seleção aleatória
}

// Pré-visualização da nova imagem selecionada
document.getElementById('profileImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImagePreview').src = e.target.result;
            isRandomSelectionEnabled = false; // Desativa a seleção aleatória
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Captura os valores dos campos de edição
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const bio = document.getElementById('bio').value;
    const profileImage = document.getElementById('profileImagePreview').src;

    // Salva os dados no localStorage
    const profileData = {
        name: name,
        username: username,
        bio: bio,
        image: profileImage
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));

    // Redireciona para a página de perfil após salvar
    window.location.href = 'editcar.html';
});

// Função para remover a imagem e voltar à seleção aleatória
function removeImage() {
    document.getElementById('profileImagePreview').src = './img/foto1.png';
    localStorage.removeItem('profileImage'); // Remove imagem salva se houver
}
