/* globals $ */
$('#loadingDiv')
    .hide() // Hide it initially
    .ajaxStart(function() {
        $(this).show();
    })
    .ajaxStop(function() {
        $(this).hide();
    }); // eslint-disable-line