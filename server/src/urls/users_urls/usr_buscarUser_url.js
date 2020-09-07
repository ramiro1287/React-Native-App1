const router = require("express").Router()
const Usuario = require("../../models/Usuario")

// --------------------------------------------------------------------------------------------- POST

router.post("/", async (req, res) => {
	if (req.isAuthenticated() && (req.user.rol === 1 || req.user.rol === 2)) {
		const {email} = req.body
		const usuario = await Usuario.findOne({email})
		res.json(usuario)
	}
	else {
		res.status(401)
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router