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
//testws();

// paper
var canvas = document.getElementById('myCanvas');
paper.setup(canvas);

var thingie1 = new paper.Path.Circle(new paper.Point(20,20), 20);
thingie1.fillColor = 'red';
var thingie2 = new paper.Path.Circle(new paper.Point(20,20), 20);
thingie2.fillColor = 'green';

var pos = 0,
    len = benMadlyWavingHisHands.length;
paper.view.onFrame = function(event) {
  pos += 1;
  if (pos < len) {
    if (benMadlyWavingHisHands[pos].joint == 'SKEL_RIGHT_ELBOW') {
      var x = Math.abs(benMadlyWavingHisHands[pos].x),
          y = Math.abs(benMadlyWavingHisHands[pos].y);
      thingie1.position = new paper.Point(x,y);
    }
    else if (benMadlyWavingHisHands[pos].joint == 'SKEL_LEFT_ELBOW') {
      var x = Math.abs(benMadlyWavingHisHands[pos].x),
          y = Math.abs(benMadlyWavingHisHands[pos].y);
      thingie2.position = new paper.Point(x,y);
    }
  }
}


}


})();
