const Superheroes = require('../models/Superheroes');

const superheroesController = {};

superheroesController.index = (req, res)=> {
  console.log(res.locals.name, res.locals.description, res.locals.thumbnail)
  res.render('sh-index', {
    name: res.locals.name,
    description:res.locals.description,
    thumbnail: res.locals.thumbnail
  });
 };

 superheroesController.show = (req,res) => {
   Superhero.findById(req.params.id)
   .then(superheroes => {
     res.render('sh-single', {
       superheroes:  superheroes,
     });
   }).catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
 };

 superheroesController.create = (req, res) => {
   console.log(req.body);
   Superheroes.create({
       city: req.body.city,
       country: req.body.country,
       name: req.body.name,
       description:req.body.description,
       thumbnail: req.body.thumbnail
   }).then((superheroes) => {
     res.redirect('/superhero/list')
   }).catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
 };

 superheroesController.update = (req, res) => {
   Superheroes.update({
     city: req.body.city,
     country: req.body.country,
     name: req.body.name,
     description:req.body.description,
     thumbnail: req.body.thumbnail

   },req.params.id)
   .then((superhero) => {
     console.log('resdfsd')
     res.redirect('/superhero/list')
   }).catch(err => {
     console.log(err);
     res.status(500).json(err)
   });
 };

 superheroesController.edit = (req, res) => {
   Superheroes.findById(req.params.id)
   .then(superhero => {
     res.render('sh-edit', {
       superhero: superhero,
     });
   }).catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
 };

 superheroesController.delete = (req,res) => {
   Superheroes.destroy(req.params.id)
   .then(()=>{
     res.redirect('/superhero');
   }).catch(err =>{
     console.log(err);
     res.status(500).json(err)
   });
 };

 module.exports = superheroesController;
