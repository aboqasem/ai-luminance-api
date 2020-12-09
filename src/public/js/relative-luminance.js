/**
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */

function rValue(v) {
  if (v <= 0.03928) return parseFloat(v / 12.92);
  return parseFloat(((v + 0.055) / 1.055) ** 2.4);
}

function luminance({ r, g, b }) {
  return parseFloat(0.2126 * rValue(r / 255) + 0.7152 * rValue(g / 255) + 0.0722 * rValue(b / 255));
}

module.exports = { luminance };
