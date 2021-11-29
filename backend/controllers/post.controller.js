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

    exports.create = (req, res, next ) => {
        console.log(req.body);
    var filePath;
    if (!req.file) {
        filePath = null;
    } else {
        filePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const post = JSON.parse(req.body.post);
    const sql = "INSERT INTO post VALUES (0,?,?,?,?,?,?)";
    const inserts = [post.user_id, post.message, new Date, post.prenom, post.nom, filePath];
    const format = mysql.format(sql, inserts);
    console.log(format);
    connection.query(format, (err, result, fields) => {
        if(err) res.status(400).json({ message : err });
        res.status(201).json({ message : "Message posté"})
        }
    );
    }
    
    exports.delete = (req, res, next) => {
        const sql = 'DELETE FROM post WHERE id = ?';
        const format = mysql.format(sql, req.params.id);
        connection.query(format, (err, result, field) => {
            if(err) res.status(400).json({ message : err});
            res.status(200).json({ message : "post supprimé"});
        })
    }

    exports.createComments = (req, res, next) => {
        const sql = "INSERT INTO comments VALUES (0,?,?,?,?)";
        const inserts = [req.body.userId, req.body.comment, new Date, req.body.postId];
        const format = mysql.format(sql, inserts);
        connection.query(format, (err, result, field) => {
            if(err) res.status(400).json({ message : err });
            res.status(201).json({ message : "Commentaires posté"})
        })
    }
    exports.findById = (req, res, next) => {
    const inserts = req.params.id
    const sql = "SELECT * FROM post WHERE id = ? LIMIT 1"
    const format = mysql.format(sql, inserts);
    connection.query(format, (err, result, fields) => {
        if(err) res.status(400).json({ err });
        res.status(200).json({ result })
    })
}
    exports.findAll = (req, res, next) => {
    connection.query('SELECT * FROM post', (err, result, field) => {
        if(err) res.status(400).json({ err });
        res.status(200).json({ result })
    })
}
    exports.findAllComments = (req,res, next) => {
        const sql = 'SELECT userId, comment, date, user.nom, user.prenom  FROM comments INNER JOIN post ON comments.postId = post.id INNER JOIN user ON comments.userId = user.id WHERE post.id = ?';
        const insert = req.params.id;
        const format = mysql.format(sql, insert);
        connection.query(format, (err, result, field) => {
            if(err) res.status(400).json({ err });
            res.status(200).json({ result })
        })

    }

    exports.like = (req, res, next) => {
        const selectSql =  'SELECT userId FROM liked WHERE postId = ?';
        const format = mysql.format(selectSql, req.params.id);
        connection.query(format, (err, result, field) => {
            console.log(JSON.stringify(result));
            console.log(req.body[0].userId);
            if(result !== req.body[0].userId) { 
                const insertSql = 'INSERT INTO liked VALUES (0, ?, ?)';
                const inserts = [req.body[0].userId, req.body[0].postId];
                const insertFormat = mysql.format(insertSql, inserts);
                connection.query(insertFormat, (err, result, field) => {
                    if(err) res.status(400).json({ err })
                    res.status(200).json({ message: 'post like'})
            })

            } else {
            
            }
        })
    }