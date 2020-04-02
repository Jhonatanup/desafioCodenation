const express = require('express')
const app = require('./app') 
const server = express()

server.get('/', async function (req, res) {
   const response = await app.getData()
   console.log(response)
   res.send(response)
})

server.listen(3000)