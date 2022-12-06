const students = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../index");
const { sendEmail, sendCode } = require("./email.js");
const { isEmailValid } = require("../../utils/emailValidator.js");
module.exports = {
  register: async (req, res, next) => {
    // console.log(res);
    // console.log(req.body);
    const { valid } = await isEmailValid(req.body.email);
    
    
    if (!valid) {
     console.log(valid,'valid'); 
      return res.status(400).send({
        message: "Please enter a valid email address.",
      })
      
    } else {
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
                .send({ msg: "This student user is already in use!" });
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
                    }',rentePeriode='${
                      req.body.rentePeriode
                    }',maxBudget='${
                      req.body.maxBudget
                    }',activationCode=${db.escape(activatingCode)},cookie=0`,
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
        // console.log(error.message);
        res.status(402).send("you have an error");
      }
    }
  },
  verifyCode: async (req, res) => {
    try {
   //find one Patient with his id as a filter
  
     db.query(`select * from students where email='${req.body.email}'`,(err,result)=>{
       if (result.length && result[0].activationCode === req.body.activationCode) {
           db.query(`update students set cookie=1 where email='${req.body.email}'`,(error,result)=>{
               error ? res.status(500).send(error) : res.status(200).send(result.message) })
              }
             else res.send(result.message);
            });
          } catch (error) { res.status(404).send(error);} 
        },


  login: (req, res, next) => {
    db.query(
      `SELECT * FROM STUDENTS WHERE email = ${db.escape(req.body.email)}`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        }
        // console.log(result);
        if (!result.length) {
          return res.status(401).send({
            message:
              "invalid credentials please check your email or your password",
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0]["password"],
          console.log(result),
          (errB, resultB) => {
            if (resultB) {
              console.log(resultB);
              const token = jwt.sign(
                { idstudents: result[0].idstudents },
                "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                { expiresIn: "24h" }
              );
              res.cookie("amToken", token, {
                httpOnly: false,
                maxAge: 24 * 60 * 60 * 1000,
              });
              return res.status(200).send(token);
            }
            return res.status(401).send(errB.message);
          }
        );
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
};
