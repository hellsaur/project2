const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pgp = require('pg-promise');
const fetch = require('node-fetch');
const md5 = require('js-md5');
require('dotenv').config()


const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Listening to port ${PORT}`);
});

app.use(logger('dev'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
  res.render('index')
})

const superheroRoutes = require('./routes/sh-routes');
app.use('/superhero',superheroRoutes);

app.use('*', (req, res)=> {
   res.status(404).send('404 Not Found')
});
