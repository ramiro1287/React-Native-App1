const router = require("express").Router()
const Usuario = require("../../models/Usuario")

// --------------------------------------------------------------------------------------------- PUT

router.put("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const {nombre, apellido, sexo, fechaNacimiento, tel} = req.body
		await req.user.updateOne({nombre, apellido, sexo, fechaNacimiento, tel})
			.then(res.json({status: "Usuario Actualizado..."}))
			.catch(err => console.error(err))
	}
	else {
		res.status(401)
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router