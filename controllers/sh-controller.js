const Superhero = require('../models/Superhero');

const superheroController = {};

superheroController.index = (req, res) => {
    res.render('../views/sh-index',{
      name: res.locals.name,
      description:res.locals.description,
      thumbnail: res.locals.thumbnail,
      superheroes: res.locals.superheroes
    });
}
// superheroController.index = (req, res) => {
//   Superhero.findAll()
//   .then(superhero => {
//     res.json('views/sh-index', {
//       superhero: superhero,
//       name: res.locals.name,
//       description:res.locals.description,
//       thumbnail: res.locals.thumbnail,
//     });
//   }).catch(err => {
//     console.log(err)
//     res.status(500).json(err);
//   });
// };

superheroController.show = (req,res) => {
  Superhero.findById(req.params.id)
  .then(superhero => {
    res.render('sh-single', {
      superhero:  superhero,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

superheroController.create = (req, res) => {
  Superhero.create({
    city: req.body.city,
    country: req.body.country,
  }).then((superhero) => {
    res.redirect(`/superhero/${superhero.id}`)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

superheroController.update = (req, res) => {
  Superhero.update({
    city: req.body.city,
    country: req.body.country,
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
