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
      $('#nowplayingsong').text(data.song[0]);
      $('#nowplayingtime').text(data.timetoplay[0]);
      $('#nowplaying').show();
      $('#nextsong1').text(data.song[1]);
      $('#nexttime1').text(data.timetoplay[1]);
      $('#nextsong2').text(data.song[2]);
      $('#nexttime2').text(data.timetoplay[2]);
      $('#nextsong3').text(data.song[3]);
      $('#nexttime3').text(data.timetoplay[3]);
      $('#nextsong4').text(data.song[4]);
      $('#nexttime4').text(data.timetoplay[4]);
      $('#nextsong5').text(data.song[5]);
      $('#nexttime5').text(data.timetoplay[5]);
      if (console) console.log('The server indicated "' + data.song[0] + '" is now playing');
  });
  socket.on('stop', function(data) {
      $('#nowplaying').hide();
      var previoussong = [];
      var previoustime = [];
      var counter;
      var spanname;
      previoussong[0] = $('#nowplayingsong').text();
      previoustime[0] = $('#nowplayingtime').text();
      // if (console) console.log(previoussong[0] + ' ' + previoustime[0]);
      for (i = 1; i < 5; i++) {
        previoussong[i] = $('#previoussong' + i).text();
        previoustime[i] = $('#previoustime'+ i).text();
        // if (console) console.log(previoussong[i] + ' ' + previoustime[i]);
      }
      for (i = 0; i < 5; i++) {
        counter = i + 1;
        $('#previoussong' + counter).text(previoussong[i]);
        $('#previoustime' + counter).text(previoustime[i]);
        // if (console) console.log(previoussong[i] + ' ' + previoustime[i]);
      }
      // if (console) console.log('The server indicated playback has stopped');
  });
});
