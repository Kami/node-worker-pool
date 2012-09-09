
var util = require('util');

var port = parseInt(process.argv[2], 10);
var filename = process.argv[3];

var worker = require("./tcpworker").startWorker(port);

var processes = [];

worker.onmessage = function (filename) {
  port = port + 1;
  var curPort = port;
  util.error("Starting child "+curPort);
  var child = process.createChildProcess("node", [filename, curPort]);
  
  child.addListener("error", function (data) {
    util.error(data);
  });
  
  var init = false;
  child.addListener("output", function (data) {
    if(!init) {
      init = true;
      worker.postMessage(curPort);
    }
    util.puts(data);
  });
  
  child.addListener("exit", function (data) {
    child.dead = true;
  });
  
  processes.push(child);
}

process.addListener("exit", function () {
  processes.forEach(function (child) {
    if(child && !child.dead) {
      child.kill();
    }
  })
})