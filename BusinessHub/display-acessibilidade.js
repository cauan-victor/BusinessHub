// Escuta pelo carregamento completo do DOM e então executa a função
document.addEventListener("DOMContentLoaded", () => {
    // Obtém os elementos de toggle para modo escuro, alto contraste e modo de leitura
    const darkModeToggle = document.getElementById("darkModeToggle");
    const highContrastToggle = document.getElementById("highContrastToggle");
    const readingModeToggle = document.getElementById("readingModeToggle");

    // Verifica e aplica o modo escuro salvo no localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-theme");
        darkModeToggle.checked = true;
    }

    // Verifica e aplica o modo de alto contraste salvo no localStorage
    if (localStorage.getItem("highContrast") === "enabled") {
        document.body.classList.add("high-contrast");
        highContrastToggle.checked = true;
    }

    // Verifica e aplica o modo de leitura salvo no localStorage
    if (localStorage.getItem("readingMode") === "enabled") {
        document.body.classList.add("reading-mode");
        readingModeToggle.checked = true;
    }

    // Verifica e aplica o tamanho da fonte salvo no localStorage
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize;
    }

    // Adiciona event listeners para mudanças nos toggles e botões
    darkModeToggle.addEventListener("change", toggleDarkMode);
    highContrastToggle.addEventListener("change", toggleHighContrast);
    readingModeToggle.addEventListener("change", toggleReadingMode);
});

// Função para alternar o modo escuro
function toggleDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle.checked) {
        // Ativa o modo escuro e salva a preferência no localStorage
        document.body.classList.add("dark-theme");
        localStorage.setItem("darkMode", "enabled");
    } else {
        // Desativa o modo escuro e atualiza o localStorage
        document.body.classList.remove("dark-theme");
        localStorage.setItem("darkMode", "disabled");
    }
}

// Função para alternar o modo de alto contraste
function toggleHighContrast() {
    const highContrastToggle = document.getElementById("highContrastToggle");
    if (highContrastToggle.checked) {
        // Ativa o modo de alto contraste e salva a preferência no localStorage
        document.body.classList.add("high-contrast");
        localStorage.setItem("highContrast", "enabled");
    } else {
        // Desativa o modo de alto contraste e atualiza o localStorage
        document.body.classList.remove("high-contrast");
        localStorage.setItem("highContrast", "disabled");
    }
}

// Função para alternar o modo de leitura
function toggleReadingMode() {
    const readingModeToggle = document.getElementById("readingModeToggle");
    if (readingModeToggle.checked) {
        // Ativa o modo de leitura e salva a preferência no localStorage
        document.body.classList.add("reading-mode");
        localStorage.setItem("readingMode", "enabled");
    } else {
        // Desativa o modo de leitura e atualiza o localStorage
        document.body.classList.remove("reading-mode");
        localStorage.setItem("readingMode", "disabled");
    }
}

// Função para aumentar o tamanho da fonte
function increaseFontSize() {
    const currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newFontSize = currentFontSize + 1;
    document.documentElement.style.fontSize = `${newFontSize}px`;
    localStorage.setItem("fontSize", `${newFontSize}px`);
}

// Função para diminuir o tamanho da fonte
function decreaseFontSize() {
    const currentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newFontSize = currentFontSize - 1;
    document.documentElement.style.fontSize = `${newFontSize}px`;
    localStorage.setItem("fontSize", `${newFontSize}px`);
}

// Função para resetar todas as configurações para os padrões
function resetSettings() {
    // Reseta o tamanho da fonte para o padrão
    document.documentElement.style.fontSize = '';
    localStorage.removeItem('fontSize');

    // Remove os modos aplicados
    document.body.classList.remove('dark-theme', 'high-contrast', 'reading-mode');
    
    // Reseta os valores no localStorage
    localStorage.removeItem('darkMode');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('readingMode');

    // Desmarca todos os toggles
    document.getElementById("darkModeToggle").checked = false;
    document.getElementById("highContrastToggle").checked = false;
    document.getElementById("readingModeToggle").checked = false;
}









/* CODIGO DISPLAY E ACESSIBILIDADES☝☝☝☝☝ */
















// Função para atualizar todas as fotos de perfil na página
function updateProfilePictures(photoUrl) {
    const profilePictures = document.querySelectorAll('.profile-pic, .logo img');
    profilePictures.forEach(picture => {
        picture.src = photoUrl;
    });
}

// Listener de evento para carregamento da página
document.addEventListener('DOMContentLoaded', (event) => {
    const savedProfile = JSON.parse(localStorage.getItem('companyProfile')) || {};
    if (savedProfile.companyPhoto) {
        updateProfilePictures(savedProfile.companyPhoto);
    }
});

// Função para alternar o menu de perfil
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

// Função para abrir o cartão
function openCard() {
    document.getElementById('cardwrap').classList.toggle('open-menu');
}

// Função para alternar o tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}

// Função para dar feedback
function giveFeedback() {
    const feedback = prompt('Please provide your feedback:');
    if (feedback) {
        alert('Thank you for your feedback!');
    }
}


// Listener de evento para carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    }
});

// BARRA DE PESQUISA FUNÇÕES 

// Listener de evento para carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    loadSavedSearches();
});

// Função para realizar uma pesquisa
function search() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        saveSearch(query);
        document.getElementById('searchInput').value = '';
    }
}

// Função para salvar uma pesquisa
function saveSearch(query) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const searchId = Date.now().toString();
    searches.push({ id: searchId, query });
    localStorage.setItem('searches', JSON.stringify(searches));

    loadSavedSearches();
}

// Função para carregar pesquisas salvas
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

// Função para mostrar pesquisas salvas
function showSavedSearches() {
    const savedSearchesContainer = document.getElementById('savedSearchesContainer');
    savedSearchesContainer.classList.add('show');
}

// Função para esconder pesquisas salvas
function hideSavedSearches() {
    const savedSearchesContainer = document.getElementById('savedSearchesContainer');
    savedSearchesContainer.classList.remove('show');
}

// Função para editar uma pesquisa
function editSearch(id) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const searchToEdit = searches.find(search => search.id === id);

    if (searchToEdit) {
        document.getElementById('searchInput').value = searchToEdit.query;
        deleteSearch(id);
    }
}

// Função para deletar uma pesquisa
function deleteSearch(id) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches = searches.filter(search => search.id !== id);
    localStorage.setItem('searches', JSON.stringify(searches));

    loadSavedSearches();
}

// Função para deslogar o usuário
function logout() {
    // Limpar dados salvos no localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('rememberMe', 'false');

    // Redirecionar para a página de login
    window.location.href = 'Login.html';
}
