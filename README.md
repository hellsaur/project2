#project-1

*** Marco Acosta / 10/06/2017 ***

WHERE WAS HE LAST?

what is 'WHERE WAS HE LAST'?

this app is about where to find the last location of your favorite super hero.

## Wireframe
https://drive.google.com/open?id=0B6TZXvKSDHTWZnhJVnhEM0l5bG8
1. overtime i changed the way my Wireframe was from day one. 
## Initial thoughts on game structure

My idea is to use a superhero api so i can have all superheroes there are and make an edit in one of my views where the user can find a super hero and type in the last location he/she saw that particular superhero last. Also add a list of superheroes that people have sighted with a location button where the user can input the location where they saw that particular superhero.


## Phases of Completion


 ### day 1: pseudocode + api functionality.
  1. getting API to work was probably the hardest thing in this project for me. It took me 1 day to figure out.

 day 2: folders setup

 day 3: routes + controllers:

 day 4:views

 day 5: debugs

## Links and Resources
### hero api from marvel:
https://developer.marvel.com/documentation/authorization

## User Story

1. fork repository from github.
2. clone repository.
3. in terminal clone the repository link to access the files.
4. npm install .
5. write [ npm run dev ] in the terminal.
6. open your browser and write : localhost:3000
7. enjoy.


## development of game in the future.

I will add more features to this app such as a google api of the actual location in the world where the superhero was last sighted.
Also i would like to add more api regarding the comics and issue of the superhero.

## technologies used:

1. MARVEl API key (hardmode):
this api was hard to use because it required me to get a public key, private key, time stamp and a "hash" which is the combination of the private key and public key along with the time stamp. Then i had to install a module "js-md5"
and with the help of J. Masters i was able to find a hash converter which allowed me to create a brand new code with the combination of each.


## proud of snippet:
```
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
```
