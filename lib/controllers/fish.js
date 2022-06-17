const { Router } = require('express');
const { Fish } = require('../models/Fish');

module.exports = Router()
//   .delete('/:id', async (req, res, next) => {
//     try {
//       const deleteData = await Car.delete(req.params.id);
//       res.json(deleteData);    
//     } catch (e) {
//       next(e);   
//     }
//   })
//   .put('/:id', async (req, res, next) => {
//     try {
//       const updateData = await Car.updateById(req.params.id, req.body);
//       res.json(updateData);   
//     } catch (e) {
//       next(e); 
//     }
//   })
//   .post('/', async (req, res, next) => {
//     try {
//       const insertData = await Car.insert(req.body);
//       res.json(insertData);  
//     } catch (e) {
//       next(e);
//     }
//   })
//   .get('/:id', async (req, res, next) => {
//     try {
//       const idData = await Car.getById(req.params.id);
//       res.json(idData);   
//     } catch (e) {
//       next(e);   
//     }
//   })
  .get('/', async (req, res, next) => {
    try {
      const fishData = await Fish.getAll();
      res.json(fishData); 
    } catch (e) {
      next(e);
    }
  });
