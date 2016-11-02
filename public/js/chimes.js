console.log('Starting up client side websocket');

var socket = io();
socket.on('play', function(data) {
    $('#nowplayingsong').text(data.song);
    $('#nowplaying').show();
    if (console) console.log('The server indicated "' + data.song + '" is now playing');
});
socket.on('stop', function(data) {
    $('#nowplaying').hide();
    if (console) console.log('The server indicated playback has stopped');
});
