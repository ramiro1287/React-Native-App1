const router = require("express").Router()
const Usuario = require("../../models/Usuario")
const Tarea = require("../../models/Tarea")

// --------------------------------------------------------------------------------------------- POST

router.post("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const userID = req.user._id
		const {titulo, contenido} = req.body
		const tarea = new Tarea({userID, titulo, contenido})
		await tarea.save()
			.then(res.json({status: true}))
			.catch(res.json({status: false}))
	}
	else {
		res.status(401)
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router