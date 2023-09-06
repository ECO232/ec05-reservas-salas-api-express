const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let schedules = require('./src/components/salas/classroom.json');
let salas = require('./src/components/schedule.json');
let users = [];

// ingresar contenido al json

// schedules.data.push({
//     id: "1130613432",
//     schedule: "camilo",
// })

// schedules.data.push({
//     id: "1130613425",
//     schedule: "sofia",
// })

// schedules.data.push({
//     id: "1130613436",
//     schedule: "alex",
// })

// schedules.data.push({
//     id: "1130613440",
//     schedule: "isabella",
// })


//////////////////////////////////////////////
// lista de usuarios registrados
app.get('/users', (req,res)=>{
    res.send({"Usuarios registrados": users})
})

// Registro de usuarios
app.post('/users',(req, res)=>{
    const newUser = {
        id: req.body.id,
        name: req.body.name,
        lastname: req.body.lastname,
    }
    users.push(newUser)
    res.send("¡Te has registrado correctamente!")
})


//////////////////////////////////////////////
// Lista de horarios
app.get('/schedules', (req,res)=>{
    res.send({"Horarios disponibles": schedules})
})

// Registro de horarios
app.post('/schedules',(req, res)=>{
    const newUser = {
        id: req.body.id,
        schedule: req.body.name,
    }
    schedules.push(newUser)
    res.send("¡Te reserva ha sido registrada correctamente!")
})

// Buscar reservas por id del usuario
app.get('/schedules/:id', (req, res) => {
    const requestID = req.params.id;
    const requestUser = schedules.find(user => user.id === requestID);
    if (!requestUser) {
        return res.send('Reserva no encontrado');
    }
    const userReservations = salas.filter(sala => sala.usuarioId === requestID);
    res.json({ "usuario": requestUser, "salas reservadas": userReservations });
});

// Filtrar usuarios por el nombre
app.get('/schedules', (req, res) => {
    let usersFilter = [...schedules];

    if (req.query.name) {
        scheduleFilter = schedulesFilter.filter((user) => schedules.name === req.query.name);
    }
    res.send({ "horarios disponibles": usersFilter });
});


/////////////////////////////////////////////////////////////////
// Eliminar contenido del arreglo correspondiente
app.delete('/salas/:id', (req,res) =>{
    const idUser = req.params.id;
    console.log(idUser)
    let deleteUser = schedules.findIndex(schedules=> schedules.id == idUser)
    let indeUserDelete= schedules.splice(deleteUser, 1)
    res.send("La reserva con id "+ indeUserDelete[0].id + " ha sido eliminado")
})


/////////////////////////////////////////////////////////////////
// Salas disponibles
app.get('/salas', (req, res)=>{
    res.send({"Salas disponibles": salas})
})

// Registrar una reserva
app.post('/salas', (req, res)=>{
    const newReserva = {
        classroom: req.body.classroom,
        location: req.body.location,
        schedule : [req.body.schedule],
    }
    salas.push(newReserva)
    res.send("Tu solicitud ha sido registrada")
})

app.listen(port ,() => {
    console.log(`Servidor inicializado en el puerto ${port}`);
})
