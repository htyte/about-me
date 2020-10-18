const { urlencoded } = require('body-parser');
const express = require('express');

const app = express();
const log = console.log;
const PORT = 3000;
const path = require('path');

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.post('/email', (req, res) => {
    // TODO: send email here
    console.log('Data:', req.body)
    res.json({message: 'Message received'})
})

app.listen(PORT, () => {
    log('Server is listening on port: ', PORT)
})