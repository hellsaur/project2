require('dotenv').config()
const fetch = require('node-fetch');
const md5 = require('js-md5');

//                      V req, res,next
function makeRequest(name) {
  const ts = Date.now()
  const pubKey = process.env.MARVEL_PUBLIC_KEY
  const privKey = process.env.MARVEL_PRIVATE_KEY
  const hash = md5(ts + privKey + pubKey)
                //                                              V req.body.name or something
  fetch(`http://gateway.marvel.com/v1/public/characters?name=${name}&ts=${ts}&apikey=${pubKey}&hash=${hash}`)
  .then(res => res.json())
  .then(jsonRes => {
    console.log(jsonRes);
    console.log(jsonRes.data.results);


    res.locals.name = jsonRes.data.results[0].name;
    res.locals.description = jsonRes.data.results[0].description;
    res.locals.thumbnail = jsonRes.data.results[0].path + jsonRes.data.results[0].extension;
    next();
  }).catch((error) => {
    console.log(err);
    res.locals.name = null;
    res.locals.description = null;
    res.locals.thumbnail = null;
    next();
  })
}

makeRequest('Captain America');

// makeRequest()
// .then(json => console.log(json))
// .catch(err => console.log(err))


module.exports = makeRequest;
