//const { query } = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

//signup
router.post('/signup', (req, res) =>{
    let user = req.body;
    query = "select fname,lname,email,mnumber,password from users where email=?"
    connection.query(query, [user.email], (err, results) =>{
        if(!err){
            if(results.length <= 0){
                query2 = "insert into users(fname,lname,email,mnumber,password) values(?,?,?,?,?)"
                connection.query(query2, [user.fname,user.lname,user.email,user.mnumber,user.password], (err) => {
                    if(!err){
                        return res.status(200).json({message : "Successfully insterted values"})
                    }
                    else{
                        return res.status(500).json(err);
                    }
                });
            }
            else{
                return res.status(400).json({message: "Email already exists!"});
            }
        }
        else{
            return res.status(500).json(err);
        }
    });
});

//not required
// router.get("/:universalURL", (req, res) => {
//     res.send("404 URL NOT FOUND");
// });

//login
router.post('/login',(req, res) => {
    const user = req.body;
    lquery = "select fname, lname, email, mnumber, password from users where email=?";
    connection.query(lquery, [user.email], (err, results) => {
        if(!err){
            if(results.length <= 0 || results[0].password != user.password){
                return res.status(401).json({message:"Incorrect Email or password"});
            }
            else if(results[0].password == user.password){
                const response = { email : results[0].email}
                const accessToken = jwt.sign(response, process.env.token, {expiresIn: '1h'})
                res.status(200).json({ token: accessToken });
            }
            else{
                return res.status(400).json({message: "Something went wrong. Please try again later."});
            }
        }
        
        else{
            return res.status(500).json(err);
        }
    })
});


module.exports = router;
