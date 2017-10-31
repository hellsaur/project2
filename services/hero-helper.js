const fetch = require('node-fetch');


require('dotenv').config()

const md5 = require('js-md5');



function makeRequest(req, res, next) {
  console.log(req.body.name)
  const name = req.body.name
  const ts = Date.now()
  const pubKey = process.env.MARVEL_PUBLIC_KEY
  const privKey = process.env.MARVEL_PRIVATE_KEY
  const hash = md5(ts + privKey + pubKey)

  fetch(`http://gateway.marvel.com/v1/public/characters?name=${name}&ts=${ts}&apikey=${pubKey}&hash=${hash}`)
  .then(res => res.json())
  .then(jsonRes => {
    // console.log(jsonRes);
    // console.log(jsonRes.data.results);
    res.locals.superheroes = jsonRes

    res.locals.name = jsonRes.data.results[0].name;
    res.locals.description = jsonRes.data.results[0].description;
    res.locals.thumbnail = jsonRes.data.results[0].thumbnail.path + '.'+ jsonRes.data.results[0].thumbnail.extension;
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
