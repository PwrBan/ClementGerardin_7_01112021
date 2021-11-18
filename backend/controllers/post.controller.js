const jwt = require('jsonwebtoken')
const fs = require('fs');
const mysql = require('mysql');
const key = fs.readFileSync('./environment/private.key');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: key,
    database:  "groupomania"
  })

exports.createPost = (req, res, next ) => {
    console.log(req.body);
    const sql = "INSERT INTO post VALUES (0,?,?,?,?,?)";
    const inserts = [req.body.userId, req.body.message, new Date, req.body.prenom,req.body.nom];
    const format = mysql.format(sql, inserts);
    connection.query(format, (err, result, fields) => {
        if(err) res.status(400).json({ message : err });
        res.status(201).json({ message : "Message posté"})
    });
}
exports.findAllPosts = (req, res, next) => {
    connection.query('SELECT * FROM post', (err, result, field) => {
        if(err) res.status(400).json({ err });
        res.status(200).json({ result })
    })
}
