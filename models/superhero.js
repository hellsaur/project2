const db = require('../db/config');

const Superhero = {};

Superhero.findAll = () => {
   return db.query('SELECT * FROM locations')
};

Superhero.findById = (id) => {
  return db.one(`
SELECT * FROM locations
WHERE id = $1
    `,[id]);
};

Superhero.create = (superhero) => {
  return db.one(`
INSERT INTO locations (
  city,
  country,
  name,
  description,
  thumbnail)
  VALUES(
  $1,$2,$3,$4,$5
) RETURNING *`,
[superhero.city, superhero.country, superhero.name, superhero.description, superhero.thumbnail]);

}

Superhero.update = (superhero, id) => {
    return db.none(`
      UPDATE locations SET
      city=$1,
      country=$2,
      name=$3,
      description=$4,
      thumbnail=$5
      WHERE
      id=$6
      RETURNING *`,
        [superhero.city, superhero.country,superhero.name, superhero.description, superhero.thumbnail, id]);

}


Superhero.destroy = id =>
db.none(`DELETE FROM locations WHERE id = $1`, id)

module.exports = Superhero;
