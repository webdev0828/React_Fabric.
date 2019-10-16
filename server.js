const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const jsonfile = require('jsonfile')
const Cryptr = require('cryptr')

const app = express()

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3002',
    credentials: true,
  }),
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/save_design', function(req, res) {
  const data = req.body.data
  const today = new Date()
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  const dateTime = date + ' ' + time

  const cryptr = new Cryptr('matdesigner')
  const filename = cryptr.encrypt(dateTime)
  jsonfile.writeFile(`./save/${filename}.json`, data, function(err) {
    if (err) console.error(err)
  })
})

app.post('/load_design', function(req, res) {
  const filename = req.body.id
  jsonfile
    .readFile(`./save/${filename}.json`)
    .then(data => {
      res.send(data)
    })
    .catch(error => console.error(error))
})

//start your server on port 3001
app.listen(3001, () => {
  console.log('Server Listening on port 3001')
})
