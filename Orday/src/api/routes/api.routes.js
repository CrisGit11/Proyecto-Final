//Enrutador principal del servidor

const router = require("express").Router();

router.use("/user", require("./api/user.route"));

module.exports = router; //Lo exportamos para poder usarlo en el index