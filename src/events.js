export function sendGameEvent(type, value) {
  const detail = { type, value };
  console.log("sendGameEvent", detail);
  game_wrapper.dispatchEvent(new CustomEvent("game-event", { detail }));
}

export function receiveGameEvents(callback) {
  game_wrapper.addEventListener("game-event", (event) => {
    console.log("receiveGameEvent", event.detail);
    callback(event.detail);
  });
}
