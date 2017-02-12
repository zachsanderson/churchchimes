/** 
 * Client side JS for ChimePlayer project
 */
// Action button hide delay in ms
const HIDE_DELAY = 5000;

// Local variables
var socket;
var buttonResetId;

// Defer setup until page is ready:
$(function() {
  // Add Action Handlers
  $('#shutdown-btn').on('click', function(ev) {
    socket.emit('shutdown');
  });
  $('#restart-btn').on('click', function(ev) {
    socket.emit('restart');
  });

  // Show action buttons on a click
  $(document).on('click', function(ev) {
    // Because of the fixed positioning, we have to actually slide "down" to appear
    // up from the bottom like we wanted:
    $('#action-btns').slideDown();

    // Set (or reset) a timeout for hiding the buttons if no more events occur
    clearTimeout(buttonResetId);
    buttonResetId = setTimeout(function() { $('#action-btns').slideUp(); }, HIDE_DELAY);
  });

  // Handler Websocket setup
  socket = io();
  if (console) console.log('Starting up client side websocket');
  socket.on('play', function(data) {
      $('#nowplayingsong').text(data.song);
      $('#nowplayingtime').text(data.timetoplay);
      $('#nowplaying').show();
      if (console) console.log('The server indicated "' + data.song + '" is now playing');
  });
  socket.on('stop', function(data) {
      $('#nowplaying').hide();
      if (console) console.log('The server indicated playback has stopped');
  });
});
