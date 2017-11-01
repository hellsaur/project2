const Superhero = require('../models/Superhero');
const Superheroes = require('../models/Superheroes');

const superheroController = {};

superheroController.index = (req,res) =>{
  console.log(res.locals.name, res.locals.description, res.locals.thumbnail)
  res.render('sh-index', {
    name: res.locals.name,
    description:res.locals.description,
    thumbnail: res.locals.thumbnail
  });
};

 superheroController.list = (req, res) => {
   Superhero.findAll()
   .then(superhero => {
     console.log(superhero);
     res.render('sh-list', {superhero});
   }).catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
 }

 superheroController.show = (req,res) => {
  const locQuery = superhero.findById(req.params.id)
  const heroQuery = superheroes.findById(req.params.id)
  Promise.all([locQuery, heroQuery])
  .then(promises => {
     const location = promises[0]
     const hero = promises[1]
     res.render('location/show', {
       superhero: superhero,
       superheroes:superheroes
     });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
 };
// superheroController.show = (req,res) => {
//   Superhero.findById(req.params.id)
//   .then(superhero => {
//     res.render('sh-single', {
//       superhero:  superhero,
//     });
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// };

superheroController.create = (req, res) => {
  console.log(req.body);
  Superhero.create({
      city: req.body.city,
      country: req.body.country,
      name: req.body.name,
      description:req.body.description,
      thumbnail: req.body.thumbnail
  }).then((superhero) => {
    res.redirect('/superhero/list')
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

superheroController.update = (req, res) => {
  Superhero.update({
    city: req.body.city,
    country: req.body.country,
    name: req.body.name,
    description:req.body.description,
    thumbnail: req.body.thumbnail

  },req.params.id)
  .then((superhero) => {
    res.redirect(`/superhero/${superhero.id}`)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
};

superheroController.edit = (req, res) => {
  Superhero.findById(req.params.id)
  .then(superhero => {
    res.render('sh-edit', {
      superhero: superhero,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

superheroController.delete = (req,res) => {
  Superhero.destroy(req.params.id)
  .then(()=>{
    res.redirect('/superhero');
  }).catch(err =>{
    console.log(err);
    res.status(500).json(err)
  });
};

module.exports = superheroController;
