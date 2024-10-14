export const tilesets = {
  Tiles: {
    width: 20,
    height: 9,
    tilewidth: 18,
    tileheight: 18,
    tileoffset: -28,
    offset: 0,
    image: tileset_image,
  },
  Characters: {
    width: 9,
    height: 3,
    tilewidth: 24,
    tileheight: 24,
    tileoffset: -1,
    offset: -3,
    image: spritesheet_characters_image,
  },
};
tilesets["Tiles (layer A)"] = tilesets.Tiles;
tilesets["Tiles (layer B)"] = tilesets.Tiles;
