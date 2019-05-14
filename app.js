//imports
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const web = require('./webApp.js');
const defsettings = {addr: "127.0.0.1",port: 3000,name: "nodejsShowInstance"}

const startApp = (settings=defsettings) => {
  app.listen(settings.port,(req,res)=>{
    console.log("ExampleServer is up running and listening on: "+settings.addr+':'+settings.port);
  })
}

//add
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(web);

startApp();
