import { sendGameEvent } from "./events.js";
import { Worm } from "./worm.js";

export const gameStates = {
  main_menu: "main_menu",
  playing: "playing",
  pause_menu: "pause_menu",
  game_over: "game_over",
};

class Game {
  state = gameStates.main_menu;
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
    for (const worm of this.worms) worm.update(delta);
  }
}

export const game = new Game();
