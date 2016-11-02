/** 
 * Client side JS for ChimePlayer project
 */
var socket;
// Defer setup until page is ready:
$(function() {
  // Add Action Handlers
  $('#shutdown-btn').on('click', function(ev) {
    socket.emit('shutdown');
  });

  // Handler Websocket setup
  socket = io();
  if (console) console.log('Starting up client side websocket');
  socket.on('play', function(data) {
      $('#nowplayingsong').text(data.song);
      $('#nowplaying').show();
      if (console) console.log('The server indicated "' + data.song + '" is now playing');
  });
  socket.on('stop', function(data) {
      $('#nowplaying').hide();
      if (console) console.log('The server indicated playback has stopped');
  });
});
