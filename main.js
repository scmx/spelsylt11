class Game {
  constructor(ctx) {}
  draw(ctx) {
    ctx.fillStyle = "#f00";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  update(delta) {}
}

function init(canvas) {
  const ctx = canvas.getContext("2d");
  const game = new Game(ctx);
  const delta = {};

  let lastTime = performance.now();
  function animate(timeStamp) {
    delta.time = timeStamp - lastTime;
    lastTime = timeStamp;

    game.draw(ctx);
    game.update(delta);

    requestAnimationFrame(animate);
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  addEventListener("resize", resize);
  addEventListener("orientationchange", resize);
  resize();
  requestAnimationFrame(animate);
}
init(game_canvas);

// Prevent pinch zoom, selecting text etc
const prevent = (e) => e.preventDefault();
addEventListener("touchstart", prevent, { passive: false });
addEventListener("touchmove", prevent, { passive: false });
addEventListener("gesturestart", prevent, { passive: false });
addEventListener("gesturechange", prevent, { passive: false });
addEventListener("contextmenu", prevent, { passive: false });
addEventListener("selectstart", prevent, { passive: false });
addEventListener("selectionchange", prevent, { passive: false });
