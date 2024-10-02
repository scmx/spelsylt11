export class Worm {
  constructor(parts) {
    this.parts = parts;
  }
  draw(ctx) {
    ctx.fillStyle = "green";
    for (const part of this.parts) {
      ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
    }
  }
  update(delta) {
    if (this.free) return;
    if (delta.moveWorms) this.move(delta);
  }
  move() {
    const dir = {
      x: this.parts[0].x - this.parts[1].x,
      y: this.parts[0].y - this.parts[1].y,
    };
    const dirs = ["-1,0", "1,0", "0,-1", "0,1"];
    dirs.splice(dirs.indexOf(`${-dir.x},${-dir.y}`), 1);
    const [dirX, dirY] = dirs[Math.floor(Math.random() * dirs.length)]
      .split(",")
      .map(Number);
    const newDir = { x: dirX, y: dirY };

    const head = {
      x: this.parts[0].x + newDir.x,
      y: this.parts[0].y + newDir.y,
    };
    this.parts.unshift(head);
    if (Math.random < 0.5) this.parts.pop();
  }
}
