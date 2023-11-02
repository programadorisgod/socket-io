import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'


/** Creamos nuestra app, que se encargará, de las rutas, de que funcione basicamente nuestra app */
const app = express()

/** Le damos los poderes de htpp */
const server = createServer(app)

/**Ahora a esa app que tiene todas las caracteristicas de htpp, le damos los poderes de los web sockets. */
const io = new Server(server)

const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

/** Escuchamos la connection del cliente  */
io.on('connection', (socket) => {
  const clientAddress = socket.handshake.address
  console.log('a user connected address:', clientAddress)

  /** Escuchamos el evento, en este caso chat message, pero puede ser el que tu decidas y creas que queda mejor */
  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

/**Colocamos a escuchar a nuestro servidor  */
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
