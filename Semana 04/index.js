const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const nodemailer = require('nodemailer')

const app = express()
const porta = 443

app.use(session({secret: '1234567890'}))
app.use(bodyParser.urlencoded({ extended : true }))

var login = 'admin'
var senha = '1234'

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './'))

app.get('/', (req, res) => {
  if (req.session.login) {
    res.render('logado')
    console.log('Usuário logado: ' + req.session.login)
  } else {
    res.render('home')
  }
})

app.post('/', (req, res) => {
  if (req.body.password == senha && req.body.login == login) {
    req.session.login = login
    res.render('logado')
  } else {
    res.render('home')
  }
})

app.get('/email', (req, res) => {
  if (req.url === '/email') {
    res.render('email')
    } else {
    res.render('home')
    }
})

app.post('/sendemail', async (req, res) => {
 var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "",
    pass: ""
  }
});
  /*
  var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "",
    pass: ""
  }
});
*/
var message = {
  from: "danielcupertino@server.com",
  to: "mariohenrique@sender.com",
  subject: "Atividade Semana #04",
  text: "Atividade da Semana 04",
  html: "<p>Atividade da Semana 04</p>"
};

transport.sendMail(message, function(err) {
  if (err) {
    return res.status(400).json({
      erro: true,
      mensagem: 'Erro: e-mail não enviado!'
    })
  }
    else {
    return res.json({
      erro: false,
      mensagem: 'E-mail enviado com sucesso!'
    })
    }
})  
})

app.listen(porta, () => console.log('Servidor rodando!'))
