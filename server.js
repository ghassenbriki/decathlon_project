//npm install --save express body-parser mongoose
//npm install --save-dev nodemon
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');

config = require('./config/DB');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database '+ err)}
);

const app = express();

//pour servir des fichiers statiques
app.use('/uploads', express.static('uploads'));
app.use('/uploads/media', express.static('uploads/media'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload(
  //{limits: { fileSize: 50 * 1024 * 1024 },}
)); 

app.use('/users', require('./api/routes/users'));
app.use('/events', require('./api/routes/events'));
app.use('/sports', require('./api/routes/sports'));



app.get('/', (req, res, next)=> {
  console.log('OPEN ROOT !');
  res.status(200).json({msg: 'DECHATLON_MASTER API Map'});
})

const port = 7777;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});