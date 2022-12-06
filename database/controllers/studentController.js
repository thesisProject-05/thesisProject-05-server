const students = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../index.js");
const { sendEmail, sendCode } = require("./email.js");
const { isEmailValid } = require("../../utils/emailValidator.js");
module.exports = {
  register: async (req, res, next) => {
    console.log(req.body);
    const { valid } = await isEmailValid(req.body.email);


    if (!valid) {
      console.log(valid,'<===valid'); 
      return res.status(400).send({
        message: "Please enter a valid email address.",
      })
      
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
        db.query(
          `SELECT * FROM students WHERE LOWER(email) = LOWER(${db.escape(
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
                  db.query(
                    ` INSERT INTO students SET fullName='${
                      req.body.fullName
                    }',email=${db.escape(req.body.email)},password=${db.escape(
                      hash
                    )},dateOfBirth='${req.body.dateOfBirth}',phoneNumber=${
                      req.body.phoneNumber
                    },lookingFor='${req.body.lookingFor}',gender='${
                      req.body.gender
                    }',city='${req.body.city}',cin='${req.body.cin}',photo='${
                      req.body.photo
                    }',maxBudget='${
                      req.body.maxBudget
                    }',activationCode=${db.escape(activatingCode)},cookie=0`,
                    (err, result) => {
                      if (err) {
                        return res.send(err);
                      }
                     else{ sendCode( activatingCode, req.body.email);


                      res.json(result);}

                    }
                  );
                }
              });
            }
          }
        );
      } catch (error) {
        console.log(error.message);
        res.send("you have an error");
      }
  },
  // verifyCode: async (req, res) => {
  //   console.log(req.body, req.params,"hhhh");
  //   try {
  // console.log("try");
  //    db.query(`select * from students where email='${req.params.email}'`,
  //    (err,result)=>{
  //     const token = jwt.sign(
  //       { idstudents: result[0].idstudents },
  //       process.env.ACCESS_TOKEN_SECRET,
  //       { expiresIn: "24h" }
  //     );
  //      if (
  //       result.length &&
  //        result[0].activationCode === req.body.activationCode) {
  //       console.log('hhhh')
  //          db.query(`update students set cookie=1 where email='${req.params.email}'`,
  //          (error,result)=>{
  //              error ? res.send(error) : res.status(200).send(result.message) })
  //             }
  //            else res.send(err.message);
  //           });
  //         } catch (error) { res.send(error);} 
  //       
  verifyCode: async (req, res) => {
    try {

      db.query(
        `select * from students where email='${req.body.email}'`,
        (err, result) => {
          const token = jwt.sign(
            { idstudents: result[0].idstudents },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
          );
          if (
            result.length &&
            result[0].activationCode === req.body.activationCode
          ) {
            db.query(
              `update students set cookie=1 where email='${req.body.email}'`,
              (errr, result1) => {
                errr
                  ? res.status(500).send(errr)
                  : res
                      .status(200)
                      .cookie("thetoken", token, {
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
      res.status(400).send(error);
    }
  },

  login: (req, res, next) => {
    db.query(
      `SELECT * FROM students WHERE email = ${db.escape(req.body.email)}`,

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
                  { idstudents: result[0].idstudents },
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
      "SELECT * FROM students where idstudents=?",
      decoded.idstudents,
      function (error, results) {
        if (error) throw error;
        return res.send({
          fullName: results[0].fullName,
          id: results[0].idstudents,
          email: results[0].email,
        });

      }
    );
  },

  getAll: (req, res) => {
    students.getAll((error, results) => {
      error ? res.status(500).send(error) : res.status(200).json(results);
    });
  },
  getAllByResidence: (req, res) => {
    students.getAllByResidence(req.params.id, (error, results) => {
      error ? res.status(500).send(err) : res.status(200).json(results);
    });
  },
  getAllByUniversity: (req, res) => {
    students.getAllByResidence(req.params.id, (error, results) => {
      error ? res.status(500).send(err) : res.status(200).json(results);
    });
  },
  getAllByHomeOwner: (req, res) => {
    students.getAllByResidence(req.params.id, (error, results) => {
      error ? res.status(500).send(err) : res.status(200).json(results);
    });
  },
  getAllByHouse: (req, res) => {
    students.getAllByResidence(req.params.id, (error, results) => {
      error ? res.status(500).send(err) : res.status(200).json(results);
    });
  },
  getStudentById: (req, res) => {
    students.getStudentById(req.params.id, (error, results) => {
      error ? res.status(500).send(err) : res.status(200).json(results);
    });
  },
  deleteStudent: (req, res) => {
    students.deleteStudent(req.params.id, (error, results) => {
      error ? res.status(500).send(err) : res.status(200).json(results);
    });
  },
  updateStudent: (req, res) => {
    students.updateStudent(req.body, req.params.id, (error, results) => {
      error ? res.status(500).send(error) : res.status(200).json(results);
    });
  },
  logout: (req, res) => {
    res.clearCookie("thetoken");
    return res.sendStatus(200);
  }

};
