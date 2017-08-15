let lastTime = timestamp();
let stats;
let rafId;

if (!window.PRODUCTION) {
  stats = require('stats.js')(0);
  document.body.appendChild(stats.dom);
}

function timestamp() {
  return window.performance && window.performance.now ?
    window.performance.now() :
    Date.now();
};

function raf(fn) {
  return rafId = window.requestAnimationFrame(function () {
    stats && stats.begin();

    const now = timestamp();
    let dt = now - lastTime;

    if (dt > 999) {
      dt = 1 / 60;
    } else {
      dt /= 1000;
    }

    lastTime = now;

    fn(dt);

    stats && stats.end();
  });
};

function loop(fn) {
	if (!fn) return;
  return raf(function tick (dt) {
    fn(dt);
    raf(tick);
  });
}

export default loop;
