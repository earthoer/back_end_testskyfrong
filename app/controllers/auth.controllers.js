const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const UserData = db.userdata;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      role:"admin"
    })
    .then(user => {
      res.send({
        message: "User registered successfully",
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({
        id: user.id
      }, config.secret, {
        expiresIn: 86400*30 // 24 hours
      });

      User.findOne({
        where: {
          username: req.body.username
        }
      })
      .then(userdata => {
        // console.log(userdata);
        if (userdata) {
          res.status(200).send({
            username: user.username,
            roles: "Admin",
            accessToken: token
          });
        }

      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.checkToken = (req, res) => {
  User.findOne({
      where: {
        ID: req.userId
      }
    })
    .then(user => {
      if (user) {
        return res.status(200).send({
          user
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};