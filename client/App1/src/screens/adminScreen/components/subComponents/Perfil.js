import React, {Component} from "react"
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import PerfilUpdate from "./perfilComps/PerfilUpdate"
import moment from "moment"
import {api} from "../../../../config"

export default class Perfil extends Component {

	constructor() {
		super()
		this.state = {
			updateState: false,
			email: "",
			dni: "",
			nombre: "",
			apellido: "",
			sexo: true,
			rol: "",
			fechaNacimiento: "",
			tel: "",
			fechaDD: "",
			fechaMM: "",
			fechaYYYY: "",
			edad: ""
		}
		this.rolString = this.rolString.bind(this)
		this.changeState = this.changeState.bind(this)
		this.handleRender = this.handleRender.bind(this)
		this.calcularEdad = this.calcularEdad.bind(this)
	}

// ------------------------------------------------------------------------------------- componentDidUpdate()

	componentDidUpdate(prevProps, prevState) {
		if (prevState.fechaNacimiento !== this.state.fechaNacimiento) {
			this.calcularEdad()
		}
	}

// ------------------------------------------------------------------------------------- componentDidMount()

	componentDidMount() {
		fetch(`http://${api}:5000/users/getUser`)
			.then(res => res.json())
			.then(data => {
				const {email, dni, nombre, apellido, sexo, rol, fechaNacimiento, tel} = data
				this.setState({
					email: email,
					dni: dni,
					nombre: nombre,
					apellido: apellido,
					rol: rol,
					sexo: sexo,
					fechaNacimiento: fechaNacimiento,
					tel: tel
				})
			})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- rolString()

	rolString(num) {
		switch (num) {
			case 0: return "Empleado";
			case 1: return "Recursos Humano";
			case 2: return "Administrador";
			default: return ""
		}
	}

// ------------------------------------------------------------------------------------- calcularEdad()

	calcularEdad() {
		const fecha = this.state.fechaNacimiento
		if (fecha !== "") {
			const yearActual = moment().year()
			const monthActual = moment().month() + 1
			const dayActual = moment().date()
			const yearFecha = Number(moment(fecha, "DD/MM/YYYY").format("YYYY"))
			const monthFecha = Number(moment(fecha, "DD/MM/YYYY").format("MM"))
			const dayFecha = Number(moment(fecha, "DD/MM/YYYY").format("DD"))
			this.setState({
				fechaDD: moment(fecha, "DD/MM/YYYY").format("DD"),
				fechaMM: moment(fecha, "DD/MM/YYYY").format("MM"),
				fechaYYYY: moment(fecha, "DD/MM/YYYY").format("YYYY")
			})
			var age = yearActual - yearFecha
			if (monthFecha >= monthActual && dayFecha <= dayActual) {
 				age++
 			}
 			this.setState({edad: age})
		}
	}

// ------------------------------------------------------------------------------------- changeState()

	changeState(value) {
		this.setState({
			updateState: value
		})
		this.componentDidMount()
	}

// ------------------------------------------------------------------------------------- handleRender()

	handleRender() {
		if(this.state.updateState) {
			return(
				<PerfilUpdate 
					changeState={this.changeState}
					nombre={this.state.nombre}
					apellido={this.state.apellido}
					sexo={this.state.sexo}
					tel={this.state.tel}
					fechaDD={this.state.fechaDD}
					fechaMM={this.state.fechaMM}
					fechaYYYY={this.state.fechaYYYY}
				/>
			)
		}
		else {
			return(
				<View style={styles.container}>
					<View style={{alignItems: "center", marginBottom: 10, marginTop: 5}}>
						<Text style={styles.titleStyle}>Profile</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>DNI: </Text>
						<Text style={styles.textValue}>{this.state.dni}</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>Nombre: </Text>
						<Text style={styles.textValue}>{this.state.nombre}</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>Apellido: </Text>
						<Text style={styles.textValue}>{this.state.apellido}</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>Email: </Text>
						<Text style={styles.textValue}>{this.state.email}</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>Rol: </Text>
						<Text style={styles.textValue}>{this.rolString(this.state.rol)}</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>Edad: </Text>
						<Text style={styles.textValue}>{this.state.edad}</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>Fecha Nacimiento: </Text>
						<Text style={styles.textValue}>{this.state.fechaNacimiento}</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>Sexo: </Text>
						<Text style={styles.textValue}>{this.state.sexo ? "Hombre" : "Mujer"}</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
						<Text style={styles.textTitle}>Tel: </Text>
						<Text style={styles.textValue}>{this.state.tel}</Text>
					</View>
					<View style={{alignItems: "flex-end"}}>
						<TouchableOpacity onPress={() => {this.changeState(true)}} style={{borderRadius: 10, marginRight: 10, borderWidth: 2, borderColor: "white", backgroundColor: "black"}}>
							<Text style={{color: "white", fontSize: 15}}>  Update Profile  </Text>
						</TouchableOpacity>
					</View>
				</View>
			)
		}
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return <this.handleRender />
	}
}

// ------------------------------------------------------------------------------------- styles

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B2FFAFaa"
	},
	titleStyle: {
		fontSize: 30,
		fontWeight: "bold",
		color: "red"
	},
	textTitle: {
		fontSize: 20,
		fontWeight: "bold"
	},
	textValue: {
		fontSize: 20
	}
})