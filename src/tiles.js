class Tile {
  constructor({ x, y }, type) {
    this.pos = { x, y };
    this.type = type;
  }
}
export const tiles = {
  width: 26,
  height: 15,
  tilewidth: 18,
  tileheight: 18,
  layers: [createLayer("Tiles", 26, 15)],
};

function createLayer(name, width, height) {
  const data = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      data.push(new Tile({ x, y }, "EARTH"));
    }
  }
  return { name, width, height, data };
}
