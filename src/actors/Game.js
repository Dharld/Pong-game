import { Ball } from "./Ball.js";
import { Vector } from "../utils/Vector.js";
import { Paddle } from "./Paddle.js";
import {
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  SCORE1SPAN,
  SCORE2SPAN,
} from "../utils/constants.js";

export class Game {
  #field;
  #actors = [];
  #score1;
  #score2;

  constructor() {
    this.#field = document.getElementById("canvas");
    this.#score1 = 0;
    this.#score2 = 0;
  }

  init() {
    this.#createActors();
    this.update();
  }

  #drawActors() {
    const ctx = this.#field.getContext("2d");
    this.#actors.forEach((actor) => actor.draw(ctx));
  }

  updateScore1() {
    this.#score1++;
    SCORE1SPAN.textContent = this.#score1;
  }

  updateScore2() {
    this.#score2++;
    SCORE2SPAN.textContent = this.#score2;
  }

  update() {
    const ctx = this.#field.getContext("2d");
    ctx.clearRect(0, 0, this.#field.width, this.#field.height);
    this.#drawActors();
    requestAnimationFrame(this.update.bind(this));
  }

  #createActors() {
    // Initializing the different actors

    const lPaddle = new Paddle(
      0,
      this.#field.height / 2 - PADDLE_HEIGHT / 2,
      new Vector(0, 40),
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      "left",
      this.#field
    );

    const rPaddle = new Paddle(
      this.#field.width - PADDLE_WIDTH,
      this.#field.height / 2 - PADDLE_HEIGHT / 2,
      new Vector(0, 40),
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      "right",
      this.#field
    );

    // Initial direction of the ball
    const side = Math.random() < 0.5 ? -1 : 1;
    const randomXStart = (5 + Math.random() * 2) * side;
    const randomYStart = (5 + Math.random() * 2) * side;

    const ball = new Ball(
      this.#field.width / 2,
      this.#field.height / 2,
      new Vector(randomXStart, randomYStart),
      7.5,
      this.#field,
      [lPaddle, rPaddle],
      this.updateScore1.bind(this),
      this.updateScore2.bind(this)
    );

    this.#actors.push(ball, lPaddle, rPaddle);
  }
}
