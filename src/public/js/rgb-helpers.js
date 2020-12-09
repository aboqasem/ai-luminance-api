function randomRGB() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

function relativeRGB({ r, g, b }) {
  return {
    r: r / 255,
    g: g / 255,
    b: b / 255,
  };
}

module.exports = { randomRGB, relativeRGB };
