import { tilesets } from "./tilesets.js";

const gravity = 0.004;
const tileset = tilesets.Characters;

export class Player {
  constructor({ x, y }, sprite) {
    this.pos = { x, y };
    this.vel = { x: 0, y: 0 };
    this.sprite = sprite;
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    this.sprite.draw(
      ctx,
      this.pos.x * tileset.tilewidth,
      this.pos.y * tileset.tilewidth,
      24,
      24,
    );
  }

  update(delta) {
    if (delta.input.x) {
      this.pos.x += delta.input.x * delta.time * 0.004;
    }
    this.pos.y += gravity * delta.time;
    if (this.pos.y > 11) {
      this.pos.y = 0;
    }
  }
}
