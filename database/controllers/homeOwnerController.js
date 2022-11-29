const conn = require("../index.js");
const dotenv = require("dotenv");
const owner = require("../models/homeOwnerModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendEmail,sendCode} = require("./email.js");
const {isEmailValid} = require("../../utils/emailValidator.js");

module.exports = {
   register: async (req, res, next) => {
    console.log(req.body);
    const { valid } = await isEmailValid(req.body.email);
    if (!valid) {
      return res.status(400).send({
        message: "Please enter a valid email address.",
      })}
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
                  }',phoneNumber='${req.body.phoneNumber}}', city='${req.body.city}',cin='${
                    req.body.cin
                  }',photo='${req.body.photo}',cookie='${
                    req.body.cookie
                  }',activationCode=${conn.escape(activatingCode)},cookie=0`,
                  (err, result) => {
                    if (err) {
                      return res.status(401).send(err);
                    }
                   sendCode(activatingCode, req.body.email);

                    res.json({
                      text: "welcome to our platform.. please check your email",
                    });
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
  // ownerVerify:  (req, res, next) => {
  //   if (
  //     !req.headers.authorization ||
  //     !req.headers.authorization.startsWith("Bearer") ||
  //     !req.headers.authorization.split(" ")[1]
  //   ) {
  //     return res.status(401).json({
  //       message: "please provide the token",
  //     });
  //   }
  //   const amToken = req.headers.authorization.split(" ")[1];
  //   const decoded = jwt.verify(
  //     amToken,
  //     "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  //   );
  //   console.log(decoded, "decoded password: ");
  //   conn.query(
  //     `select * from homeOwner where idhomeOwner= ? `,
  //     decoded.idhomeOwner,
  //     (error, results, fields) => {
  //       if (error) throw error;
  //       return res.send({
  //         data: {
  //           fullName: results[0].fullName,
  //           id: results[0].idhomeOwner,
  //           email: results[0].email,
  //         },
  //       });
  //     }
  //   );
  // },

  verifyCode: async (req, res) => {
    try {
   //find one Patient with his id as a filter
     db.query(`select * from homeOwner where email='${req.body.email}'`,(err,result)=>{
       if (result.length&&result[0].ValidatorCode === req.body.ValidatorCode) {
           db.query(`update homeOwner set cookie=1 where email='${req.body.email}'`,(error,result)=>{
               error ? res.status(500).send(error) : res.status(200).send("thank you for joining our app") })
              }
             else res.status(402).send("wrong code.. please re-check your email ");
            });
          } catch (error) { res.status(400).send(error);}
        },




  login: (req, res, next) => {
    conn.query(
      `SELECT * FROM homeOwner WHERE email = ${conn.escape(req.body.email)};`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            message: "email or password are invalid",
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0]["password"],
          (errB, resultB) => {
            if (resultB) {
              console.log(resultB);
              const token = jwt.sign(
                { idhomeOwner: result[0].idhomeOwner },
                "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                { expiresIn: "24h" }
              );
              res.cookie("amToken", token, {
                httpOnly: false,
                maxAge: 24 * 60 * 60 * 1000,
              });
              return res.status(200).send(token);
            }
            return res.status(401).send({
              message: "email or password are invalid",
            });
          }
        );
      }
    );
  },

  // add a refresh token to the homeOwner
  addRefreshToken: (token, email) => {
    return new Promise((resolve, reject) => {
      //    let sql = `INSERT INTO homeOwner(cookie) VALUES('${token}' WHERE email= '${email}');`;
      let sql = `UPDATE homeOwner SET cookie ='${token}' WHERE email= '${email}';`;
      conn.query(sql, (err, results) => {
        err ? reject(err) : resolve(results);
      });
    });
  },
  // get the homeOwner token
  getRefreshToken: (token) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM homeOwner WHERE cookie ='${token}';`;
      conn.query(sql, (err, results) => {
        err ? reject(err) : resolve(results);
      });
    });
  },
  // delete the refresh token
  deleteOwnerToken: (token) => {
    return new Promise((resolve, reject) => {
      let sql = `DELETE cookie FROM homeOwner WHERE cookie='${token}';`;
      conn.query(sql, (err, results) => {
        err ? reject(err) : resolve(results);
      });
    });
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
    res.clearCookie("amToken");
    return res.sendStatus(200);
  },
};
