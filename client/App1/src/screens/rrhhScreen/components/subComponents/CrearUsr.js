import React, {Component} from "react"
import {Text, View, StyleSheet, TextInput, Modal, TouchableOpacity} from "react-native"
import {api} from "../../../../config"

export default class CrearUsr extends Component {

	constructor() {
		super()
		this.state = {
			email: "rrhh@gmail.com",
			password: "123456",
			rol: 0,
			dni: "37549872",
			showModal: false,
			textModal: ""
		}
		this.handleCreate = this.handleCreate.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.modalRender = this.modalRender.bind(this)
		this.inputsValidate = this.inputsValidate.bind(this)
	}

// ------------------------------------------------------------------------------------- inputsValidate()

	inputsValidate() {
		const emailExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		const emailResult = emailExpression.test(this.state.email)
		const passwordExpression = /^[a-zA-Z0-9]+$/
		const passResult = passwordExpression.test(this.state.password)
		const passLength = (this.state.password).length
		const dniExpression = /^[0-9]+$/
		const dniLen = (this.state.dni).length
		const dniResult = dniExpression.test(this.state.dni)
		if (dniResult && (dniLen == 8)) {
			if (emailResult) {
				if (passResult && (17 > passLength && passLength > 3)) {
					this.handleCreate()
				}
				else {
					this.setState({
						showModal: true,
						textModal: "Password debe ser mayor a 3 y menor a 17",
						password: ""
					})
				}
			}
			else {
				this.setState({
					showModal: true,
					textModal: "E-mail invalido...",
					password: ""
				})
			}
		}
		else {
			this.setState({
					showModal: true,
					textModal: "DNI invalido...",
					dni: ""
				})
		}
	}

// ------------------------------------------------------------------------------------- handleCreate()

	handleCreate() {
	 	fetch(`http://${api}:5000/users/create`,{
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				rol: this.state.rol,
				dni: this.state.dni
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.status !== "error") {
					if (data.status === "emailExist") {
						this.setState({
							showModal: true,
							textModal: "El E-mail ya existe...",
							password: ""
						})
					}
					else if (data.status === "dniExist") {
						this.setState({
							showModal: true,
							textModal: "El DNI ya existe...",
							password: ""
						})
					}
					else {
						this.setState({
							showModal: true,
							textModal: "Usuario creado exitosamente...",
							email: "",
							password: "",
							dni: ""
						})
					}
				}
				else {
					this.setState({
						showModal: true,
						textModal: "Algo a ido mal, intenta de nuevo",
						email: "",
						password: "",
						dni: ""
					})
				}
			})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- handleChange()

	handleChange(textUpdated, nameProp) {
		this.setState({
			[nameProp]: textUpdated
		})
	}

// ------------------------------------------------------------------------------------- modalRender()

	modalRender(text) {
		return(
			<Modal style={{alignItems: "center", justifyContent: "center"}} transparent={true}>
				<View style={{flex: 1, backgroundColor: "#363636aa"}}>
					<View style={styles.modalContainer}>
						<Text style={{marginRight: 15, marginLeft: 15, fontWeight: "bold", fontSize: 18, color: "red"}}>{text}</Text>
						<TouchableOpacity onPress={() => {this.setState({showModal: false, textModal: ""})}} style={{marginTop: 25, backgroundColor: "black", borderWidth: 2, borderRadius: 15, borderColor: "white"}}>
							<Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>  Continuar  </Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<View style={styles.container}>
				{
					this.state.showModal ? this.modalRender(this.state.textModal) : <View></View>
				}
				<View style={{alignItems: "center", marginBottom: 10, marginTop: 5}}>
					<Text style={styles.titleStyle}>Crear Usuario</Text>
				</View>
				<View style={styles.bodyContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.textTitle}>DNI</Text>
						<TextInput keyboardType={"numeric"} style={styles.inputStyle} value={this.state.dni} onChangeText={textUpdated => {this.handleChange(textUpdated, "dni")}} />
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.textTitle}>Email</Text>
						<TextInput style={styles.inputStyle} value={this.state.email} onChangeText={textUpdated => {this.handleChange(textUpdated, "email")}} />
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.textTitle}>Password</Text>
						<TextInput style={styles.inputStyle} value={this.state.password} onChangeText={textUpdated => {this.handleChange(textUpdated, "password")}} />
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.textTitle}>Rol</Text>
						<View style={{flexDirection: "row"}}>
							<TouchableOpacity style={this.state.rol !== 0 ? styles.touchContainer : styles.touchContainer1} onPress={() => {this.setState({rol: 0})}}>
								<Text style={this.state.rol !== 0 ? styles.touchText : styles.touchText1}>  Emp  </Text>
							</TouchableOpacity>

							<TouchableOpacity style={this.state.rol !== 1 ? styles.touchContainer : styles.touchContainer1} onPress={() => {this.setState({rol: 1})}}>
								<Text style={this.state.rol !== 1 ? styles.touchText : styles.touchText1}>  RRHH  </Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
					<TouchableOpacity style={styles.touchCrear} onPress={() => {this.inputsValidate()}}>
						<Text style={styles.touchTextCrear}>   Crear   </Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

// ------------------------------------------------------------------------------------- styles

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFB0B0aa"
	},
	titleStyle: {
		fontSize: 30,
		fontWeight: "bold"
	},
	bodyContainer: {
		backgroundColor: "#E4E4E4",
		margin: 10,
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 2
	},
	textContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 5,
		marginBottom: 15
	},
	textTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "red"
	},
	inputStyle: {
		fontSize: 18,
		backgroundColor: "white",
		paddingTop: 3,
		paddingBottom: 3,
		borderRadius: 10,
		width: "85%"
	},
	touchContainer: {
		backgroundColor: "black",
		borderColor: "white",
		borderRadius: 10,
		borderWidth: 2,
		marginLeft: 12,
		marginRight: 12
	},
	touchText: {
		color: "white",
		fontSize: 18
	},
	touchContainer1: {
		backgroundColor: "white",
		borderColor: "black",
		borderRadius: 10,
		borderWidth: 2,
		marginLeft: 12,
		marginRight: 12
	},
	touchText1: {
		color: "black",
		fontSize: 18
	},
	touchCrear: {
		backgroundColor: "#E4E4E4",
		borderColor: "black",
		borderRadius: 15,
		borderWidth: 2,
		marginLeft: 12,
		marginRight: 12,
		paddingTop: 5,
		paddingBottom: 7
	},
	touchTextCrear: {
		color: "black",
		fontSize: 18
	},
	modalContainer: {
		flex: 1,
		marginTop: "60%",
		marginBottom: "60%",
		marginRight: "10%",
		marginLeft: "10%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#D8D8D8",
		borderRadius: 20,
		borderWidth: 3,
		borderColor: "red"
	}
})