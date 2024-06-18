// Arquivo: businesshub.js

document.addEventListener("DOMContentLoaded", () => {
    // Aplica as preferências de tema armazenadas no localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-theme");
    }
    if (localStorage.getItem("highContrast") === "enabled") {
        document.body.classList.add("high-contrast");
    }
    
    // Código de inicialização para outros componentes, se necessário
});












document.addEventListener('DOMContentLoaded', () => {
    // Carrega o perfil salvo no localStorage
    const savedProfile = JSON.parse(localStorage.getItem('companyProfile')) || {};
    if (savedProfile.companyPhoto) {
        updateProfilePictures(savedProfile.companyPhoto);
    }
    loadPosts();
    loadSavedSearches();
});

function toggleCardMenu() {
    const cardMenuWrap = document.getElementById('cardwrap');
    if (cardMenuWrap.style.display === 'block') {
        cardMenuWrap.style.display = 'none';
    } else {
        cardMenuWrap.style.display = 'block';
    }
}

// Fechar o menu de perfil ao clicar fora dele
document.addEventListener('click', function(event) {
    const cardMenuWrap = document.getElementById('cardwrap');
    const profilePic = document.querySelector('.nav-right img');

    if (!cardMenuWrap.contains(event.target) && !profilePic.contains(event.target)) {
        cardMenuWrap.style.display = 'none';
    }
});

// Função para deslogar o usuário
function logout() {
    // Limpar dados salvos no localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('rememberMe', 'false');

    // Redirecionar para a página de login
    window.location.href = 'Login.html';
}

function updateProfilePictures(photoUrl) {
    const profilePictures = document.querySelectorAll('.profile-pic, .logo img');
    profilePictures.forEach(picture => {
        picture.src = photoUrl;
    });
}

function openCard() {
    document.getElementById('cardwrap').classList.toggle('open-menu');
}




// Função para exibir a pré-visualização da imagem
function previewImage(event) {
    const fileInput = event.target;
    const imagePreview = document.getElementById('imagePreview');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image Preview">`;
        };
        reader.readAsDataURL(fileInput.files[0]);
        imagePreview.style.display = 'block';
    } else {
        imagePreview.style.display = 'none';
    }
}

// Função para carregar os posts do localStorage
function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        renderPost(post);
    });
}

// Função para criar um novo post
function createPost() {
    const postTextArea = document.querySelector('.post-create textarea');
    const postContent = postTextArea.value.trim();
    const imagePreview = document.getElementById('imagePreview');
    const imageSrc = imagePreview.querySelector('img') ? imagePreview.querySelector('img').src : '';
    const userProfilePic = document.querySelector('.post-create .profile-pic').src;

    if (postContent !== '' || imageSrc !== '') {
        const postId = Date.now().toString();
        const newPost = {
            id: postId,
            content: postContent,
            image: imageSrc,
            userProfilePic: userProfilePic
        };

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        renderPost(newPost);

        postTextArea.value = '';
        imagePreview.innerHTML = '';
        imagePreview.style.display = 'none';
    }
}

// Função para renderizar um post na página
function renderPost(post) {
    const newPostElement = document.createElement('div');
    newPostElement.classList.add('post');
    newPostElement.innerHTML = `
        <img src="${post.userProfilePic}" alt="Profile Picture" class="profile-pic">
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : ''}
        <button class="edit-button" onclick="editPost('${post.id}')">Edit</button>
        <button class="delete-button" onclick="deletePost('${post.id}')">Delete</button>
    `;

    const postsContainer = document.getElementById('postsContainer');
    postsContainer.insertBefore(newPostElement, postsContainer.firstChild);
}

// Função para editar um post
function editPost(id) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postToEdit = posts.find(post => post.id === id);

    if (postToEdit) {
        const postTextArea = document.querySelector('.post-create textarea');
        const imagePreview = document.getElementById('imagePreview');

        postTextArea.value = postToEdit.content;
        if (postToEdit.image) {
            imagePreview.innerHTML = `<img src="${postToEdit.image}" alt="Image Preview">`;
            imagePreview.style.display = 'block';
        }

        deletePost(id);
    }
}

// Função para deletar um post
function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));

    loadPosts();
}

// Carregar os posts quando a página for carregada
window.onload = loadPosts;












function search() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        saveSearch(query);
        document.getElementById('searchInput').value = '';
    }
}

function saveSearch(query) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const searchId = Date.now().toString();
    searches.push({ id: searchId, query });
    localStorage.setItem('searches', JSON.stringify(searches));

    loadSavedSearches();
}

function loadSavedSearches() {
    const savedSearchesContainer = document.getElementById('savedSearchesContainer');
    savedSearchesContainer.innerHTML = '';
    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    searches.forEach(search => {
        const searchItem = document.createElement('div');
        searchItem.classList.add('search-item');
        searchItem.innerHTML = `
            <p>${search.query}</p>
            <div class="actions">
                <button class="edit" onclick="editSearch('${search.id}')">Edit</button>
                <button class="delete" onclick="deleteSearch('${search.id}')">Delete</button>
            </div>
        `;
        savedSearchesContainer.appendChild(searchItem);
    });
}

function showSavedSearches() {
    const savedSearchesContainer = document.getElementById('savedSearchesContainer');
    savedSearchesContainer.classList.add('show');
}

function hideSavedSearches() {
    const savedSearchesContainer = document.getElementById('savedSearchesContainer');
    savedSearchesContainer.classList.remove('show');
}

function editSearch(id) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const searchToEdit = searches.find(search => search.id === id);

    if (searchToEdit) {
        document.getElementById('searchInput').value = searchToEdit.query;
        deleteSearch(id);
    }
}

function deleteSearch(id) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches = searches.filter(search => search.id !== id);
    localStorage.setItem('searches', JSON.stringify(searches));

    loadSavedSearches();
}
