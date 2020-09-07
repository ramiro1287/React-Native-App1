const router = require("express").Router()
const Usuario = require("../../models/Usuario")

// --------------------------------------------------------------------------------------------- GET

router.get("/", async (req, res) => {
	if (req.isAuthenticated() && (req.user.rol === 1 || req.user.rol === 2)) {
		const users_all = await Usuario.find()
		console.log(users_all)
		var usuarios = []
		users_all.map(u => {
			usuarios.push({
				_id: u._id,
				dni: u.dni,
				fechaNacimiento: u.fechaNacimiento,
				tel: u.tel,
				rol: u.rol,
				nombre: u.nombre,
				apellido: u.apellido,
				email: u.email
			})
		})
		res.json(usuarios)
	}
	else {
		res.status(401)
	}
})

// --------------------------------------------------------------------------------------------- POST

router.post("/", async (req, res) => {
	if (req.isAuthenticated() && (req.user.rol === 1 || req.user.rol === 2)) {
		const {filtro} = req.body
		if (filtro) {
			const users_all = await Usuario.find().sort({nombre: 1})
			var usuarios = []
			users_all.map(u => {
				usuarios.push({
					_id: u._id,
					edad: u.edad,
					sexo: u.sexo,
					tel: u.tel,
					rol: u.rol,
					nombre: u.nombre,
					apellido: u.apellido
				})
			})
			res.json(usuarios)
		}
		else {
			const users_all = await Usuario.find().sort({apellido: 1})
			var usuarios = []
			users_all.map(u => {
				usuarios.push({
					_id: u._id,
					edad: u.edad,
					sexo: u.sexo,
					tel: u.tel,
					rol: u.rol,
					nombre: u.nombre,
					apellido: u.apellido
				})
			})
			res.json(usuarios)
		}
	}
	else {
		res.status(401)
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router