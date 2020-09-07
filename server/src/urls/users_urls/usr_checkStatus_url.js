const router = require("express").Router()
const Usuario = require("../../models/Usuario")
const passport = require("passport")

// --------------------------------------------------------------------------------------------- GET

router.get("/", (req, res)=> {
	const usrState = req.isAuthenticated()
	if (usrState) {
		const usrRol = req.user.rol
		res.json({body: {usrLogged: usrState, usrRol: usrRol}})
	}
	else {
		res.json({body: {usrLogged: usrState}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router