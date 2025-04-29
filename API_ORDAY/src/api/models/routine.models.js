//Estructura de datos
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creamos el tipo de dato de la coleccion Events
const routineSchema = new Schema({
    name: {type : String, required : true},
    description: {type: String, required :  true},
    duration: {type: String, required :  true},
    category: {type : String, required : true},
    organizer: [{type: Schema.Types.ObjectId, ref: "users"}]
},{
    collection: "routines",
});

//Y por ultimo creamo la coleccion con el nombre de events y tipo eventSchema
const Routines = mongoose.model("routines", routineSchema);
module.exports = Routines;