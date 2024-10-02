import { receiveGameEvents } from "./events.js";
import { game, gameStates } from "./game.js";
import { injectI18nContent } from "./i18n.js";

menu_button.addEventListener("pointerdown", () => {
  console.log("menu_button");
  game.pause();
});

openStartMenu();
injectI18nContent(avatar_settings);

receiveGameEvents(({ type, value }) => {
  console.log(type, value);
  if (type === "state") {
    document.body.dataset.gameState = value;
    if (value === gameStates.start_menu) {
      openStartMenu();
    } else if (value === gameStates.pause_menu) {
      openPauseMenu();
    } else if (value === gameStates.playing) {
      player_avatar.appendChild(avatar_canvas);
      menu_dialog.close();
    }
  }
});

function openStartMenu() {
  console.log("openStartMenu");
  const tmpl = menu_start_template.content.cloneNode(true);
  injectI18nContent(tmpl);
  avatar_settings_preview.appendChild(avatar_canvas);
  menu_content.innerHTML = "";
  menu_content.appendChild(tmpl);
  console.log(menu_start_button);
  document
    .querySelector("#menu_start_button")
    .addEventListener("pointerdown", () => {
      game.start();
    });
  menu_dialog.showModal();
}

function openPauseMenu() {
  console.log("openPauseMenu");
  const tmpl = menu_pause_template.content.cloneNode(true);
  injectI18nContent(tmpl);
  avatar_settings_preview.appendChild(avatar_canvas);
  menu_content.innerHTML = "";
  menu_content.appendChild(tmpl);
  menu_resume_button.addEventListener("pointerdown", () => {
    game.resume();
  });
  menu_restart_button.addEventListener("pointerdown", () => {
    location.reload();
  });
  menu_dialog.showModal();
}
