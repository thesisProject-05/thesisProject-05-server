const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  auth: {
    user: "toostit342@gmail.com",
    pass: "hpquddnbiwnxentc",
  },
});

const sendEmail = (name, email) => {
  const mailOptions = {
    from: "toostit342@gmail.com",
    to: `${email}`,
    subject: "welcome to roostIt",
    text: `Mr/Mrs ${name}, we are pleased to have you in our platform, we want to tell you,
        feel free to contact us if you encounter any issue.Yours roostIt team.`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email is sent: ${info}`);
    }
  });
};
const sendCode = (code,email) =>{
    const mailOptions = {
        from: "toostit342@gmail.com",
        to:`${email}`,
        subject: "email verification",
        text: `verification code is: ${code}, please pass it in the verification page`
    };
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`Email is sent: ${info}`)
        }
    })
};

module.exports = { sendEmail, sendCode };
