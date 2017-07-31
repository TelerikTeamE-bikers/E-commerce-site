/* global $ */

$(document).ready(function() {
    sessionStorage.removeItem('shoppingCart');
    // email input validation
    const emailInput = $('.email-validate');
    const emailErrorMessage = $('.error-email');
    emailInput.on('input', validateEmail);

    function validateEmail() {
        const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const isEmail = reg.test(emailInput.val());
        if (isEmail) {
            emailInput.removeClass('invalid').addClass('valid');
            emailErrorMessage.removeClass('error_show').addClass('error-email');
        } else {
            emailInput.removeClass('valid').addClass('invalid');
            emailErrorMessage.removeClass('error-email').addClass('error_show');
        }
    }

    // password input validation
    const passwInput = $('.password-validate');
    const passwErrorMessage = $('.error-password');
    passwInput.on('input', validatePassw);

    function validatePassw() {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
        const isPassw = reg.test(passwInput.val());
        if (isPassw) {
            passwInput.removeClass('invalid')
                .addClass('valid');
            passwErrorMessage.removeClass('error_show')
                .addClass('error-password');
        } else {
            passwInput.removeClass('valid')
                .addClass('invalid');
            passwErrorMessage.removeClass('error-password')
                .addClass('error_show');
        }
    }

    // Validating submited log-in form
    $('.loginbtn').click(function(event) {
        let errorFree;
        if (emailInput.hasClass('valid') && passwInput.hasClass('valid')) {
            errorFree = true;
        } else {
            errorFree = false;
        }
        if (!errorFree) {
            event.preventDefault();
        }
    });
}); // eslint-disable-line