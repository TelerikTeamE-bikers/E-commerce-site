/* global io $ */

// Make connection

const socket = io.connect('http://localhost:3030');

const $message = $('#message');
const $handle = $('#handle');
const $btn = $('#send');
const $output = $('#output');
const $feedback = $('#feedback');

// Emit events
$btn.on('click', () => {
    // $btn.addClass('Test EVENTS');
    socket.emit('chat', {
        message: $message.val(),
        handle: $handle.val(),
    });
    $message.val('');
});
$message.on('keypress', () => {
    socket.emit('typing', {
        handle: $handle.val(),
    });
});


// Listen for events
socket.on('chat', (data) => {
    $feedback.html('');
    $output.html($output.html() + '<p><strong>' + data.handle + ':</strong>' +
        data.message + '</p>');
});

socket.on('typing', (data) => {
    $feedback.html('<p><em>' + data.handle + ' is typing a message ..</em></p>');
});