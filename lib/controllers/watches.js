const { Router } = require('express');
const { Watch } = require('../models/Watch');

module.exports = Router()
//   .delete('/:id', async (req, res, next) => {
//     try {
//       const deleteData = await Fruit.delete(req.params.id);
//       res.json(deleteData);    
//     } catch (e) {
//       next(e);   
//     }
//   })
//   .put('/:id', async (req, res, next) => {
//     try {
//       const updateData = await Fruit.updateById(req.params.id, req.body);
//       res.json(updateData);   
//     } catch (e) {
//       next(e); 
//     }
//   })
//   .post('/', async (req, res, next) => {
//     try {
//       const insertData = await Fruit.insert(req.body);
//       res.json(insertData);  
//     } catch (e) {
//       next(e);
//     }
//   })
  .get('/:id', async (req, res, next) => {
    try {
      const idData = await Watch.getById(req.params.id);
      res.json(idData);   
    } catch (e) {
      next(e);   
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const watchData = await Watch.getAll();
      res.json(watchData); 
    } catch (e) {
      next(e);
    }
  });
