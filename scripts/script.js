window.onload = () => {
    let nameInput = $('#name');
    let usernameInput = $('#username');
    let agreeCheckbox = $('#agreement');
    let buttonSignUp = $('#sign-up');
    let popup = $('#popup');
    let emailInput = $('#email');
    let repeatPasswordInput = $('#repeat-password');
    let passwordInput = $('#password');
    let inputNames = $('#input-name');
    let popupButton = $('#popup-btn');
    let linkHasAccount = $('.has-account');
    let passwordRegExp = new RegExp('^(?=.*\\d)(?=.*[!"#$%&\'()*+,-.\\/\\\\:;<=>?@^_`{|}~])(?=.*[A-Z]).{8,}$');
    let isLogInPage = false;
    let nameErrorMessage = $('#name-error-message');
    let passwordErrorMessage = $('#password-error-message');
    let form = $('.main-form form')[0];
    let mainTitle = $('#main-title');

    let client = {}

    let clients = [];

    let clientsData;

    let isProfilePage = false;

    function reloadInputs() {
        $('.main-input').css('border-color', '#C6C6C4');
        $('.error-message').hide();
    }
    function logInPage() {
        clientsData = localStorage.getItem('clients');
        
        popup.css('display', 'none');
        mainTitle.text('Log in to the system');
        nameInput.parent().hide();
        emailInput.parent().hide();
        repeatPasswordInput.parent().hide();
        agreeCheckbox.parent().hide();
        buttonSignUp.text('Sign In');
        linkHasAccount.text('Registration');
        $('#username-error-message').text('Такой пользователь не зарегистрирован');
        $('#password-error-message').text('Неверный пароль');
        usernameInput.value = null;
        passwordInput.value = null;
        isLogInPage = true;
        reloadInputs();
        form.reset();
    }

    function signUp() {
        let hasError = false;

        reloadInputs();

        if (!nameInput.val()) {
            nameInput.css('border-color', 'red');
            hasError = true;
            nameInput.next().show();
        } else if (!nameInput.val().match(/^[а-яА-Яa-zA-Z\s]+$/)) {
            nameInput.css('border-color', 'red');
            hasError = true;
            nameInput.next().next().show();
        }

        if (!usernameInput.val()) {
            usernameInput.css('border-color', 'red');
            hasError = true;
            usernameInput.next().show();
        } else if (!usernameInput.val().match(/^[а-яА-яa-zA-z\d_-]+$/)) {
            usernameInput.css('border-color', 'red');
            hasError = true;
            usernameInput.next().next().show();
        }

        if (!emailInput.val()) {
            emailInput.css('border-color', 'red');
            hasError = true;
            emailInput.next().show();
        } else if (!emailInput.val().match(/^[а-яА-яa-zA-z\d._-]+@[a-z]+\.[a-z]{2,6}$/)) {
            emailInput.css('border-color', 'red');
            hasError = true;
            emailInput.next().next().show();
        }

        if (!passwordInput.val()) {
            passwordInput.css('border-color', 'red');
            hasError = true;
            passwordInput.next().show();
        } else if (!passwordInput.val().match(passwordRegExp)) {
            passwordInput.css('border-color', 'red');
            hasError = true;
            passwordInput.next().next().show();
        }

        if (!repeatPasswordInput.val()) {
            repeatPasswordInput.css('border-color', 'red');
            hasError = true;
            repeatPasswordInput.next().show();
        } else if (repeatPasswordInput.val() !== passwordInput.val()) {
            repeatPasswordInput.css('border-color', 'red');
            hasError = true;
            repeatPasswordInput.next().next().show();
        }

        if (!agreeCheckbox.is(':checked')) {
            hasError = true;
            agreeCheckbox.next().show();
        }

        if (!hasError) {
            client.name = nameInput.val();
            client.username = usernameInput.val();
            client.email = emailInput.val();
            client.password = passwordInput.val();

            clientsData = localStorage.getItem('clients');

            if (clientsData) {
                clients = JSON.parse(clientsData);
            }

            clients.push(client);
            localStorage.setItem('clients', JSON.stringify(clients));

            popup.css('display', 'flex');
            form.reset();
        }
    }

    function signIn() {
        let isRegistered = false;
        let userIndex;

        reloadInputs();

        clients = JSON.parse(clientsData);

        if (!usernameInput.val()) {
            usernameInput.css('border-color', 'red');
            usernameInput.next().show();
        } else {
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].username === usernameInput.val()) {
                    isRegistered = true;
                    userIndex = i;
                    reloadInputs();
                    break;
                } else {
                    usernameInput.css('border-color', 'red');
                    usernameInput.next().next().show();
                }
            }
            if (!passwordInput.val() && isRegistered) {
                passwordInput.css('border-color', 'red');
                passwordInput.next().show();
            } else if (isRegistered && passwordInput.val() === clients[userIndex].password) {
                isProfilePage = true;
                console.log('Входим');
                mainTitle.text('Welcome, ' + clients[userIndex].name + '!');
                buttonSignUp.text('Exit');
                linkHasAccount.hide();
                usernameInput.parent().hide();
                passwordInput.parent().hide();
            } else if (isRegistered) {
                passwordInput.css('border-color', 'red');
                passwordInput.next().next().show();
            }
        }
    }

    buttonSignUp.click(function () {
        if (isProfilePage) {
            location.reload();
            isProfilePage = false;
        } else if (isLogInPage) {
            signIn();
        } else {
            signUp();
        }
    });

    linkHasAccount.click(function () {
        if (!isLogInPage) {
            logInPage();
        } else {
            location.reload();
            isLogInPage = false;
        }
    });
    popupButton.click(function () {
        logInPage();
    });
}