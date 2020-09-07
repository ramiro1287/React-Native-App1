const {Schema, model} = require("mongoose")

const ModeloTarea = new Schema({
	titulo: {type: String, required: true},
	contenido: {type: String, required: true},
	userID: {type: String, required: true},
	fechaCreacion: {type: Date, default: Date.now}
})

module.exports = model("Tarea", ModeloTarea)