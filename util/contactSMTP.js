const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.SECRET
    },
    tls: {
        rejectUnathorized: false
    }
})

sendMail = (name, company, email, phone, subject, message, cb) => {

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${name}</li>
      <li>Company: ${company}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${phone}</li>
    </ul>
    <h3>Message</h3>
    <p>Subject: ${subject}</p>
    <p>${message}</p>
  `;

    let mailOptions = {
        from: `Nodemailer Contact ${email}`,
        to: process.env.USER,
        subject: subject,
        text: message, 
        html: output
    }

    transporter.sendMail(mailOptions, (error, data) => {
        if(error) {
            cb(error, null)
        } else {
            cb(null, data)
        }
        
    })
}

module.exports = sendMail;