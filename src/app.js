const { urlencoded } = require('body-parser');
const express = require('express');
const sendMail = require('./util/mail')
const app = express();
const log = console.log;
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static('src/public'));


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
})

app.post('/email', (req, res) => {
    const {fname, lname, from, tel, subject, message} = req.body
    sendMail(fname, lname, from, tel, subject, message, ((err, data) => {
        if(err) {
            res.status(500).json({message: 'Internal Error'})
        } else {
            res.json({message: 'Email sent!'});
        }
    }))
})

app.listen(PORT, () => {
    log('Server is listening on port: ', PORT)
})