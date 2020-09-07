const router = require("express").Router()
const Usuario = require("../../models/Usuario")
const Tarea = require("../../models/Tarea")
const moment = require("moment")

// --------------------------------------------------------------------------------------------- POST

router.post("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const {id, filtroYYYY, filtroMM} = req.body
		const tareas = await Tarea.find({userID: id})
		const tareasFiltradas = []
		const tareasFiltradasOrdenadas = []
		for (var i = 0; i < tareas.length; i++) {
			const dateMM = moment(tareas[i].fechaCreacion).format("MM")
			const dateYYYY = moment(tareas[i].fechaCreacion).format("YYYY")
			if ((filtroMM === dateMM) && (filtroYYYY === dateYYYY)) {
				tareasFiltradas.push(tareas[i])
			}
		}

		function bubble_Sort(a){
		    var swapp
		    var n = a.length-1
		    var x=a
		    do {
		        swapp = false
		        for (var i=0; i < n; i++) {
		        	var iDD = moment(a[i].fechaCreacion).format("DD")
		        	var jDD = moment(a[i+1].fechaCreacion).format("DD")
		            if (iDD < jDD)
		            {
		               var temp = x[i]
		               x[i] = x[i+1]
		               x[i+1] = temp
		               swapp = true
		            }
		        }
		        n--
		    } while (swapp)
		 return x
		}

		bubble_Sort(tareasFiltradas)
		res.json(tareasFiltradas)
	}
	else {
		res.status(401)
	}
})

// --------------------------------------------------------------------------------------------- GET  borrarlo proximamente

router.get("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const {_id} = req.user
		const tareas = await Tarea.find({userID: _id}).sort({fechaCreacion: -1})
		res.json(tareas)
	}
	else {
		res.status(401)
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router