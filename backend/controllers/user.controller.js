const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const mysql = require('mysql');
const key = fs.readFileSync('./environment/private.key');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: key,
    database:  "groupomania"
  })
exports.signup = (req, res, next) => {
    console.log();
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const sql = "INSERT INTO user VALUES (0,?,?,?,?)";
        const inserts = [req.body.prenom, req.body.nom, req.body.email ,hash ];
        const format = mysql.format(sql, inserts);
        connection.query(format);
    })
    .then(() => res.status(201).json({ message : 'Utilisateur enregistré'}))
    .catch((err) => res.status(400).json({ message : err }))
}
exports.login = (req, res, next) => {
    const sql = "SELECT nom, id, prenom, email, password FROM user WHERE email = ? LIMIT 1";
    const inserts = [req.body.email];
    const format = mysql.format(sql, inserts);
    connection.query(format, (err, result, fields) => {
        bcrypt.compare(req.body.password, result[0].password)
            .then( valid => {
                if(!valid) {
                return  res.status(400).json({message: "Email ou mot de passe incorrect"}); 
            }
                const user = {
                    prenom: result[0].prenom,
                    nom: result[0].nom,
                    email: result[0].email,
                    userId: result[0].id,
                    token: jwt.sign(
                        { userId: result[0].id,
                         isAdmin: false },
                        'SECRET_KEY',
                        {expiresIn: '24'}
                    )
                }
                res.status(200).json({ user })
            })
            .catch(err => res.status(500).json({ err }))
    })
}













