import tilemap from "./tilemap.js";

function resize() {
  game_canvas.width = tilemap.width * tilemap.tilewidth;
  game_canvas.height = tilemap.height * tilemap.tileheight;
  game_canvas.style.width = `${game_canvas.width * 4}px`;
  game_canvas.style.height = `${game_canvas.height * 4}px`;
}
resize();
addEventListener("resize", resize);

const tilesets = {
  Tiles: {
    width: 20,
    height: 9,
    image: tilemap_image,
  },
  Character: {
    width: 9,
    height: 3,
    image: tilemap_characters_image,
  },
};
tilesets["Tiles (layer A)"] = tilesets.Tiles;
tilesets["Tiles (layer B)"] = tilesets.Tiles;

function init() {
  /** @type {CanvasRenderingContext2D} */
  const ctx = game_canvas.getContext("2d");
  function animate() {
    ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
    tilemap.layers.forEach((layer) => {
      for (let i = 0; i < layer.data.length; i++) {
        const tileset = tilesets[layer.name];
        const tile = layer.data[i];
        const sx = (tile - 28) % tileset.width;
        const sy = Math.floor((tile - 28) / tileset.width);
        const x = i % layer.width;
        const y = Math.floor(i / layer.width);
        ctx.drawImage(
          tileset.image,
          sx * tilemap.tilewidth,
          sy * tilemap.tileheight,
          tilemap.tilewidth,
          tilemap.tileheight,
          x * tilemap.tilewidth,
          y * tilemap.tileheight,
          tilemap.tilewidth,
          tilemap.tileheight,
        );
      }
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
addEventListener("load", init);
