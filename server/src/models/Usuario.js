const {Schema, model} = require("mongoose")
const bcryptjs = require("bcryptjs")

const ModeloUsuario = new Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	rol: {type: Number, required: true},
	dni: {type: String, required: true},
	nombre: {type: String, default: ""},
	apellido: {type: String, default: ""},
	sexo: {type: Boolean, default: true},
	tel: {type: String, default: ""},
	fechaNacimiento: {type: String, default: ""},
	fechaCreacion: {type: Date, default: Date.now}
})

ModeloUsuario.methods.cifrarPassword = async (pass) => {
	const salt = await bcryptjs.genSalt(10)
	return (await bcryptjs.hash(pass, salt))
}

ModeloUsuario.methods.compararPassword = async (pass1, pass2) => {
	return (await bcryptjs.compare(pass1, pass2))
}

module.exports = model("Usuario", ModeloUsuario)