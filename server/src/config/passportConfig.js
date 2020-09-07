const passport = require("passport")
const Usuario = require("../models/Usuario")

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((userId, done) => {
	Usuario.findById(userId)
		.then(user => {
			done(null, user)
		})
		.catch(err => done(err))
})