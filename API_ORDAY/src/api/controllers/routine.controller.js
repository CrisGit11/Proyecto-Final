//Controlador de funciones

const Routines = require("../models/routine.models");
const mongoose = require('mongoose');

const createRoutines = async (req, res) => {
    try{
        const {name, description, duration, category} = req.body; //Recogemos los datos recibidos en el body para crear la rutina
        const user = req.user; //Obtenemos el usuario que se ha autenticado

        //Comprobamos previamente si la rutina que queremos crear no existe ya en el sistema
        const existingRoutine = await Routines.findOne({ name,description,duration,category,organizer: user._id});
        if(existingRoutine){
            return res.status(400).json({message: "Ya existe una rutina con los mismos detalles"});
        };
        
        //Creamos la rutina con los datos necesarios en el caso de no existir
        const newRoutine = new Routines({
            name,
            description,
            duration,
            category,
            organizer: [user._id] //Le asociamos el organizador que se ha autenticado
        });

        const createdRoutine = await newRoutine.save(); //Guardamos la rutina en la bbdd
        res.status(201).json({message: "La rutina se ha creado correctamente", routine: createdRoutine})
       
    }catch(error){
        res.status(500).json({message: error});
    };
    
};

const gelAll = async (req, res) => {
    try{
        const listRoutines = await Routines.find().populate('organizer'); //Buscamos todos los eventos de nuestra bbdd
        if(listRoutines.length !== 0){
            res.status(200).json({message: "Mostrando el listado de todas las rutinas", routines: listRoutines});
        }else{
            return res.status(404).json({message: "No hay rutinas disponibles en la bbdd"});
        };
        
    }catch(error){
        res.status(500).json({message: error});
    };
};

const updateRoutine = async (req, res) => {
    try {
        const {routineId} = req.params; //Recibimos el ID de la rutina que queremos actualizar
        const routineUpdate = req.body //Recibimos los parametros que queremos actualizar
        // Validamos si el ID es un ObjectId válido
        if(!mongoose.Types.ObjectId.isValid(routineId)){
            return res.status(400).json({message: "ID no válido"});
        };
        const routine = await Routines.findByIdAndUpdate(routineId, routineUpdate, {new: true}); // Busca la rutina por su ID y el añadimos los parametros a actualizar
        if(!routine){
            return res.status(404).json({message: "Rutina no encontrada"});
        };
        res.status(200).json({message: "Rutina actualizada con éxito", data: routine}); //Devolvemos el resultado de la busqueda
        
    }catch(error){
        res.status(500).json({message: error});
    };
    
};

const deleteRoutine = async (req, res) => {
    try {
        const {routineId} = req.params; //Recibimos el ID de la rutina que queremos eliminar
        // Validamos si el ID es un ObjectId válido
        if(!mongoose.Types.ObjectId.isValid(routineId)){
            return res.status(400).json({message: "ID no válido"});
        
        };
        const routine = await Routines.findByIdAndDelete(routineId); // Busca la rutina por su ID y lo eliminamos
        if(!routine){
            return res.status(404).json({message: "Evento no encontrado"});
        };
        res.status(200).json({message: "Rutina eliminada con éxito"}); //Devolvemos el resultado de la busqueda
        
    }catch(error){
        res.status(500).json({message: error});
    };
    
};

module.exports = {createRoutines, gelAll, updateRoutine, deleteRoutine};