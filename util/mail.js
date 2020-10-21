const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config()

const auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
    }
}

const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (firstName, lastName, from, tel, subject, message, cb) => {
    const mailOptions = {
        fname: firstName,
        lname: lastName,
        from: from,
        tel: tel,
        subject: subject,
        text: message,
        to: process.env.SEND_TO,
        cc: from
    }
    
    transporter.sendMail(mailOptions, ((err, data) => {
        if(err) {
            cb(err, null)
        } else {
            cb(null, data)
        }
    }))
}

module.exports = sendMail;