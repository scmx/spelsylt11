import { tiles } from "./tiles.js";
import { sendGameEvent } from "./events.js";
import { Player } from "./player.js";
import { tilesets } from "./tilesets.js";
import { Worm } from "./worm.js";
import { Sprite } from "./sprite.js";
import { checkCollision } from "./collision.js";

export const gameStates = {
  main_menu: "main_menu",
  playing: "playing",
  pause_menu: "pause_menu",
  game_over: "game_over",
};

const earthMaskIndexes = [
  [/^.1.111110$/, 4], // corner bottom right
  [/^.1.111011$/, 5], // corner bottom left
  [/^110111.1.$/, 24], // corner top right
  [/^011111.1.$/, 25], // corner top left
  [/^.0.010.0.$/, 40], // all sides
  [/^.0.011.0.$/, 41], // top left bottom
  [/^.0.111.0.$/, 42], // top bottom
  [/^.0.110.0.$/, 43], // top right bottom
  [/^.0.010.1.$/, 60], // top left right
  [/^.0.011.1.$/, 61], // top left
  [/^.0.110.1.$/, 63], // top right
  [/^.1.011.0.$/, 141], // bottom left
  [/^.1.110.0.$/, 143], // bottom right
  [/^.0.111.1.$/, 62], // top
  [/^.1.011.1.$/, 121], // left
  [/^.1.110.1.$/, 123], // right
  [/^.1.111.0.$/, 142], // bottom
  [/^.1.111.1.$/, 122], // mid 104,
];

const neighbors = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

class Game {
  static GREEN = new Sprite(spritesheet_characters_image, {
    size: 24,
    startX: 2,
    startY: 0,
    countX: 2,
    updater() {
      this.offsetX = (this.offsetX + 1) % this.countX;
    },
  });

  state = gameStates.main_menu;
  player = new Player({ x: 15, y: 1 }, Game.GREEN);
  worms = [
    new Worm([
      { x: 20, y: 10 },
      { x: 21, y: 10 },
    ]),
  ];
  wormMoveTimer = 0;
  wormMoveInterval = 250;

  start() {
    this.state = gameStates.playing;
    sendGameEvent("state", this.state);
  }

  pause() {
    this.state = gameStates.pause_menu;
    sendGameEvent("state", this.state);
  }

  resume() {
    this.state = gameStates.playing;
    sendGameEvent("state", this.state);
  }

  draw(ctx) {
    this.drawTiles(ctx);
    this.player.draw(ctx);
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  drawTiles(ctx) {
    const scale = ctx.canvas.width / tiles.width / tiles.tilewidth;
    tiles.layers.forEach((layer) => {
      for (let i = 0; i < layer.data.length; i++) {
        const { x, y } = layer.data[i].pos;
        const mask = neighbors
          .map(([dx, dy]) => layer.width * (y + dy) + x + dx)
          .map((j) => (layer.data[j] && layer.data[j].type === "EARTH" ? 1 : 0))
          .join("");
        const tileset = tilesets[layer.name];
        const tile = layer.data[i];
        if (tile.type === "EMPTY") continue;
        let indexes;
        for (const [regex, ...rest] of earthMaskIndexes) {
          if (regex.test(mask)) {
            indexes = rest;
            break;
          }
        }
        if (!indexes) {
          continue;
        }
        const si = indexes[Math.floor(Math.random() * indexes.length)];
        const sx = si % tileset.width;
        const sy = Math.floor(si / tileset.width);
        ctx.drawImage(
          tileset.image,
          sx * tileset.tilewidth,
          sy * tileset.tileheight,
          tileset.tilewidth,
          tileset.tileheight,
          Math.floor((scale * x * tiles.tilewidth) / 18) * 18,
          Math.floor((scale * y * tiles.tileheight) / 18) * 18,
          Math.floor((scale * tileset.tilewidth) / 18) * 18,
          Math.floor((scale * tileset.tileheight) / 18) * 18,
        );
      }
    });
  }

  drawWorms(ctx) {
    for (const worm of this.worms) worm.draw(ctx);
  }

  update(delta) {
    if (this.wormMoveTimer > this.wormMoveInterval) {
      delta.moveWorms = true;
      this.wormMoveTimer = 0;
    } else {
      delete delta.moveWorms;
      this.wormMoveTimer += delta.time;
    }
    this.player.update(delta);
    for (const worm of this.worms) {
      worm.update(delta);
      if (checkCollision(this.player, worm)) {
        if (this.state !== gameStates.game_over) {
          this.state = gameStates.game_over;
          sendGameEvent("state", this.state);
        }
      }
    }
    for (let i = 0; i < tiles.layers[0].data.length; i++) {
      const tile = tiles.layers[0].data[i];
      if (checkCollision(this.player, tile)) {
        console.log("collision", tile.pos);
      }
    }
  }
}

export const game = new Game();
