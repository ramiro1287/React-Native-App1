const router = require("express").Router()
const Usuario = require("../../models/Usuario")

// --------------------------------------------------------------------------------------------- POST

router.post("/", async (req, res) => {
	if (req.isAuthenticated() && (req.user.rol === 1 || req.user.rol === 2)) {
		const {email, password, rol, dni} = req.body
		const emailExist = await Usuario.exists({email: email})
		const dniExist = await Usuario.exists({dni: dni})
		console.log("Entro al post...")
		if (emailExist) {
			res.json({status: "emailExist"})
		}
		else {
			if (dniExist) {
				res.json({status: "dniExist"})
			}
			else {
				const user = new Usuario({email, password, rol, dni})
				user.password = await user.cifrarPassword(password)
				await user.save()
					.then(() => res.json({status: "ok"}))
					.catch(err => res.json({status: "error"}))
			}
		}
	}
	else {
		res.status(401)
	}
})


// --------------------------------------------------------------------------------------------- POST sin restinciones
/*
router.post("/", async (req, res) => {
		const {email, password, rol, dni} = req.body
		const user = new Usuario({email, password, rol, dni})
		user.password = await user.cifrarPassword(password)
		await user.save()
			.then(res.json({status: "Usuario Creado"}))
			.catch(err => console.error(err))
			//.catch(res.json({status: "No se creo el usuario"}))
})
*/
// ---------------------------------------------------------------------------------------------

module.exports = router