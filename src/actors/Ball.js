import { Actor } from "./Actor.js";

export class Ball extends Actor {
  #size;
  #field;
  #paddles;

  constructor(x, y, velocity, size, field, paddles, u1, u2) {
    super(x, y, velocity, "Ball");
    this.#size = size;
    this.#field = field;
    this.#paddles = paddles;
    this.u1 = u1;
    this.u2 = u2;
  }

  draw(ctx) {
    this.move();
    super.draw(ctx);
    ctx.arc(this.x, this.y, this.#size, Math.PI * 2, 0);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }

  move() {
    if (this.#hasTouchedTopOrBottomWall()) {
      this.velocity.y *= -1;
    }

    if (this.#hasTouchedLeftOrRightWall()) {
      if (this.#hasTouchedLeftWall()) {
        this.u1();
      }
      if (this.#hasTouchedRightWall()) {
        this.u2();
      }
      this.velocity.x *= -1;
      this.x = this.#field.width / 2;
      this.y = this.#field.height / 2;
      return;
    }

    if (this.#hasTouchedPaddle()) {
      this.velocity.x *= -1;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  #hasTouchedPaddle() {
    const lPaddle = this.#paddles[0];
    const rPaddle = this.#paddles[1];
    if (
      (this.y > lPaddle.y &&
        this.y < lPaddle.y + lPaddle.height &&
        this.x < lPaddle.width) ||
      (this.y > rPaddle.y &&
        this.y < rPaddle.y + rPaddle.height &&
        this.x > this.#field.width - lPaddle.width)
    )
      return true;
  }

  #hasTouchedTopOrBottomWall() {
    // Top and Bottom wall
    if (this.y < 0 || this.y > this.#field.height) {
      return true;
    }
  }

  #hasTouchedLeftWall() {
    if (this.x < 0) return true;
  }

  #hasTouchedRightWall() {
    if (this.x > this.#field.width) return true;
  }

  #hasTouchedLeftOrRightWall() {
    if (this.x < 0 || this.x > this.#field.width) return true;
  }
}
