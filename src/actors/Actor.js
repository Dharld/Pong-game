export class Actor {
  _x;
  _y;
  _velocity;
  _type;

  constructor(x, y, vel, type) {
    this._x = x;
    this._y = y;
    this._velocity = vel;
    this._type = type;
  }

  get x() {
    return this._x;
  }
  set x(value) {
    return (this._x = value);
  }
  get y() {
    return this._y;
  }
  set y(value) {
    return (this._y = value);
  }
  get velocity() {
    return this._velocity;
  }
  set velocity(value) {
    return (this._velocity = value);
  }

  get type() {
    return this._type;
  }
  set type(value) {
    return (this._type = value);
  }

  draw(ctx) {
    ctx.beginPath();
  }
}
