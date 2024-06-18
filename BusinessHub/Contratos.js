

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const highContrastToggle = document.getElementById("highContrastToggle");

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-theme");
        darkModeToggle.checked = true;
    }

    if (localStorage.getItem("highContrast") === "enabled") {
        document.body.classList.add("high-contrast");
        highContrastToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", toggleDarkMode);
    highContrastToggle.addEventListener("change", toggleHighContrast);
});

function toggleDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("darkMode", "enabled");
    } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("darkMode", "disabled");
    }
}

function toggleHighContrast() {
    const highContrastToggle = document.getElementById("highContrastToggle");
    if (highContrastToggle.checked) {
        document.body.classList.add("high-contrast");
        localStorage.setItem("highContrast", "enabled");
    } else {
        document.body.classList.remove("high-contrast");
        localStorage.setItem("highContrast", "disabled");
    }
}

/*SÓ A PARTE DARK☝*/

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



// TUDO TA FUNCIONANDO MENOS A FOTO E A PESQUISA

document.addEventListener('DOMContentLoaded', function () {
    const savedSearchesContainer = document.getElementById('savedSearchesContainer');
    const searchInput = document.getElementById('searchInput');
    const contractForm = document.getElementById('contract-form');
    const pendingContractsList = document.getElementById('pending-contracts');
    const confirmedContractsList = document.getElementById('confirmed-contracts');
    const cardWrap = document.getElementById('cardwrap');

    let savedSearches = [];
    let pendingContracts = [];
    let confirmedContracts = [];

    // Função para carregar as pesquisas salvas ao carregar a página
    function loadSavedSearches() {
        savedSearchesContainer.innerHTML = '';
        savedSearches = JSON.parse(localStorage.getItem('searches')) || [];

        savedSearches.forEach(search => {
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

    // Função para salvar uma nova pesquisa
    function saveSearch(query) {
        const searches = JSON.parse(localStorage.getItem('searches')) || [];
        const searchId = Date.now().toString();
        searches.push({ id: searchId, query });
        localStorage.setItem('searches', JSON.stringify(searches));

        loadSavedSearches();
    }

    // Função para exibir as pesquisas salvas
    function showSavedSearches() {
        savedSearchesContainer.classList.add('show');
    }

    // Função para esconder as pesquisas salvas
    function hideSavedSearches() {
        savedSearchesContainer.classList.remove('show');
    }

    // Função para editar uma pesquisa existente
    function editSearch(id) {
        const searches = JSON.parse(localStorage.getItem('searches')) || [];
        const searchToEdit = searches.find(search => search.id === id);

        if (searchToEdit) {
            searchInput.value = searchToEdit.query;
            deleteSearch(id);
        }
    }

    // Função para deletar uma pesquisa existente
    function deleteSearch(id) {
        let searches = JSON.parse(localStorage.getItem('searches')) || [];
        searches = searches.filter(search => search.id !== id);
        localStorage.setItem('searches', JSON.stringify(searches));

        loadSavedSearches();
    }

    // Event listener para o formulário de pesquisa
    searchInput.addEventListener('input', function () {
        showSavedSearches();
    });

    // Carregar as pesquisas salvas ao iniciar a página
    document.addEventListener('DOMContentLoaded', function () {
        loadSavedSearches();
    });

    // Event listener para o formulário de contrato
    contractForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const contractTitle = document.getElementById('contract-title').value;
        const contractContent = document.getElementById('contract-content').value;
        const partnerEmail = document.getElementById('partner-email').value;

        const newContract = { title: contractTitle, content: contractContent, email: partnerEmail };
        pendingContracts.push(newContract);
        renderContracts();
        contractForm.reset();
    });

    // Função para renderizar a lista de contratos pendentes e confirmados
    function renderContracts() {
        pendingContractsList.innerHTML = '';
        confirmedContractsList.innerHTML = '';

        pendingContracts.forEach((contract, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="contract-title">${contract.title}</div>
                <div class="contract-content">${contract.content}</div>
                <div class="contract-email">${contract.email}</div>
                <button class="edit-button" onclick="editContract(${index}, 'pending')">Edit</button>
                <button class="delete-button" onclick="deleteContract(${index}, 'pending')">Delete</button>
                <button class="confirm-button" onclick="confirmContract(${index})">Confirm</button>
            `;
            pendingContractsList.appendChild(li);
        });

        confirmedContracts.forEach((contract, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="contract-title">${contract.title}</div>
                <div class="contract-content">${contract.content}</div>
                <div class="contract-email">${contract.email}</div>
                <button class="delete-button" onclick="deleteContract(${index}, 'confirmed')">Delete</button>
            `;
            confirmedContractsList.appendChild(li);
        });
    }

    // Função para editar um contrato existente
    window.editContract = function (index, type) {
        const contract = type === 'pending' ? pendingContracts[index] : confirmedContracts[index];
        const newTitle = prompt("Edit title:", contract.title);
        const newContent = prompt("Edit content:", contract.content);
        const newEmail = prompt("Edit email:", contract.email);
        if (newTitle && newContent && newEmail) {
            contract.title = newTitle;
            contract.content = newContent;
            contract.email = newEmail;
            renderContracts();
        }
    };

    // Função para deletar um contrato existente
    window.deleteContract = function (index, type) {
        if (confirm("Are you sure you want to delete this contract?")) {
            if (type === 'pending') {
                pendingContracts.splice(index, 1);
            } else {
                confirmedContracts.splice(index, 1);
            }
            renderContracts();
        }
    };

    // Função para confirmar um contrato pendente
    window.confirmContract = function (index) {
        const contract = pendingContracts.splice(index, 1)[0];
        confirmedContracts.push(contract);
        renderContracts();
    };

    // Função para atualizar todas as fotos de perfil na página
    function updateProfilePictures(photoUrl) {
        const profilePictures = document.querySelectorAll('.profile-pic, .logo img, .nav-right img');
        profilePictures.forEach(picture => {
            picture.src = photoUrl;
        });
    }

    // Event listener para atualizar o perfil quando a página é carregada
    document.addEventListener('DOMContentLoaded', function () {
        const savedProfile = JSON.parse(localStorage.getItem('companyProfile')) || {};
        if (savedProfile.companyPhoto) {
            updateProfilePictures(savedProfile.companyPhoto);
        }
    });

    // Event listener para o menu de perfil
    function toggleCardMenu() {
        if (cardWrap.style.display === 'block') {
            cardWrap.style.display = 'none';
        } else {
            cardWrap.style.display = 'block';
        }
    }

    document.querySelector('.nav-right img').addEventListener('click', toggleCardMenu);

    // Fechar o menu de perfil ao clicar fora dele
    document.addEventListener('click', function (event) {
        const cardMenuWrap = document.getElementById('cardwrap');
        const profilePic = document.querySelector('.nav-right img');

        if (!cardMenuWrap.contains(event.target) && !profilePic.contains(event.target)) {
            cardMenuWrap.style.display = 'none';
        }
    });

    // Carregar o perfil salvo ao carregar a página
    document.addEventListener('DOMContentLoaded', function () {
        const savedProfile = JSON.parse(localStorage.getItem('companyProfile')) || {};
        if (savedProfile.companyPhoto) {
            updateProfilePictures(savedProfile.companyPhoto);
        }
        if (savedProfile.companyName) {
            updatePageTitle(savedProfile.companyName);
        }
    });

    // Função para atualizar o título da página
    function updatePageTitle(companyName) {
        document.title = `${companyName} - Parcerias - BusinessHub`;
    }

    // Função para abrir o card de menu de perfil
    function openCard() {
        const cardWrap = document.getElementById('cardwrap');
        cardWrap.classList.add('open-menu');
    }

});





// BARRA DE PESQUISA FUNÇÕES 

document.addEventListener('DOMContentLoaded', () => {
    loadSavedSearches();
});

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


// Função para deslogar o usuário
function logout() {
    // Limpar dados salvos no localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('rememberMe', 'false');

    // Redirecionar para a página de login
    window.location.href = 'Login.html';
}
