import { game } from "./game.js";
import { resize } from "./resize.js";

class Main {
  constructor(ctx) {}
  draw(ctx) {
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  update(delta) {}
}

function init() {
  const ctx = game_canvas.getContext("2d");
  const main = new Main(ctx);
  const delta = {};

  let lastTime = performance.now();
  function animate(timeStamp) {
    delta.time = timeStamp - lastTime;
    lastTime = timeStamp;

    main.draw(ctx);
    game.draw(ctx);
    if (game.state === "playing") {
      main.update(delta);
      game.update(delta);
    }

    requestAnimationFrame(animate);
  }

  console.log(game_canvas);
  const handleResize = () => resize(game_wrapper, game_canvas);
  addEventListener("resize", handleResize);
  addEventListener("orientationchange", handleResize);
  handleResize();

  requestAnimationFrame(animate);
}
init();
