const db = require('../db/config');

const Superheroes = {};

Superheroes.findAll = () => {
   return db.query('SELECT * FROM superheroes')
};

Superheroes.findById = (id) => {
  return db.one(`
SELECT * FROM superheroes
WHERE id = $1
    `,[id]);
};

Superheroes.create = (superheroes) => {
  return db.one(`
INSERT INTO superheroes (
  name,
  description,
  thumbnail)
  VALUES(
  $1,$2,$3
) RETURNING *`,
[superheroes.name, superheroes.description, superheroes.thumbnail]);

}

Superheroes.update = (superheroes, id) => {
    return db.none(`
      UPDATE superheroes SET
      name=$1,
      description=$2,
      thumbnail=$3
      WHERE
      id=$4
      RETURNING *`,
        [superheroes.name, superheroes.description, superheroes.thumbnail, id]);

}
// Superhero.findSightings = (name) => {
//   return db.manyOrNone(`
//     SELECT * FROM locations
//     WHERE name = $1
//   `, [name]);
// }

Superheroes.destroy = id =>
db.none(`DELETE FROM superheroes WHERE id = $1`, id)

module.exports = Superheroes;
