$(document).ready(function() {

    const emailInput = $('#email');
    emailInput.on('input', check);


    function check() {
        const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const isEmail = reg.test(emailInput.val());
        if (isEmail) {
            emailInput.removeClass('invalid').addClass('valid');
        } else {
            emailInput.removeClass('valid').addClass('invalid');
        }
    }
});