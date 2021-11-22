const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const key = fs.readFileSync('./environment/private.key');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: key,
    database:  "groupomania"
  })
connection.connect(function(err) {
  if(err) throw err;
  console.log("Connecté à la base de données");
})

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, './images')));

app.use('/api/auth', userRoutes);
app.use('/api/view', postRoutes);
  
module.exports = app;






