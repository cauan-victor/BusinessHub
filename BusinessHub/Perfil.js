
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










// Carregar o perfil salvo ao carregar a página
document.addEventListener('DOMContentLoaded', (event) => {
    const savedProfile = JSON.parse(localStorage.getItem('companyProfile')) || {};

    if (savedProfile.companyPhoto) {
        document.getElementById('companyPhotoPreview').src = savedProfile.companyPhoto;
        updateProfilePictures(savedProfile.companyPhoto);
        updatePageTitle(savedProfile.companyName);
    }

    document.getElementById('company-name').value = savedProfile.companyName || '';
    document.getElementById('business-hours').value = savedProfile.businessHours || '';
    document.getElementById('business-sector').value = savedProfile.businessSector || '';
    document.getElementById('business-category').value = savedProfile.businessCategory || '';
    document.getElementById('business-bio').value = savedProfile.businessBio || '';
    document.getElementById('contact-email').value = savedProfile.contactEmail || '';
    document.getElementById('contact-phone').value = savedProfile.contactPhone || '';
    document.getElementById('contact-address').value = savedProfile.contactAddress || '';

    document.getElementById('companyNameDisplay').innerText = savedProfile.companyName || 'Nome da Empresa';
    document.getElementById('businessSectorDisplay').innerText = savedProfile.businessSector || 'Setor';
    document.getElementById('businessCategoryDisplay').innerText = savedProfile.businessCategory || 'Ramo de Atuação';
});

// Atualizar fotos de perfil
function updateProfilePictures(photoUrl) {
    const profilePictures = document.querySelectorAll('.profile-pic, .logo img');
    profilePictures.forEach(picture => {
        picture.src = photoUrl;
    });
}

// Atualizar título da página
function updatePageTitle(companyName) {
    if (companyName) {
        document.title = `${companyName} - BusinessHub`;
    }
}

// Salvar o perfil ao enviar o formulário
document.getElementById('company-profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const companyName = document.getElementById('company-name').value;
    const businessHours = document.getElementById('business-hours').value;
    const businessSector = document.getElementById('business-sector').value;
    const businessCategory = document.getElementById('business-category').value;
    const businessBio = document.getElementById('business-bio').value;
    const contactEmail = document.getElementById('contact-email').value;
    const contactPhone = document.getElementById('contact-phone').value;
    const contactAddress = document.getElementById('contact-address').value;

    const companyPhotoInput = document.getElementById('company-photo');
    let companyPhoto = null;

    if (companyPhotoInput.files && companyPhotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            companyPhoto = e.target.result;
            document.getElementById('companyPhotoPreview').src = companyPhoto;
            updateProfilePictures(companyPhoto);
            saveProfile();
        };
        reader.readAsDataURL(companyPhotoInput.files[0]);
    } else {
        saveProfile();
    }

    function saveProfile() {
        const companyProfile = {
            companyName,
            businessHours,
            businessSector,
            businessCategory,
            businessBio,
            contactEmail,
            contactPhone,
            contactAddress,
            companyPhoto
        };

        localStorage.setItem('companyProfile', JSON.stringify(companyProfile));
        document.getElementById('companyNameDisplay').innerText = companyName;
        document.getElementById('businessSectorDisplay').innerText = businessSector;
        document.getElementById('businessCategoryDisplay').innerText = businessCategory;
        updatePageTitle(companyName);
    }
});

// Excluir conta
document.getElementById('delete-account').addEventListener('click', function() {
    if (confirm("Tem certeza de que deseja excluir sua conta?")) {
        localStorage.removeItem('companyProfile');
        location.reload();
    }
});








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
