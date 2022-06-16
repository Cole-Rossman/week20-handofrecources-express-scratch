const { Router } = require('express');
const { Fruit } = require('../models/Fruit');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const fruitData = await Fruit.getAll();
      res.json(fruitData); 
    } catch (e) {
      next(e);
    }
  });
