const mongoose = require("mongoose")
require("dotenv").config()

const {DB_ip, DB_name, DB_port} = process.env
const db_url = "mongodb://"+DB_ip+":"+DB_port+"/"+DB_name
const db_options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
}
mongoose.connect(db_url, db_options)
	.then(db => console.log("DB conectada..."))
	.catch(err => console.error(err))