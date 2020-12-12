const express = require('express');
const { validationResult } = require('express-validator');
const brain = require('brain.js');

const { data } = require('../public/js/training-data');
const { randomRGB, relativeRGB } = require('../public/js/rgb-helpers');
const { rgbValuesValidator } = require('../middlewares');

const router = express.Router();

const net = new brain.NeuralNetwork();
let trained = false;

/* GET home page. */
router.get('/', rgbValuesValidator, (req, res) => {
  const errors = validationResult(req);
  let { r, g, b } = randomRGB();
  if (trained === false) {
    net.train(data);
    trained = true;
  }
  if (errors.isEmpty()) {
    r = parseInt(req.query.r, 10);
    g = parseInt(req.query.g, 10);
    b = parseInt(req.query.b, 10);
  }
  const likely = brain.likely(relativeRGB({ r, g, b }), net);
  res.json({
    r,
    g,
    b,
    likely,
  });
});

module.exports = { router };
