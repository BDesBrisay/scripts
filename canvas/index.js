function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    let dist = 1;
    while (dist < 10) {
      setTimeout(() => {
        ctx.fillStyle = `rgba(0, 0, 200, ${1 / dist++})`;
        ctx.fillRect(30 * dist, 30 * dist, 50, 50);
      }, 500);
    }
  }
};