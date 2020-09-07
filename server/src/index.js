
// --------------------------------------------------------------------------------------------- Imports

const path = require("path")
const express = require("express")
const session = require("express-session")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")(session)
const passport = require("passport")

// --------------------------------------------------------------------------------------------- Settings

require("dotenv").config()
const {serverIP_1, serverIP_2, serverIP_3, port_ID, DBsecret} = process.env
const app = express()
app.set("port", port_ID)

// ----------------------------------------- MongoDB Config
require("./config/DBconfig")

// --------------------------------------------------------------------------------------------- Middlewares

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const sessionStore = new MongoStore({
	mongooseConnection: mongoose.connection,
	collection: "sessions"
})

// ----------------------------------------- Sessions Config
app.use(session({
	secret: DBsecret,
	resave: true,
	saveUninitialiazed: true,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24
	}
}))

// ----------------------------------------- Passport Config
require("./config/passportConfig")
app.use(passport.initialize())
app.use(passport.session())

// --------------------------------------------------------------------------------------------- Urls

// Users Urls
app.use("/users/login", require("./urls/users_urls/usr_login_url"))
app.use("/users/logout", require("./urls/users_urls/usr_logout_url"))
app.use("/users/create", require("./urls/users_urls/usr_create_url"))
app.use("/users/delete", require("./urls/users_urls/usr_delete_url"))
app.use("/users/show", require("./urls/users_urls/usr_show_url"))
app.use("/users/check", require("./urls/users_urls/usr_checkStatus_url"))
app.use("/users/getUser", require("./urls/users_urls/usr_getUser_url"))
app.use("/users/buscarUsr", require("./urls/users_urls/usr_buscarUser_url"))
app.use("/users/updateUser", require("./urls/users_urls/usr_updateUser_url"))

// Tareas Urls
app.use("/tareas/create", require("./urls/tareas_urls/crearTarea_url"))
app.use("/tareas/mostrar", require("./urls/tareas_urls/mostrarTareas_url"))

// --------------------------------------------------------------------------------------------- Start Server

app.listen(port_ID, serverIP_1, () => {
	console.log(`Server On => http://${serverIP_1}:${port_ID}/`)
})
module.exports = app