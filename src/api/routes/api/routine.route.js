//Rutas

const router = require("express").Router();
const routines = require("../../controllers/routine.controller");
const checkToken = require("../../middleware/auth");

//Declaramos todos los endpoints

router.get("/", routines.gelAll); //Nos devuelve el listado de todas las rutinas
router.post("/generate", checkToken, routines.createRoutines); //Nos permite crear rutinas nuevas
router.put("/:routineId", checkToken, routines.updateRoutine); //Nos permite actualizar una rutina
router.delete("/:routineId", checkToken, routines.deleteRoutine); //Elimina una rutina específica

module.exports = router; //Exportamos el paquete de rutas de las rutinas