window.onload = () => {
    let nameInput = $('#name');
    let usernameInput = $('#username');
    let agreeCheckbox = $('#agreement');
    let buttonSighUp = $('#sign-up');
    let popup = $('#popup');
    let emailInput = $('#email');
    let repeatPasswordInput = $('#repeat-password');
    let passwordInput = $('#password');
    let inputNames = $('#input-name');
    let passwordRegExp = new RegExp('^(?=.*\\d)(?=.*[!"#$%&\'()*+,-.\\/\\\\:;<=>?@^_`{|}~])(?=.*[A-Z]).{8,}$');

    let client = {}

    let clients = [];

    buttonSighUp.click(function () {
        let hasError = false;

        $('.main-input').css('border-color', '#C6C6C4');
        $('.error-message').hide();

        if (!nameInput.val().match(/^[а-яА-Яa-zA-Z\s]+$/)) {
            nameInput.css('border-color', 'red');
            hasError = true;
            nameInput.next().show();
        }

        if (!usernameInput.val().match(/^[а-яА-яa-zA-z\d_-]+$/)) {
            usernameInput.css('border-color', 'red');
            hasError = true;
            usernameInput.next().show();
        }

        if (!emailInput.val().match(/^[а-яА-яa-zA-z\d._-]+@[a-z]+\.[a-z]{2,6}$/)) {
            emailInput.css('border-color', 'red');
            hasError = true;
            emailInput.next().show();
        }

        if (!passwordInput.val().match(passwordRegExp)) {
            passwordInput.css('border-color', 'red');
            hasError = true;
            passwordInput.next().show();
        }

        if (repeatPasswordInput.val() !== passwordInput.val()) {
            repeatPasswordInput.css('border-color', 'red');
            hasError = true;
            repeatPasswordInput.next().show();
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
            console.log(client);
            let clientsData = localStorage.getItem('clients');
            if (clientsData) {
                clients = JSON.parse(clientsData);
            }

            clients.push(client);
            localStorage.setItem('clients', JSON.stringify(clients));

            console.log(localStorage.getItem('clients'));
            popup.css('display', 'flex');
        }
    });
    let popupButton = $('#popup-btn');
    let linkHasAccount = $('.has-account');
    function logInPage() {
        popup.css('display', 'none');
        let mainTitle = $('#main-title');
        mainTitle.text('Log in to the system');
        nameInput.parent().hide();
        emailInput.parent().hide();
        repeatPasswordInput.parent().hide();
        agreeCheckbox.parent().hide();
        buttonSighUp.text('Sign In');
        linkHasAccount.hide();
        usernameInput.value = null;
        passwordInput.value = null;
    }
    linkHasAccount.click(function () {
        logInPage();
    });
    popupButton.click(function () {
        logInPage();
    });
}