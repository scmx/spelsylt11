import { playSound } from "./sound.js";
import { tiles } from "./tiles.js";

const dirs = { "-1,0": "L", "0,-1": "U", "0,1": "D", "1,0": "R" };

const frames = `
#R1 LR1 L#1 DR1 LD1  #   #   #
R#1 RL1 #L1 RU1 UL1  #   #  #D2
D#1 #D1 RD1 DL1 #R4 LR2 L#2  #
DU1 UD1 UR1 LU1 R#2 RL2 #L4 #U2
#U1 U#1 #R2  #  #L2 #R3  #  #L3
`
  .trim()
  .split(/\s+/)
  .filter(Boolean);

export class Worm {
  image = spritesheet_snake_corgi_image;

  constructor(parts) {
    this.parts = parts;
  }
  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "green";
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const [prev, part, next] =
        i === 0
          ? [undefined, this.parts[i], this.parts[i + 1]]
          : [this.parts[i - 1], this.parts[i], this.parts[i + 1]];

      let mask = "";
      mask +=
        (prev && dirs[[prev.x - part.x, prev.y - part.y].join(",")]) || "#";
      mask +=
        (next && dirs[[next.x - part.x, next.y - part.y].join(",")]) || "#";
      mask += 1;
      const frameIndex = frames.indexOf(mask);
      const frameX = frameIndex % 8;
      const frameY = Math.floor(frameIndex / 8);

      ctx.drawImage(
        this.image,
        frameX * 200,
        frameY * 200,
        200,
        200,
        part.x * 200,
        part.y * 200,
        200,
        200,
      );
    }
  }
  update(delta) {
    if (this.free) return;
    if (delta.moveWorms) this.move(delta);
  }
  move() {
    const part = this.parts[0];
    const dir = {
      x: part.x - this.parts[1].x,
      y: part.y - this.parts[1].y,
    };
    const dirs = ["-1,0", "1,0", "0,-1", "0,1"];
    dirs.splice(dirs.indexOf(`${-dir.x},${-dir.y}`), 1);
    const choices = dirs
      .map((dir) => {
        const [x, y] = dir.split(",").map(Number);
        return { x, y };
      })
      .filter((dir) => {
        const choice = {
          x: part.x + dir.x,
          y: part.y + dir.y,
        };
        return (
          choice.x >= 0 &&
          choice.x < tiles.width &&
          choice.y >= 0 &&
          choice.y < tiles.height
        );
      });
    if (!choices.length) {
      console.error(choices);
    }
    const newDir = choices[Math.floor(Math.random() * choices.length)];

    const head = {
      x: part.x + newDir.x,
      y: part.y + newDir.y,
    };
    this.parts.unshift(head);
    const cellIndex = head.y * tiles.width + head.x;

    const tile = tiles.layers[0].data[cellIndex];
    if (tile.type !== "EMPTY") {
      tile.type = "EMPTY";
      playSound("blockBroken");
    }

    if (this.parts.length > 8) this.parts.pop();
  }
}
