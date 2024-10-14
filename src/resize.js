export function resize(
  wrapper,
  canvases,
  { width = innerWidth, height = innerHeight } = {},
) {
  const minRatio = 4 / 3;
  const maxRatio = 852 / 393;
  const innerRatio = width / height;
  const ratio = Math.max(minRatio, Math.min(innerRatio, maxRatio));
  let [w1, h1] =
    ratio >= innerRatio ? [width, width / ratio] : [height * ratio, height];

  wrapper.style.width = `${w1}px`;
  wrapper.style.height = `${h1}px`;

  Object.entries(canvases).forEach(([, { canvas, size, tileSize }]) => {
    canvas.width = size * tileSize;
    canvas.height = canvas.width / ratio;
  });
}
