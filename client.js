(function() {

/* live */
ws = new WebSocket('ws://192.168.1.223:8080/');

///* testing */
//var testws = function() {
//  var i = 0;
//  var ev = {};
//  setInterval(function() {
//    ev.data = JSON.stringify(benMadlyWavingHisHands[i]);
//    handleMsg(ev);
//    i++;
//  }, 1);
//};

var c = 0;

// current data
var LEFTELBOW = {};
var RIGHTELBOW = {};

var handleMsg = function (ev) {
  var d = JSON.parse(ev.data);
  if (d.joint == 'SKEL_LEFT_ELBOW') {
    LEFTELBOW = d;
  }
  else if (d.joint == 'SKEL_RIGHT_ELBOW') {
    RIGHTELBOW = d;
  }
};

window.onload = function() {

ws.onmessage = handleMsg;

// paper
var canvas = document.getElementById('myCanvas');
paper.setup(canvas);

var thingie1 = new paper.Path.Circle(new paper.Point(20,20), 20);
thingie1.fillColor = 'red';
var thingie2 = new paper.Path.Circle(new paper.Point(20,20), 20);
thingie2.fillColor = 'green';

paper.view.onFrame = function(event) {
  thingie1.position = new paper.Point(LEFTELBOW.x, LEFTELBOW.y);
  thingie2.position = new paper.Point(RIGHTELBOW.x, RIGHTELBOW.y);
}


}

})();
