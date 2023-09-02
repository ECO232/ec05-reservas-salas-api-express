const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json)
app.use(express.urlencoded({extended: true}))

let reservas = []

app.post('/reservas',(req, res)=> {
    const newReservas = {
        id: req.body.id,
        name: req.body.name,
        nameUser: req.nameUser,
        location: req.body.location,
        hour: req.body.hour
    }
    reservas.push(newReservas)
    res.send("Tu reserva ha sido registrada")
})

app.listen(port, ()=> {
    console.log(`Servidor corriendo ${port}`);
})