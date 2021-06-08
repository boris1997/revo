const express = require('express');
require('dotenv/config');

console.log(process.env.API_PASSWORD)
console.log(process.env.API_MAIL)
console.log('ok11')
/* const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer'); */

const app = express();

const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5000;

// Middleware 

app.use(express.static('dist'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.post('/', (req, res) => {
    console.log(req.body)
    const output = `
    <p>Заявка на оказание услу в салоне красоты Юлия</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>Спасибо</p>
  `;
    const transporter = nodemailer.createTransport(
        {
            /*  host: 'smtp.mail.ru',
             port: 465,
             secure: true, */
            // tls: true,
            // requireTLS: true,
            /* host: 'smtp.mail.ru',
            port: 486,
            secure: true, */
            service: 'Yandex',
            /* port: 465,
            secure: true, */ // true for 465, false for other ports
            /*      logger: true,
                 debug: true,
                 secureConnection: false, */

            auth: {
                user: process.env.API_MAIL,
                pass: process.env.API_PASSWORD
            }
        }
    )

    const mailOptions = {
        from: process.env.API_MAIL,
        to: process.env.API_MAIL,
        subject: `Салон красоты Юлия сообщение от ${req.body.phone}`,
        text: `${req.body.name}, ${req.body.amount}`,
        html: output
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error')
        } else {
            console.log('email sent ' + info.response)
            res.send('success')
        }
    })
})


app.listen(PORT, () => {
    console.log('Server started...')
});

