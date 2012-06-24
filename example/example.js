var util = require('util');

var Worker = require('../lib/worker').Worker;

var worker = new Worker('worker.js');

worker.postMessage({
  hello: "world"
});

worker.onmessage = function (msg) {
  util.puts(msg.hello);
};

worker.addListener('message', function (msg) {
  util.puts(msg.hello);
  worker.terminate();
});
