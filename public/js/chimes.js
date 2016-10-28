console.log('Starting up client side websocket');

var socket = io();
socket.on('play', function(data) {
    console.log('The server indicated "' + data.song + '" is now playing');
});
socket.on('stop', function(data) {
    console.log('The server indicated playback has stopped');
});
