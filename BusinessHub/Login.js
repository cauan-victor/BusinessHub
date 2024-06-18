document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const newUsernameInput = document.getElementById('newUsername');
    const newPasswordInput = document.getElementById('newPassword');
    const passwordHintInput = document.getElementById('passwordHint');
    const togglePassword = document.getElementById('togglePassword');
    const toggleNewPassword = document.getElementById('toggleNewPassword');

    // Check if user credentials are saved in localStorage
    if (localStorage.getItem('rememberMe') === 'true') {
        usernameInput.value = localStorage.getItem('username');
        passwordInput.value = localStorage.getItem('password');
        rememberMeCheckbox.checked = true;
    }

    // Function to handle login
    window.checkLogin = function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Get stored credentials
        const storedUsername = localStorage.getItem('registeredUsername');
        const storedPassword = localStorage.getItem('registeredPassword');

        if (username !== "" && password !== "") {
            if (username === storedUsername && password === storedPassword) {
                if (rememberMeCheckbox.checked) {
                    // Save credentials to localStorage
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    // Clear saved credentials
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    localStorage.setItem('rememberMe', 'false');
                }

                // Redirect to the BusinessHub.html page
                window.location.href = "BusinessHub.html";
                return false; // Prevent form submission
            } else {
                alert("Nome de usuário ou senha incorretos.");
                return false; // Prevent form submission
            }
        } else {
            alert("Por favor, forneça um nome de usuário e senha.");
            return false; // Prevent form submission
        }
    }

    // Function to handle registration
    window.registerUser = function () {
        const newUsername = newUsernameInput.value;
        const newPassword = newPasswordInput.value;
        const passwordHint = passwordHintInput.value;

        if (newUsername !== "" && newPassword !== "") {
            // Store user credentials
            localStorage.setItem('registeredUsername', newUsername);
            localStorage.setItem('registeredPassword', newPassword);
            localStorage.setItem('passwordHint', passwordHint);

            alert("Registro bem-sucedido! Agora você pode fazer login.");
            showLoginForm();
            return false; // Prevent form submission
        } else {
            alert("Por favor, forneça um nome de usuário e senha.");
            return false; // Prevent form submission
        }
    }

    // Function to handle forgot password
    window.forgotPassword = function () {
        const storedHint = localStorage.getItem('passwordHint');
        if (storedHint) {
            alert("Dica de senha: " + storedHint);
        } else {
            alert("Nenhuma dica de senha disponível.");
        }
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('bxs-lock-open');
    });

    toggleNewPassword.addEventListener('click', () => {
        const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        newPasswordInput.setAttribute('type', type);
        toggleNewPassword.classList.toggle('bxs-lock-open');
    });

    // Function to show register form
    window.showRegisterForm = function () {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    }

    // Function to show login form
    window.showLoginForm = function () {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    }
});
