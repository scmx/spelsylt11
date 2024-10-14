import assert from "node:assert";
import test from "node:test";
import { resize } from "./resize.js";

test("resize with ratio 5:2 limits to max 19.5:9", () => {
  assertResize(1, 1000, 393, 852, 393, 468, 215.8732394366197);
});

test("resize with ratio 19.5:9 is allowed", () => {
  assertResize(1, 852, 393, 852, 393, 468, 215.8732394366197);
});

test("resize with ratio 16:9 is allowed", () => {
  assertResize(1, 2560, 1440, 2560, 1440, 468, 263.25);
});

test("resize with ratio 4:3 is allowed", () => {
  assertResize(1, 1200, 800, 1200, 800, 468, 312);
});

test("resize with ratio 1:1 limits to 4:3", () => {
  assertResize(1, 1000, 1000, 1000, 750, 468, 351);
});

function assertResize(
  dpi,
  width,
  height,
  expectedStyleWidth,
  expectedStyleHeight,
  expectedWidth,
  expectedHeight,
) {
  const wrapper = { style: {} };
  const canvas = {};
  const subject = { wrapper, canvas };

  resize(wrapper, canvas, { width, height, dpi });

  const style = {
    width: `${expectedStyleWidth}px`,
    height: `${expectedStyleHeight}px`,
  };
  assert.deepEqual(subject, {
    wrapper: { style },
    canvas: { width: expectedWidth, height: expectedHeight },
  });
}
