module.exports = scenario;

var bunyan = require("bunyan");
var log = bunyan.createLogger({ name: "scenario" });

function scenario(log, cb) {
  function start() {
    process.nextTick(thing);
  }

  var value = 97;
  log.info({ value: value }, "scenario");

  function foo() {
    value *= 13;
    log.info({ value: value }, "foo");
    cb(value);
    log.info({ value: value }, "foo");
  }

  start();

  function racer() {
    value &= 255;
    log.info({ value: value }, "racer");
    setTimeout(foo, 0);
  }

  log.error('new add');
  value = 213;
  log.info({ value: value }, "scenario");

  function thing() {
    value += 131;
    log.info({ value: value }, "thing");
    process.nextTick(racer);
  }
}

scenario(log, (value) => {
  log.info({ value: value }, "cb");
  console.log(value);
});