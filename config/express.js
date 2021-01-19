const express = require('express');
const bodyParser = require('body-parser');

const connStr = "Server=localhost;Database=NODE_SQLSERVER;User Id=super;Password=super;";
const sql = require("mssql");
const config = require('config');
const cors = require('cors')

sql.connect(connStr)
   .catch(err => console.log("erro! " + err));

module.exports = () => {
  const app = express();
  
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.set('port', process.env.PORT || config.get('server.port'));

  require('../api/routes/city')(app);
  return app;
};