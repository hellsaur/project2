const express = require('express');
const superheroRoutes = express.Router();

const superheroController = require('../controllers/sh-controller');
const hero = require('../services/hero-helper');

superheroRoutes.post('/', hero.makeRequest, superheroController.index);
superheroRoutes.get('/', superheroController.index);

superheroRoutes.get('/location', (req, res) => {
  res.render('location');
})

superheroRoutes.get('/add', (req, res) => {
  res.render('sh-add');
})


superheroRoutes.get('/:id', superheroController.show);
superheroRoutes.post('/', superheroController.create);
superheroRoutes.get('/:id/edit', superheroController.edit);
superheroRoutes.put('/:id', superheroController.update);
superheroRoutes.delete('/:id', superheroController.delete);

module.exports = superheroRoutes;
