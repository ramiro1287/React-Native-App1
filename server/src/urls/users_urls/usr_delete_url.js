const router = require("express").Router()
const Usuario = require("../../models/Usuario")
const passport = require("passport")

// --------------------------------------------------------------------------------------------- DELETE

router.delete("/", async (req, res) => {
	if (req.isAuthenticated() && (req.user.rol === 1 || req.user.rol === 2)) {
		const {_id} = req.body
		await Usuario.findOneAndRemove({_id: _id})
			.then(res.json({status: true}))
			.catch(res.json({status: false}))
	}
	else {
		res.status(401)
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router