'use strict';

window.auth = (function () {
    let modal = window.modal;
    let utils = window.utils;
    let cart = window.cart;

    let self = {
        init: init,
        toggle: toggle,
        isAuthorized: isAuthorized
    };

    let elems = {};
    let loginName = '';

    function logoutHandler() {
        login('');
    }

    function submitHandler(event) {
        event.preventDefault();
        if (login(elems.loginText.value.trim())) {
            elems.loginText.style.borderColor = '';
            modal.toggle(elems.modalDialog)();
        } else {
            elems.loginText.style.borderColor = 'red';
        }
    }

    function login(username) {
        loginName = username;
        if (username) {
            elems.userNameLabel.textContent = username;
            elems.loginText.value = '';

            elems.logoutButton.style.display = 'flex';
            elems.loginButton.style.display = 'none';
            cart.visible(true);
        } else {
            elems.userNameLabel.textContent = '';
            elems.logoutButton.style.display = 'none';
            elems.loginButton.style.display = 'flex';
            cart.visible(false);
        }
        localStorage.setItem('chnu-store.username', username);

        return username;
    }

    function init(selectors) {
        elems = utils.applySelector(selectors);

        elems.userNameLabel.style.display = 'inline-block';
        elems.loginButton.addEventListener('click', toggle);
        elems.closeModalDialog.addEventListener('click', toggle);
        elems.logoutButton.addEventListener('click', logoutHandler);
        elems.authForm.addEventListener('submit', submitHandler);

        login(localStorage.getItem('chnu-store.username') || '');
    }

    function toggle() {
        modal.toggle(elems.modalDialog)();
    }

    function isAuthorized() {
        return !!loginName;
    }

    return self;
}());
