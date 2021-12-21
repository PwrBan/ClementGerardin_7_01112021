const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const mysql = require('mysql');
const dbKey = fs.readFileSync('./environment/private.key');
const tokenKey = fs.readFileSync('./environment/private-token.key')

const passwordValidator = require('password-validator');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: dbKey,
    database:  "groupomania"
  })

const schema = new passwordValidator();

schema
.is().min(8)
.has().uppercase(1)
.has().lowercase(1)
.has().digits(1)
.has().not().spaces();

exports.signup = (req, res, next) => {
    connection.query("SELECT COUNT(email) AS email FROM user WHERE email = ?", req.body.email, (err, result, field) => {
        if(result[0].email === 0){
            if(schema.validate(req.body.password)){
                bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const sql = "INSERT INTO user VALUES (0,?,?,?,?,?)";
                const inserts = [req.body.prenom, req.body.nom, req.body.email ,hash, false];
                const format = mysql.format(sql, inserts);
                connection.query(format);
            })
            .then(() => res.status(201).json({ message : 'Utilisateur enregistré'}))
            .catch((err) => res.status(400).json({ message : err }))
            } else {
                throw 'Mot de passe trop faible.'
            }
        } else {
            res.status(400).json({ message : "Adresse mail deja existante"})
        }
        })
        
    
}
exports.login = (req, res, next) => {
    const sql = "SELECT nom, id, prenom, email, password, isAdmin FROM user WHERE email = ? LIMIT 1";
    const inserts = [req.body.email];
    const format = mysql.format(sql, inserts);
    connection.query(format, (err, result, fields) => {
        if(result[0]){
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
                        admin: result[0].isAdmin},
                        tokenKey,
                        {expiresIn: '24h'}
                    )
                }
                res.status(200).json({ user })
            })
            .catch(err => res.status(500).json({ err }))
    } else {
        return res.status(400)
    }
})
}













