const express = require('express')
const app = express()
app.use(express.json());

var port = process.env.PORT || 8000;
//settings 
app.get('/', function(req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});
app.use(require("./Routes/empleoyes"))

app.listen(port);
console.log(port)