 (function Dinooo() {

  var canvas = document.querySelector('.runner-canvas'),
      ctx = canvas.getContext('2d'),
      speed = 0,
      maxSpeed = 200,
      colliders = {
        low: {y: 90, height: 35, width: 30},
        high: {y: 75, height: 10, width: 30}
      },
      lock = false;

  function control() {
    var high = colliders.high,
        low = colliders.low;

    //Low
    if(detectCollision(100, low.y, low.width+speed, low.height)) {
      release('ArrowDown', 40);
      key(' ', 32);
      lock = true;
    } else {
      lock = false;
    }

    //High
    if(detectCollision(100, high.y, high.width, high.height) && !lock) {
      release(' ', 32);
      key('ArrowDown', 40);
    }
  }

  function start() {
    document.body.focus();
    key(' ', 32);
  }

  function increaseSpeed() {
    if (speed < maxSpeed) speed++;
  }

  function detectCollision(x,y,w,h) {
    return ctx.getImageData(x,y,w,h).data.indexOf(83) !== -1;
  }

  function key(key, which) {
    document.dispatchEvent(new KeyboardEvent('keydown', {key: key, which: which, keyCode: which, code: key}));
  }

  function release(key, which) {
    document.dispatchEvent(new KeyboardEvent('keyup', {key: key, which: which, keyCode: which, code: key}));
  }

  setInterval(control.bind(this),10);
  setInterval(increaseSpeed.bind(this), 4000);
  setTimeout(start, 500);
})()