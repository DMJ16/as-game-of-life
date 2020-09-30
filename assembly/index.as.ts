export declare const CELL_ALIVE: u32;
export declare const CELL_DEAD: u32;
export declare const BIT_ROT: u32;

let width: i32;
let height: i32;
let offset: i32;

function get(x: u32, y: u32): u32 {
  return load<u32>((y * width + x) << 2);
}

function set(x: u32, y: u32, value: u32): void {
  store<u32>((offset + y * width + x) << 2, value);
}

function rot(x: u32, y: u32, value: u32): void {
  const alpha = max<i32>((value >> 24) - BIT_ROT, 0);
  set(x, y, (alpha << 24) | (value & 0x00ffffff));
}

export function init(w: i32, h: i32): void {
  width = w;
  height = h;
  offset = w * h;

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      const cell =
        Math.random() > 0.1 ? CELL_DEAD & 0x00fffff : CELL_ALIVE | 0xff000000;
      set(x, y, cell);
    }
  }
}

export function step(): void {
  let w = width;
  let h = height;
  let hm1 = h - 1;
  let wm1 = w - 1;

  for (let y = 0; y < h; ++y) {
    const ym1 = y == 0 ? hm1 : y - 1;
    const yp1 = y == hm1 ? 0 : y + 1;
    for (let x = 0; x < w; ++x) {
      const xm1 = x == 0 ? wm1 : x - 1;
      const xp1 = x == wm1 ? 0 : x + 1;
      const liveNeighbors =
        (get(xm1, ym1) & 1) +
        (get(x, ym1) & 1) +
        (get(xp1, ym1) & 1) +
        (get(xm1, y) & 1) +
        (get(xp1, y) & 1) +
        (get(xm1, yp1) & 1) +
        (get(x, yp1) & 1) +
        (get(xp1, yp1) & 1);

      const self = get(x, y);
      if (self & 1) {
        if ((liveNeighbors & 0b1110) == 2) rot(x, y, self);
        else set(x, y, CELL_DEAD | 0xff000000);
      } else {
        if (liveNeighbors == 3) set(x, y, CELL_ALIVE | 0xff000000);
        else rot(x, y, self);
      }
    }
  }
}

export function fill(x: u32, y: u32, p: f64): void {
  for (let i = 0; i < width; ++i) {
    if (Math.random() < p) set(i, y, CELL_ALIVE | 0xff000000);
  }
  for (let j = 0; j < height; ++j) {
    if (Math.random() < p) set(x, j, CELL_ALIVE | 0xff000000);
  }
}
