require("dotenv").config();
const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../database/index");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const emailValidator = require("deep-email-validator");
async function isEmailValid(email) {
  return emailValidator.validate(email);
}
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "snaporder.p@gmail.com",
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
});
const send = (text, email, subject) => {
  transporter.sendMail(
    {
      from: "snaporder.p@gmail.com",
      to: `${email}`,
      subject: `${subject}`,
      html: `${text}`,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
module.exports = {
  register: async (req, res, next) => {
    const { valid } = await isEmailValid(req.body.email);
    if (!valid) {
      return res.status(400).send({
        message: "Please provide a valid email address.",
      });
    }
    try {
      //generating the activation code
      const characters =
        "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let activationCode = "";
      for (let i = 0; i <= 6; i++) {
        activationCode +=
          characters[Math.floor(Math.random() * characters.length)];
      }
      // creating the Resto account
      db.query(
        `SELECT * FROM manger WHERE LOWER(email) = LOWER(${db.escape(
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
                // has hashed pw => add to database
                db.query(
                  `INSERT INTO manger set restoname='${
                    req.body.restoname
                  }', email= ${db.escape(req.body.email)}, password=${db.escape(
                    hash
                  )},ValidatorCode=${db.escape(activationCode)},activated=0`,
                  (err, result) => {
                    if (err) {
                      return res.status(400).send(err);
                    }
                    send(
                      `<h1> Confirmation of your Registration </h1>
        <h2> Welcome To SnapOrder App </h2>
        <p>  Please enter the code below to activate your account: </p>
        <a>Your Secret code is: "${activationCode}"</a>`,
                      req.body.email,
                      "activation code"
                    );
                    return res.status(201).send({
                      msg: "The user has been registerd with us!",
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
      res.status(400).send("you have error");
    }
  },

  verifyCode: async (req, res) => {
    try {
      //find one Patient with his id as a filter
      db.query(
        `select * from manger where email='${req.body.email}'`,
        (err, result) => {
          const token = jwt.sign(
            { idmanger: result[0].idmanger },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
          );
          if (
            result.length &&
            result[0].ValidatorCode === req.body.ValidatorCode
          ) {
            db.query(
              `update manger set activated=1 where email='${req.body.email}'`,
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
      `SELECT * FROM students WHERE email = ${db.escape(
        req.body.email
      )}`,
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
      "SELECT * FROM manger where idmanger=?",
      decoded.idmanger,
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          restoname: results[0].restoname,
          id: results[0].idmanger,
          email: results[0].email,
        });
      }
    );
  },
  logout: (req, res) => {
    res.clearCookie("thetoken");
    return res.sendStatus(200);
  },
  modifieP: (req, res) => {
    try {
      var pas;
      const hashed = bcrypt.hashSync(req.body.password, 10, (err, hash) => {
        console.log(err);
        err ? res.status(500).send({ msg: err }) : hash;
      });
      sql = `update manger set password="${hashed}" where iduser=${req.body.id}`;
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          return res.status(200).json(result);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error" });
    }
  },
};
