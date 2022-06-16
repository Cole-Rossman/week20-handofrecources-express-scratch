const { Router } = require('express');
const { Beer } = require('../models/Beer');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const deleteData = await Beer.delete(req.params.id);
      res.json(deleteData);    
    } catch (e) {
      next(e);   
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updateData = await Beer.updateById(req.params.id, req.body);
      res.json(updateData);   
    } catch (e) {
      next(e); 
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const insertData = await Beer.insert(req.body);
      res.json(insertData);  
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const idData = await Beer.getById(req.params.id);
      res.json(idData);   
    } catch (e) {
      next(e);   
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const beerData = await Beer.getAll();
      res.json(beerData); 
    } catch (e) {
      next(e);
    }
  });
