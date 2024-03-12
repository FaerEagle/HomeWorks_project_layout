window.onload = () => {
    let nameInput = document.getElementById('name');
    nameInput.onkeydown = (event) => {
        let number = parseInt(event.key);
        if (!isNaN(number)) {
            return false;
        }
    }
    let usernameInput = document.getElementById('username');
    usernameInput.onkeydown = (event) => {
        if (event.key === '.' || event.key === ',') {
            return false;
        }
    }
    let agreeCheckbox = document.getElementById('agreement');
    agreeCheckbox.onchange = (event) => {
        console.log();
        if (event.target.checked) {
            console.log("Согласен");
        } else {
            console.log("Не согласен");
        }
    }
    let buttonSighUp = document.getElementById('sign-up');
    let popup = document.getElementById('popup');
    let emailInput = document.getElementById('email');
    let repeatPasswordInput = document.getElementById('repeat-password');
    let passwordInput = document.getElementById('password');
    let inputNames = document.getElementsByClassName('input-name');
    buttonSighUp.onclick = (event) => {
        event.preventDefault();
        if (!!!nameInput.value) {
            alert('Заполните поле ' + inputNames[0].innerText);
        } else {
            if (!!!usernameInput.value) {
                alert('Заполните поле ' + inputNames[1].innerText);
            } else {
                if (!!!emailInput.value) {
                    alert('Заполните поле ' + inputNames[2].innerText);
                } else {
                    if (!!!passwordInput.value) {
                        alert('Заполните поле ' + inputNames[3].innerText);
                    } else if (passwordInput.value.length < 8) {
                        alert('Пароль должен содержать не менее 8 символов');
                    } else {
                        if (!!!repeatPasswordInput.value) {
                            alert('Заполните поле ' + inputNames[4].innerText);
                        } else {
                            if (passwordInput.value !== repeatPasswordInput.value) {
                                alert('Пароли должны совпадать');
                            } else {
                                if (!agreeCheckbox.checked) {
                                    alert('Нужно дать согласие с условиями использования и политикой конфиденциальности');
                                } else {
                                    popup.style.display = 'flex';
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    let popupButton = document.getElementById('popup-btn');
    let linkHasAccount = document.getElementsByClassName('has-account')[0];
    function logInPage() {
        popup.style.display = 'none';
        let mainTitle = document.getElementById('main-title');
        mainTitle.innerText = 'Log in to the system';
        nameInput.parentElement.remove();
        emailInput.parentElement.remove();
        repeatPasswordInput.parentElement.remove();
        agreeCheckbox.parentElement.remove();
        buttonSighUp.innerText = 'Sign In';
        linkHasAccount.remove();
        usernameInput.value = null;
        passwordInput.value = null;
        buttonSighUp.onclick = (event) => {
            event.preventDefault();
            if (!!!usernameInput.value) {
                alert('Заполните поле ' + inputNames[0].innerText);
            } else {
                if (!!!passwordInput.value) {
                    alert('Заполните поле ' + inputNames[1].innerText);
                } else {
                    alert('Добро пожаловать, ' + usernameInput.value + '!');
                }
            }
        }
    }
    linkHasAccount.onclick = (event) => {
        event.preventDefault();
        logInPage();
    }
    popupButton.onclick = () => {
        logInPage();
    }
}