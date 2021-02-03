import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import brain from 'brain.js';

import data from '../public/js/training-data';
import { randomRGB, relativeRGB } from '../public/js/rgb-helpers';
import { rgbValuesValidator } from '../middlewares';

const router = Router();

const net = new brain.NeuralNetwork();
let trained = false;

/* GET home page. */
router.get('/', rgbValuesValidator, (req: Request, res: Response) => {
  const errors = validationResult(req);
  let { r, g, b } = randomRGB();
  if (trained === false) {
    net.train(data);
    trained = true;
  }
  if (errors.isEmpty()) {
    r = parseInt(req.query.r?.toString() || '0', 10);
    g = parseInt(req.query.g?.toString() || '0', 10);
    b = parseInt(req.query.b?.toString() || '0', 10);
  }
  const likely: string = brain.likely(relativeRGB({ r, g, b }), net);
  res.json({
    r,
    g,
    b,
    likely,
  });
});

export default router;
