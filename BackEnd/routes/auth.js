const express = require('express');
const {body, validationResult} = require("express-validator");
const helper = require("../config/helpers");
const bcrypt = require('bcrypt');
const sendmail = require("../config/email");
const router = express.Router();

/* REGISTER ROUTE */
router.post(`/register`, [
        body('email').custom(value => {
            return helper.database.table('users').filter({
                $or:
                    [
                        {email: value}
                    ]
            }).get().then(user => {
                if(user) {
                    return Promise.reject('Email already exists, choose another one.');
                }
            })
        }),
        body('username').custom(value => {
            return helper.database.table('users').filter({
                $or:
                    [
                        {username: value}
                    ]
            }).get().then(user => {
                if(user) {
                    return Promise.reject('Username already exists, choose another one.');
                }
            })
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(201).json({message: errors.array().find(value => value.msg).msg});
        } else {
            let email = req.body.email;
            let username = (req.body.username).toLowerCase();
            let password = await bcrypt.hash(req.body.password, 10);
            let fname = req.body.fname;
            let lname = req.body.lname;
            let age = req.body.age;

            helper.database.table('users').insert({
                username: username,
                password: password,
                email: email,
                role: 'user',
                fname: fname || null,
                lname: lname || null,
                age: age
            }).then(lastId => {
                if (lastId.insertId > 0) {
                    sendmail.Email(email);
                    res.status(201).json({message: 'Registration successful.'});
                } else {
                    res.status(501).json({message: 'Registration failed.'});
                }
            }).catch(err => res.status(433).json({error: err.msg}));
        }
    });

/* LOGIN ROUTE */


module.exports = router;
