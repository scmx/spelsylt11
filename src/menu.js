import { receiveGameEvents } from "./events.js";
import { game, gameStates } from "./game.js";
import { injectI18nContent, setLanguage } from "./i18n.js";

menu_button.addEventListener("pointerup", () => {
  console.log("menu_button");
  game.pause();
});

openStartMenu();
injectI18nContent(avatar_settings);

receiveGameEvents(({ type, value }) => {
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
  const tmpl = menu_start_template.content.cloneNode(true);
  injectI18nContent(tmpl);
  avatar_settings_preview.appendChild(avatar_canvas);
  menu_content.innerHTML = "";
  menu_content.appendChild(tmpl);
  document
    .querySelector("#menu_start_button")
    .addEventListener("pointerup", () => {
      game.start();
    });
  menu_dialog.showModal();
}

function openPauseMenu() {
  const tmpl = menu_pause_template.content.cloneNode(true);
  injectI18nContent(tmpl);
  avatar_settings_preview.appendChild(avatar_canvas);
  menu_content.innerHTML = "";
  menu_content.appendChild(tmpl);
  menu_resume_button.addEventListener("pointerup", () => {
    game.resume();
  });
  menu_restart_button.addEventListener("pointerup", () => {
    location.reload();
  });
  menu_dialog.showModal();
}

menu_lang_sv_button.addEventListener("pointerup", handleSetLanguage);
menu_lang_en_button.addEventListener("pointerup", handleSetLanguage);

function handleSetLanguage(event) {
  if (!event.target) return;
  setLanguage(event.target.value);
}
