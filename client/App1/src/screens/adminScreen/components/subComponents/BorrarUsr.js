import React, {Component} from "react"
import {Text, View, StyleSheet, TextInput, ScrollView, Modal, TouchableOpacity} from "react-native"
import {api} from "../../../../config"

export default class BorrarUsr extends Component {

	constructor() {
		super()
		this.state = {
			email: "rrhh@gmail.com",
			auxRender: false,
			showModal: false,
			textModal: "",
			user: {}
		}
		this.handleDelete = this.handleDelete.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.fetchBuscar = this.fetchBuscar.bind(this)
		this.rolString = this.rolString.bind(this)
		this.modalRender = this.modalRender.bind(this)
		this.inputsValidate = this.inputsValidate.bind(this)
	}

// ------------------------------------------------------------------------------------- handleChange()

	handleChange(textUpdated, nameProp) {
		this.setState({
			[nameProp]: textUpdated
		})
	}

// ------------------------------------------------------------------------------------- inputsValidate()

	inputsValidate() {
		const emailExpression =/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		const emailResult = emailExpression.test(this.state.email)
		if (emailResult) {
			this.fetchBuscar()
		}
		else {
			this.setState({
				showModal: true,
				textModal: "E-mail invalido..."
			})
		}
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

// ------------------------------------------------------------------------------------- fetchBuscar()

	fetchBuscar() {
		fetch(`http://${api}:5000/users/buscarUsr`,{
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email: this.state.email})
		})
			.then(res => res.json())
			.then(data => {
				if (data) {
					this.setState({
						user: data,
						auxRender: true
					})
				}
				else {
					this.setState({
						showModal: true,
						textModal: "El usuario no existe..."
					})
				}
			})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- rolString()

	rolString(num) {
		switch(num) {
			case 0: return "Empleado";
			case 1: return "Recursos Humano";
			default: return "Administrador"
		}
	}

// ------------------------------------------------------------------------------------- handleDelete()

	handleDelete() {
		fetch(`http://${api}:5000/users/delete`,{
			method: "delete",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({_id: this.state.user._id})
		})
			.then(res => res.json())
			.then(data => {
				if (data.status) {
					this.setState({
						showModal: true,
						textModal: "Usuario Borrado...",
						user: {},
						email: "",
						auxRender: false
					})
				}
				else {
					this.setState({
						showModal: true,
						textModal: "Algo a ido mal, intente de nuevo...",
						user: {},
						email: "",
						auxRender: false
					})
				}
			})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<ScrollView style={styles.container}>
				{
					this.state.showModal ? this.modalRender(this.state.textModal) : <View></View>
				}
				<View style={{alignItems: "center", marginBottom: 10, marginTop: 5}}>
					<Text style={styles.titleStyle}>Borrar Usuario</Text>
				</View>
				<View style={styles.bodyContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.textTitle}>Email</Text>
						<TextInput style={styles.inputStyle} value={this.state.email} onChangeText={textUpdated => {this.handleChange(textUpdated, "email")}} />
					</View>
				</View>
				<View style={{alignItems: "center", justifyContent: "center", marginTop: 10}}>
					<TouchableOpacity style={styles.touchBorrar} onPress={() => {this.inputsValidate()}}>
						<Text style={styles.touchTextBorrar}>   Buscar   </Text>
					</TouchableOpacity>
				</View>
				{
					!this.state.auxRender ? <View></View> : 
					<View style={styles.bodyContainer}>
						<View style={{flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 4}}>
							<Text style={styles.textTitleStyle}>Nombre: </Text>
							<Text style={styles.textValueStyle}>{this.state.user.nombre}</Text>
						</View>
						<View style={{flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 4}}>
							<Text style={styles.textTitleStyle}>Apellido: </Text>
							<Text style={styles.textValueStyle}>{this.state.user.apellido}</Text>
						</View>
						<View style={{flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 4}}>
							<Text style={styles.textTitleStyle}>Email: </Text>
							<Text style={styles.textValueStyle}>{this.state.user.email}</Text>
						</View>
						<View style={{flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 4}}>
							<Text style={styles.textTitleStyle}>Rol: </Text>
							<Text style={styles.textValueStyle}>{this.rolString(this.state.user.rol)}</Text>
						</View>
						<View style={{flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 4}}>
							<Text style={styles.textTitleStyle}>Edad: </Text>
							<Text style={styles.textValueStyle}>{this.state.user.edad}</Text>
						</View>
						<View style={{flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 4}}>
							<Text style={styles.textTitleStyle}>Sexo: </Text>
							<Text style={styles.textValueStyle}>{this.state.user.sexo ? "Hombre" : "Mujer"}</Text>
						</View>
						<View style={{flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 4}}>
							<Text style={styles.textTitleStyle}>Tel: </Text>
							<Text style={styles.textValueStyle}>{this.state.user.tel}</Text>
						</View>
						<View style={{flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 4}}>
							<Text style={styles.textTitleStyle}>Fecha Creacion: </Text>
							<Text style={styles.textValueStyle}>{this.state.user.fechaCreacion}</Text>
						</View>
						<View style={{alignItems: "center", justifyContent: "center", marginBottom: 15, marginTop: 10}}>
							<TouchableOpacity style={styles.touchBorrar} onPress={() => {this.handleDelete()}}>
								<Text style={styles.touchTextBorrar}>   Borrar   </Text>
							</TouchableOpacity>
						</View>
					</View>
				}
			</ScrollView>
		)
	}
}

// ------------------------------------------------------------------------------------- styles

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#AEFFAE"
	},
	titleStyle: {
		fontSize: 30,
		fontWeight: "bold",
		color: "red"
	},
	bodyContainer: {
		backgroundColor: "#E4E4E4",
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 20,
		borderColor: "red",
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
	touchBorrar: {
		backgroundColor: "#E4E4E4",
		borderColor: "red",
		borderRadius: 15,
		borderWidth: 2,
		paddingTop: 3,
		paddingBottom: 5
	},
	touchTextBorrar: {
		color: "red",
		fontSize: 18
	},
	textTitleStyle: {
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 10
	},
	textValueStyle: {
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