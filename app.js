const { urlencoded } = require('body-parser');
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const sendMail = require('./util/contactSMTP')

const app = express();
const log = console.log;
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req,res) => {
    res.sendFile(path.resolve('index.html'));
})

app.post('/contact', (req, res) => {
    const {name, company, email, phone, subject, message} = req.body;
    
    sendMail(name, company, email, phone, subject, message, ((err, data) => {
        if(err) {
            log('error: ', err);
            res.status(500).json({message: 'Internal Server Error'});
        } else {
            log('Message send: ', data.messageId);
            log('Preview URL: ', nodemailer.getTestMessageUrl(data));
            res.json({message: 'Email Sent!'});
        }})
    )
})

app.listen(PORT, () => log('Server is listening on port: ', PORT));