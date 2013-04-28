(function() {

/* live */
//ws = new WebSocket('ws://192.168.1.223:8080/');

/* testing */
var testws = function() {
  var i = 0;
  var ev = {};
  setInterval(function() {
    ev.data = JSON.stringify(benMadlyWavingHisHands[i]);
    handleMsg(ev);
    i++;
  }, 1);
};

var c = 0;

var el = {};
el.x = document.getElementById('x');
el.y = document.getElementById('y');
el.z = document.getElementById('z');

var handleMsg = function (ev) {
  document.getElementById('status').innerHTML = 'got something';
  var d = JSON.parse(ev.data);
  if (d.joint != 'SKEL_RIGHT_ELBOW') return;
  el.x.innerHTML = d.x;
  el.y.innerHTML = d.y;
  el.z.innerHTML = d.z;
  d.timestamp = (new Date()).getTime();
  document.getElementById('log').value += "\n" + JSON.stringify(d) + ',';
  c += 1;
  if (c > 10000) {
    ws.close();
    document.getElementById('status').innerHTML = 'done';
  }
};

window.onload = function() {


//ws.onmessage = handleMsg;
testws();

// paper
// Get a reference to the canvas object
var canvas = document.getElementById('myCanvas');
// Create an empty project and a view for the canvas:
paper.setup(canvas);
// Create a Paper.js Path to draw a line into it:
var path = new paper.Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new paper.Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note that the plus operator on Point objects does not work
// in JavaScript. Instead, we need to call the add() function:
path.lineTo(start.add([ 200, -50 ]));
// Draw the view now:
paper.view.draw();

}


})();
