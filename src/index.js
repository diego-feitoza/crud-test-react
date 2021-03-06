const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

require('./app/controllers/index')(app)

//req => requisição
//res => resposta para enviar
app.get('/', (req, res) => {
  res.send('OK')
})

let port = process.env.PORT || 5050
app.listen(port)