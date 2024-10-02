import assert from "node:assert";
import test from "node:test";
import { resize } from "./resize.js";

test("resize with ratio 5:2 limits to max 19.5:9", () => {
  assertResize(1000, 393, 852, 393);
});

test("resize with ratio 19.5:9 is allowed", () => {
  assertResize(852, 393, 852, 393);
});

test("resize with ratio 16:9 is allowed", () => {
  assertResize(2560, 1440, 2560, 1440);
});

test("resize with ratio 4:3 is allowed", () => {
  assertResize(1200, 800, 1200, 800);
});

test("resize with ratio 1:1 limits to 4:3", () => {
  assertResize(1000, 1000, 1000, 750);
});

function assertResize(width, height, expectedWidth, expectedHeight) {
  const wrapper = { style: {} };
  const canvas = {};
  const subject = { wrapper, canvas };

  resize(wrapper, canvas, { width, height });

  const style = { width: `${expectedWidth}px`, height: `${expectedHeight}px` };
  assert.deepEqual(subject, {
    wrapper: { style },
    canvas: { width: expectedWidth, height: expectedHeight },
  });
}
