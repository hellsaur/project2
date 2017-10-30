const fetch = require('node-fetch');


require('dotenv').config()

const md5 = require('js-md5');

//                      V req, res,next
function makeRequest(req, res, next) {
  const ts = Date.now()
  const pubKey = process.env.MARVEL_PUBLIC_KEY
  const privKey = process.env.MARVEL_PRIVATE_KEY
  const hash = md5(ts + privKey + pubKey)
                //                                              V req.body.name or something
  fetch(`http://gateway.marvel.com/v1/public/characters?name=hulk&ts=${ts}&apikey=${pubKey}&hash=${hash}`)
  .then(res => res.json())
  .then(jsonRes => {
    console.log(jsonRes);
    console.log(jsonRes.data.superhero);
    res.locals.superheroes = jsonRes

    res.locals.name = jsonRes.data.superhero[0].name;
    res.locals.description = jsonRes.data.superhero[0].description;
    res.locals.thumbnail = jsonRes.data.superhero[0].path + jsonRes.data.superhero[0].extension;
    next();
  }).catch((err) => {
    console.log(err);
    res.locals.name = null;
    res.locals.description = null;
    res.locals.thumbnail = null;
    next();
  })
}
module.exports = {
  makeRequest: makeRequest,
}
