export class Sprite {
  #updater;

  constructor(image, { size, updater, ...attributes }) {
    this.image = image;
    this.width = typeof size === "number" ? size : size.width;
    this.height = typeof size === "number" ? size : size.height;
    this.#updater = updater;
    Object.assign(this, attributes);
    this.offsetX = 0;
    this.offsetY = 0;
    this.#updater.call(this);
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx, x, y, width, height) {
    ctx.drawImage(
      this.image,
      this.width * (this.startX + this.offsetX),
      this.height * (this.startY + this.offsetY),
      this.width,
      this.height,
      x,
      y,
      width,
      height,
    );
  }

  update(delta) {
    this.#updater.call(this, delta);
  }
}
