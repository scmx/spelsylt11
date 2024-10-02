import { translate } from "./i18n.js";

const canvas = avatar_canvas;
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
let stream;

let zoomLevel = 1;
let pixelation = 40;

function render() {
  canvas.width = pixelation * zoomLevel;
  canvas.height = canvas.width;
  ctx.save();
  if (stream?.active) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(camera_video, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(avatar_image, 0, 0, canvas.width, canvas.height);
  }
  ctx.restore();
  requestAnimationFrame(render);
}
addEventListener("load", () => requestAnimationFrame(render));

avatar_zoom_out.addEventListener("pointerdown", () => {
  zoomLevel = clamp(1, zoomLevel - 1, 4);
  avatar_canvas.style.scale = zoomLevel;
});
avatar_zoom_in.addEventListener("pointerdown", () => {
  zoomLevel = clamp(1, zoomLevel + 1, 4);
  avatar_canvas.style.scale = zoomLevel;
});
camera_freeze_button.addEventListener("pointerdown", () => {
  // snapshot from image
  // save to avatar_image
  avatar_image.src = canvas.toDataURL();
  stopCamera();
});
function clamp(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

let lessInterval;
avatar_pixelate_less.addEventListener("pointerdown", () => {
  clearInterval(lessInterval);
  lessInterval = setInterval(() => {
    pixelation = clamp(10, pixelation + 2, 100);
  }, 100);
});
avatar_pixelate_less.addEventListener("pointerup", () => {
  clearInterval(lessInterval);
});
avatar_pixelate_less.addEventListener("pointerleave", () => {
  clearInterval(lessInterval);
});
avatar_pixelate_less.addEventListener("pointercancel", () => {
  clearInterval(lessInterval);
});

let moreInterval;
avatar_pixelate_more.addEventListener("pointerdown", () => {
  clearInterval(moreInterval);
  moreInterval = setInterval(() => {
    pixelation = clamp(10, pixelation - 2, 100);
  }, 100);
});
avatar_pixelate_more.addEventListener("pointerup", (event) => {
  clearInterval(moreInterval);
});
avatar_pixelate_more.addEventListener("pointerleave", () => {
  clearInterval(moreInterval);
});
avatar_pixelate_more.addEventListener("pointercancel", () => {
  clearInterval(moreInterval);
});

file_input.addEventListener("change", (event) => {
  avatar_image.src = URL.createObjectURL(event.target.files[0]);
});

async function initCamera() {
  document.body.dataset.camera = "on";
  camera_button.textContent = translate("camera_stop_button");
  stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 400, height: 400, facingMode: "user" },
  });

  camera_video.srcObject = stream;
  camera_video.play();
}
function stopCamera() {
  document.body.dataset.camera = "off";
  stream.getTracks().forEach((track) => track.stop());
  camera_video.srcObject = null;
  camera_button.textContent = translate("camera_start_button");
}
camera_button.addEventListener("pointerdown", () => {
  if (stream?.active) {
    stopCamera();
  } else {
    initCamera();
  }
});
//avatar_file_button.addEventListener("pointerdown", () => {
//  file_input.click();
//});
