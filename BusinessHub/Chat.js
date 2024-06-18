// Função para abrir o chat com base no contato
function openChat(contactName) {
    const chatHeader = document.getElementById("chat-header");
    const chatMessages = document.getElementById("chat-messages");

    chatHeader.textContent = contactName;

    const storedMessages = JSON.parse(localStorage.getItem(contactName)) || [];
    chatMessages.innerHTML = ''; // Remove mensagens anteriores antes de carregar as novas do localStorage
    storedMessages.forEach((messageObj, index) => {
        const messageElement = createMessageElement(messageObj.message, index, contactName, messageObj.edited);
        chatMessages.appendChild(messageElement);
    });
}

// Função para criar elemento de mensagem
function createMessageElement(message, index, contactName, edited = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.dataset.index = index;
    messageElement.innerHTML = `
        <span class="message-text">${message}</span>
        ${edited ? '<span class="edited">(edited)</span>' : ''}
        <span class="message-actions">
            <i class="fa fa-pencil" onclick="openEditModal(this, '${contactName}')"></i>
            <i class="fa fa-trash" onclick="confirmDeleteMessage('${index}', '${contactName}')"></i>
        </span>
    `;
    return messageElement;
}

// Função para enviar uma mensagem
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const chatMessages = document.getElementById("chat-messages");
    const chatHeader = document.getElementById("chat-header");

    if (messageInput.value.trim() !== "") {
        const newMessage = createMessageElement(messageInput.value, chatMessages.children.length, chatHeader.textContent);
        chatMessages.appendChild(newMessage);

        saveMessage(chatHeader.textContent, messageInput.value);
        messageInput.value = "";
    }
}

// Função para salvar mensagem no localStorage
function saveMessage(contactName, message) {
    const storedMessages = JSON.parse(localStorage.getItem(contactName)) || [];
    storedMessages.push({ message: message, edited: false });
    localStorage.setItem(contactName, JSON.stringify(storedMessages));
}

// Função para abrir o modal de edição
function openEditModal(element, contactName) {
    const messageElement = element.closest(".chat-message");
    const modal = document.getElementById("editModal");
    const editMessageInput = document.getElementById("edit-message-input");

    modal.style.display = "block";
    editMessageInput.value = messageElement.querySelector(".message-text").textContent;
    editMessageInput.dataset.index = messageElement.dataset.index;
    editMessageInput.dataset.contact = contactName;
}

// Função para fechar o modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// Função para salvar mensagem editada
function saveEditedMessage() {
    const editMessageInput = document.getElementById("edit-message-input");
    const contactName = editMessageInput.dataset.contact;
    const index = editMessageInput.dataset.index;

    const storedMessages = JSON.parse(localStorage.getItem(contactName));
    storedMessages[index] = { message: editMessageInput.value, edited: true };
    localStorage.setItem(contactName, JSON.stringify(storedMessages));

    document.querySelector(`.chat-message[data-index='${index}'] .message-text`).textContent = editMessageInput.value;
    document.querySelector(`.chat-message[data-index='${index}'] .edited`)?.remove();
    const editedSpan = document.createElement("span");
    editedSpan.classList.add("edited");
    editedSpan.textContent = "(edited)";
    document.querySelector(`.chat-message[data-index='${index}']`).appendChild(editedSpan);
    closeModal();
}

// Função para confirmar exclusão de mensagem
function confirmDeleteMessage(index, contactName) {
    if (confirm("Are you sure you want to delete this message?")) {
        deleteMessage(index, contactName);
    }
}


// Função para deletar mensagem
function deleteMessage(index, contactName) {
    const storedMessages = JSON.parse(localStorage.getItem(contactName));
    storedMessages.splice(index, 1);
    localStorage.setItem(contactName, JSON.stringify(storedMessages));

    openChat(contactName);
    closeModal();
}

// Fechar modal ao clicar fora dele
window.onclick = function (event) {
    const modal = document.getElementById("editModal");
    if (event.target === modal) {
        closeModal();
    }
}




/*   a parte do chat termina aqui ☝☝☝☝ */













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


// Função para abrir o menu do cartão
function openCard() {
    const cardWrap = document.getElementById("cardwrap");
    cardWrap.classList.toggle("open-menu");
}


// função da foto

document.addEventListener('DOMContentLoaded', (event) => {
    const savedProfile = JSON.parse(localStorage.getItem('companyProfile')) || {};
    if (savedProfile.companyPhoto) {
        updateProfilePictures(savedProfile.companyPhoto);
    }
    loadPosts();
});

function updateProfilePictures(photoUrl) {
    const profilePictures = document.querySelectorAll('.profile-pic, .logo img');
    profilePictures.forEach(picture => {
        picture.src = photoUrl;
    });
}

function openCard() {
    document.getElementById('cardwrap').classList.toggle('open-menu');
}

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
