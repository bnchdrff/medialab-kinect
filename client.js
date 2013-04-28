(function() {

//var ws = new WebSocket('ws://192.168.1.158:8080/');
//ws.onmessage = handleMsg;
ws = function() {
  var i = 0;
  var ev = {};
  setInterval(function() {
    ev.data = JSON.stringify(testblob[i]);
    handleMsg(ev);
    i++;
  }, 100);
};

var c = 0;

var el = {};
el.x = document.getElementById('x');
el.y = document.getElementById('y');
el.z = document.getElementById('z');

var handleMsg = function (ev) {
  document.getElementById('status').innerHTML = 'got something';
  var d = JSON.parse(ev.data);
  el.x.innerHTML = d.x;
  el.y.innerHTML = d.y;
  el.z.innerHTML = d.z;
  document.getElementById('log').value += "\n" + ev.data;
  c += 1;
  if (c > 1000) {
    ws.close();
    document.getElementById('status').innerHTML = 'done';
  }
};


})();
