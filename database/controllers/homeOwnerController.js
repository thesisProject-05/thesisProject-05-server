const conn = require("../index.js");
const dotenv = require("dotenv");
const owner = require("../models/homeOwnerModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail, sendCode } = require("./email.js");
const { isEmailValid } = require("../../utils/emailValidator.js");

module.exports = {
  register: async (req, res, next) => {
    console.log(req.body);
    const { valid } = await isEmailValid(req.body.email);
    // console.log(res,'theres');
    if (!valid) {
      console.log(valid, "<===valid");
      return res.status(400).send({
        message: "Please enter a valid email address.",
      });
    }
    try {
      //generating the activation code
      const characters =
        "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let activatingCode = "";
      for (let i = 0; i <= 6; i++) {
        activatingCode +=
          characters[Math.floor(Math.random() * characters.length)];
      }
      // the homeOwner creation
      conn.query(
        `SELECT * FROM homeOwner WHERE LOWER(email) = LOWER(${conn.escape(
          req.body.email
        )});`,
        (err, result) => {
          if (result.length) {
            return res
              .status(409)
              .send({ msg: "This user is already in use!" });
          } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).send({
                  msg: err,
                });
              } else {
                conn.query(
                  `INSERT INTO homeOwner SET fullName='${
                    req.body.fullName
                  }', email=${conn.escape(
                    req.body.email
                  )},password=${conn.escape(hash)}, dateOfBirth='${
                    req.body.dateOfBirth
                  }',phoneNumber='${req.body.phoneNumber}}', city='${
                    req.body.city
                  }',cin='${req.body.cin}',photo='${
                    req.body.photo
                  }',activationCode=${conn.escape(activatingCode)},cookie=0`,
                  (err, result) => {
                    if (err) {
                      return res.status(401).send(err);
                    }
                    sendCode(activatingCode, req.body.email);

                    res.json(result);
                  }
                );
              }
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(401).send("you have an error");
    }
  },

  verifyCode: async (req, res) => {
    try {
      console.log(req.body)
      db.query(
        `select * from homeOwner where email='${req.body.email}'`,
        (err, result) => {
          const token = jwt.sign(
            { idhomeOwner: result[0].idhomeOwner },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
          );
          if (
            result.length &&
            result[0].activationCode === req.body.activationCode
          ) {
            db.query(
              `update homeOwner set cookie=1 where email='${req.body.email}'`,
              (errr, result1) => {
                errr
                  ? res.status(500).send(errr)
                  : res.status(200).cookie("thetoken", token, {
                      httpOnly: false,
                      maxAge: 24 * 60 * 60 * 1000,
                    });
                return res.status(200).send(token);
              }
            );
          } else res.status(402).send("incorrect Code");
        }
      );
    } catch (error) {
      res.send(error.message);
    }
  },

  login: (req, res, next) => {

    conn.query(
      `SELECT * FROM homeOwner WHERE email = ${conn.escape(req.body.email)}`,
      (err, result) => {
        // user does not exists
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        } else if (!result.length) {
          return res.status(401).send({
            msg: "Email or password is incorrect!",
          });
        } else if (result[0].cookie === 0) {
          res.status(402).send("please activate your account");
        }

        // check password
        else {
          bcrypt.compare(
            req.body.password,
            result[0]["password"],
            (bErr, bResult) => {
              // wrong password
              if (bErr) {
                return res.status(401).send({
                  msg: "Email or password is incorrect!",
                });
              }
              if (bResult) {
                const token = jwt.sign(
                  { idhomeOwner: result[0].idhomeOwner },
                   process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "24h" }
                );
                res
                  .status(200)
                  .cookie("thetoken", token, {
                    httpOnly: false,
                    maxAge: 24 * 60 * 60 * 1000,
                  });
                return res.status(200).send(token);
              }
              return res.status(401).send({
                msg: "Username or password is incorrect!",
              });
            }
          ); 
        }
      }
    );
  },
  getUser: (req, res, next) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    }
    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, process.env.ACCESS_TOKEN_SECRET);
    db.query(
      "SELECT * FROM homeOwner where idhomeOwner=?",
      decoded.idhomeOwner,
      function (error, results) {
        if (error) throw error;
        return res.send({
          fullName: results[0].fullName,
          id: results[0].idhomeOwner,
          email: results[0].email,
        });
      }
    );
  },



  getOneOwnerByPhoneNumber: (req, res) => {
    owner.getOneOwnerByPhoneNumber(
      (err, results) => {
        err ? res.send(err.message) : res.json(results);
      },
      [req.body.phoneNumber]
    );
  },

  getOwnerByEmail: (req, res) => {
    owner.getOwnerByEmail((err, results) => {
      err ? res.status(509).send(err) : res.status(201).json(results);
    }, req.body);
  },
  getHomeOwnerById: (req, res) => {
    owner.getHomeOwnerById((err, results) => {
      err ? res.send(err.message) : res.json(results);
    }, req.params.id);
  },

  getOwnerByCity: (req, res) => {
    owner.getOwnerByCity(
      (err, results) => {
        err ? res.send(err.message) : res.json(results);
      },
      [req.body.city]
    );
  },

  getAllOwners: (req, res) => {
    owner.getAllOwners((err, results) => {
      err ? res.status(500).send(err.message) : res.status(200).json(results);
    });
  },

  deleteHomeOwner: (req, res) => {
    owner.deleteHomeOwner((err, results) => {
      err ? res.json(err.message) : res.json("homeOwner deleted");
    }, req.params.id);
  },

  logout: (req, res) => {
    res.clearCookie("thetoken");
    return res.sendStatus(200);
  },
};
