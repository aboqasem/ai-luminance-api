const express = require('express');
const brain = require('brain.js');

const { data } = require('../public/js/training-data');
const { randomRGB, relativeRGB } = require('../public/js/rgb-helpers');

const router = express.Router();

const net = new brain.NeuralNetwork();
let trained = false;

/* GET home page. */
router.get('/', (req, res) => {
  if (trained === false) {
    net.train(data);
    trained = true;
  }
  const { r, g, b } = randomRGB();
  const likely = brain.likely(relativeRGB({ r, g, b }), net);
  res.json({
    msg: 'Hello, World!',
    r,
    g,
    b,
    likely,
  });
});

module.exports = { router };
