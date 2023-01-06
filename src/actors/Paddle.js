import { Actor } from "./Actor.js";

export class Paddle extends Actor {
  #width;
  #height;
  #position;
  #field;

  constructor(x, y, velocity, width, height, position, field) {
    super(x, y, velocity, "Paddle");
    this.#width = width;
    this.#height = height;
    this.#position = position;
    this.#field = field;
    document.addEventListener("keydown", (e) => {
      if (position == "right") {
        if (e.key == "Up" || e.key == "ArrowUp") this.moveUp();
        if (e.key == "Down" || e.key == "ArrowDown") this.moveDown();
      }
      if (position == "left") {
        if (e.key == "z") this.moveUp();
        if (e.key == "s") this.moveDown();
      }
    });
  }

  set position(value) {
    this.#position = value;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }

  moveUp() {
    if (this.y < 0) return;
    this.y -= this.velocity.y;
  }
  moveDown() {
    if (this.y + this.height > this.#field.height) return;
    this.y += this.velocity.y;
  }

  hasTouchedWall() {}
}
