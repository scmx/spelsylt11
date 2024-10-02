import "./game.js";
import "./menu.js";
import "./canvas.js";
import "./avatar.js";

// Prevent pinch zoom, selecting text etc
function preventTouch(event) {
  if (event.target?.id === "avatar_file_label") return;
  event.preventDefault();
}
const prevent = (e) => e.preventDefault();
addEventListener("touchstart", preventTouch, { passive: false });
addEventListener("touchmove", prevent, { passive: false });
addEventListener("gesturestart", prevent, { passive: false });
addEventListener("gesturechange", prevent, { passive: false });
addEventListener("contextmenu", prevent, { passive: false });
addEventListener("selectstart", prevent, { passive: false });
addEventListener("selectionchange", prevent, { passive: false });
