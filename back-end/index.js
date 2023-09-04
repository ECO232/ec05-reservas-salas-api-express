const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let users = [];
let salas = [];

users.push({
    id: "1130613432",
    name: "Camilo",
    lastname: "Perez",
})

users.push({
    id: "1130613425",
    name: "Sofia",
    lastname: "Perez",
})


//////////////////////////////////////////////
// Lista de usuarios
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

// Buscar reservas por id del usuario
app.get('/users/:id', (req, res) => {
    const requestID = req.params.id;
    const requestUser = users.find(user => user.id === requestID);
    if (!requestUser) {
        return res.send('Usuario no encontrado');
    }
    const userReservations = salas.filter(sala => sala.usuarioId === requestID);
    res.json({ "usuario": requestUser, "salas reservadas": userReservations });
});

// Filtrar usuarios por el nombre
app.get('/users', (req, res) =>{
    if(name){
        users = users.filter((users)=>{
            return users.name == req.query.name
        })
    }
    res.send({"Usuario": users})
})

// Eliminar usuario por id
app.delete('/users/:id', (req,res) =>{
    const idUser = req.params.id;
    console.log(idUser)
    let deleteUser = users.findIndex(users=> users.id == idUser)
    let indeUserDelete= users.splice(deleteUser, 1)
    res.send("El usuario con id"+ indeUserDelete[0].id + " ha sido eliminado")
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
        schedule : req.body.schedule,
    }
    salas.push(newReserva)
    res.send("Tu solicitud ha sido registrada")
})

app.listen(port ,() => {
    console.log(`Servidor inicializado en el puerto ${port}`);
})
