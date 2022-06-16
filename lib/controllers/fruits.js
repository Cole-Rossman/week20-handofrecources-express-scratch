const { Router } = require('express');
const { Fruit } = require('../models/Fruit');

module.exports = Router()
  .put('/:id', async (req, res, next) => {
    try {
      const updateData = await Fruit.updateById(req.params.id, req.body);
      res.json(updateData);   
    } catch (e) {
      next(e); 
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const insertData = await Fruit.insert(req.body);
      res.json(insertData);  
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const idData = await Fruit.getById(req.params.id);
      res.json(idData);   
    } catch (e) {
      next(e);   
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const fruitData = await Fruit.getAll();
      res.json(fruitData); 
    } catch (e) {
      next(e);
    }
  });
