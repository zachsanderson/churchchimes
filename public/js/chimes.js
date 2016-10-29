console.log('Starting up client side websocket');

var socket = io();
socket.on('play', function(data) {
    $('#nowplayingsong').text(data.song);
    $('#nowplaying').show();
    console.log('The server indicated "' + data.song + '" is now playing');
});
socket.on('stop', function(data) {
    $('#nowplaying').hide();
    console.log('The server indicated playback has stopped');
});
