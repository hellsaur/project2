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
  country)
  VALUES(
  $1,$2
) RETURNING *`,
[superhero.city, superhero.country]);

}

Superhero.update = (superhero, id) => {
    return db.none(`
      UPDATE locations SET
      city=$1,
      country=$2
      WHERE
      id=$3
      RETURNING *`,
        [superhero.city, superhero.country, id]);

}


Superhero.destroy = id =>
db.none(`DELETE FROM locations WHERE id = $1`, id)

module.exports = Superhero;
