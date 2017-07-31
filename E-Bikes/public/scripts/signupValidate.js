/* globals $ */
$(document).ready(function() {
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

    // password input#1 validation
    const passwInput1 = $('.password-validate').first();
    const passwErrorMessage1 = $('.error-password').first();
    passwInput1.on('input', validatePassw1);

    function validatePassw1() {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
        const isPassw = reg.test(passwInput1.val());
        if (isPassw) {
            passwInput1.removeClass('invalid')
                .addClass('valid');
            passwErrorMessage1.removeClass('error_show')
                .addClass('error-password');
            diffpasswError.removeClass('error_show')
                .addClass('error-difpass');
        } else {
            passwInput1.removeClass('valid')
                .addClass('invalid');
            passwErrorMessage1.removeClass('error-password')
                .addClass('error_show');
            diffpasswError.removeClass('error_show')
                .addClass('error-difpass');
        }
    }

    // password input#2 validation
    const passwInput2 = $('.password-validate').last();
    const passwErrorMessage2 = $('.error-password').last();
    const diffpasswError = $('.error-difpass');
    passwInput2.on('input', validatePassw2);

    function validatePassw2() {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
        const isPassw = reg.test(passwInput2.val());
        if (isPassw) {
            passwInput2.removeClass('invalid')
                .addClass('valid');
            passwErrorMessage2.removeClass('error_show')
                .addClass('error-password');
            diffpasswError.removeClass('error_show')
                .addClass('error-difpass');
        } else {
            passwInput2.removeClass('valid')
                .addClass('invalid');
            passwErrorMessage2.removeClass('error-password')
                .addClass('error_show');
            diffpasswError.removeClass('error_show')
                .addClass('error-difpass');
        }
    }

    // Validating submited log-in form 
    $('.signupbtn').click(function(event) {
        let errorFree;
        if (emailInput.hasClass('valid') && passwInput1.hasClass('valid') &&
            passwInput2.hasClass('valid')
        ) {
            if (passwInput1.val() === passwInput2.val()) {
                errorFree = true;
            } else if (passwInput1.val() !== passwInput2.val()) {
                errorFree = false;
                diffpasswError.removeClass('error-difpass')
                    .addClass('error_show');
                passwInput1.removeClass('valid')
                    .addClass('invalid');
                passwInput2.removeClass('valid')
                    .addClass('invalid');
            }
        } else {
            errorFree = false;
        }

        if (!errorFree) {
            event.preventDefault();
        }
    });
}); // eslint-disable-line