//Enrutador principal del servidor

const router = require("express").Router();

//Declaramos todas las direcciones raices que tendra nuestra API
router.use("/routine", require("./api/routine.route"));
router.use("/users", require("./api/users.route"));

module.exports = router; //Lo exportamos para poder usarlo en el index