import { game } from "./game.js";
import { resize } from "./resize.js";

const canvases = {
  tiles: { size: 26, tileSize: 18, canvas: tiles_canvas },
  worms: { size: 26, tileSize: 200, canvas: worms_canvas },
};

function init() {
  const ctx = Object.fromEntries(
    Object.entries(canvases).map(([name, { canvas }]) => [
      name,
      canvas.getContext("2d"),
    ]),
  );
  const delta = { input: {} };

  let lastTime = performance.now();
  function animate(timeStamp) {
    delta.time = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.tiles.fillStyle = "#282828";
    ctx.tiles.fillRect(0, 0, ctx.tiles.canvas.width, ctx.tiles.canvas.height);

    game.draw(ctx.tiles);
    game.drawWorms(ctx.worms);

    if (game.state === "playing") {
      game.update(delta);
    }

    requestAnimationFrame(animate);
  }

  addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        delta.input.x = -1;
        break;
      case "ArrowRight":
        delta.input.x = 1;
        break;
      case "Space":
        delta.input.y = -1;
        break;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        delete delta.input.x;
        break;
      case "ArrowRight":
        delete delta.input.x;
        break;
      case "Space":
        delete delta.input.jump;
        break;
    }
  });

  const handleResize = () => resize(game_wrapper, canvases);
  addEventListener("resize", handleResize);
  addEventListener("orientationchange", handleResize);
  handleResize();

  requestAnimationFrame(animate);
}
init();
