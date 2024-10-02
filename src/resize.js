export function resize(
  wrapper,
  canvas,
  { width = innerWidth, height = innerHeight } = {},
) {
  const minRatio = 4 / 3;
  const maxRatio = 852 / 393;
  const innerRatio = width / height;
  const ratio = Math.max(minRatio, Math.min(innerRatio, maxRatio));
  const [w, h] =
    ratio >= innerRatio ? [width, width / ratio] : [height * ratio, height];

  wrapper.style.width = `${w}px`;
  wrapper.style.height = `${h}px`;

  canvas.width = w;
  canvas.height = h;
}
