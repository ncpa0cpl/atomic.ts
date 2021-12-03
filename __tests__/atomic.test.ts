const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randInt = (min: number, max: number) =>
  (((min = Math.round(min)) && (max = Math.round(max))) || true) &&
  Math.round(Math.random() * (max - min)) + min;
