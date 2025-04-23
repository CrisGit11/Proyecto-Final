//Rutas

const router = require("express").Router();

//endpoint
router.get("/list", (req, res)=>{
    res.json("Todo correcto");
});
router.post("/register", (req, res)=>{});

module.exports = router; //Exportamos el paquete de rutas de los usuarios