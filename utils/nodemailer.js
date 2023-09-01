const nodemailer = require("nodemailer");
const ErrorHandler = require("../utils/errorHandler");

exports.sendMail = async (req, res, next, url) => {
  const tranporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    post: 465,
    auth: {
      user: process.env.MAIL_EMAIL_ADDRESS,
      pass: process.env.MAIL_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "dangi pvt. ltd. <hdangi224@gmail.com>",
    to: req.body.email,
    subject: "Reset Password",
    // text: `Click on this link to reset your password`,
    html: `<h1>Click on this link to reset your password</h1>
            <a href = "${url}">Password resete link</a>`,
  };

  tranporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return next(new ErrorHandler(err, 500));
    }

    console.log(info);

    return res.status(200).json({
      success: true,
      message: `Email sent to ${req.body.email}`,
      url,
    });
  });
};
