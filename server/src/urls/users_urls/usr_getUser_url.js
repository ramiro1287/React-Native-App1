const router = require("express").Router()
const Usuario = require("../../models/Usuario")

// --------------------------------------------------------------------------------------------- GET

router.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		const {email, dni, fechaNacimiento, nombre, apellido, sexo, rol, tel} = req.user
		res.json({email, dni, fechaNacimiento, nombre, apellido, sexo, rol, tel})
	}
	else {
		res.status(401)
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router