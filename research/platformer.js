import tilemap from "./tilemap.js";
import { tilesets } from "../src/tilesets.js";

function resize() {
  game_canvas.width = tilemap.width * tilemap.tilewidth;
  game_canvas.height = tilemap.height * tilemap.tileheight;
  game_canvas.style.width = `${game_canvas.width * 4}px`;
  game_canvas.style.height = `${game_canvas.height * 4}px`;
}
resize();
addEventListener("resize", resize);

function init() {
  /** @type {CanvasRenderingContext2D} */
  const ctx = game_canvas.getContext("2d");
  function animate() {
    ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
    tilemap.layers.forEach((layer) => {
      for (let i = 0; i < layer.data.length; i++) {
        const tileset = tilesets[layer.name];
        const tile = layer.data[i];
        const sx = (tile + tileset.tileoffset) % tileset.width;
        const sy = Math.floor((tile + tileset.tileoffset) / tileset.width);
        const x = i % layer.width;
        const y = Math.floor(i / layer.width);
        ctx.drawImage(
          tileset.image,
          sx * tileset.tilewidth,
          sy * tileset.tileheight,
          tileset.tilewidth,
          tileset.tileheight,
          x * tilemap.tilewidth + tileset.offset,
          y * tilemap.tileheight + tileset.offset,
          tileset.tilewidth,
          tileset.tileheight,
        );
      }
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
addEventListener("load", init);
