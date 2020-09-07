import React, {Component} from "react"
import {View, Text, StyleSheet, TextInput, ScrollView, Modal, TouchableOpacity} from "react-native"
import {api} from "../../../../config"

export default class CrearTarea extends Component {

	constructor() {
		super()
		this.state = {
			titulo: "titulo bla bla",
			contenido: "contenido bla bla bla",
			showModal: false,
			textModal: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleCreate = this.handleCreate.bind(this)
		this.modalRender = this.modalRender.bind(this)
		this.inputsValidate = this.inputsValidate.bind(this)
	}

// ------------------------------------------------------------------------------------- inputsValidate()

	inputsValidate() {
		if (this.state.titulo !== "" && this.state.contenido !== "") {
			this.handleCreate()
		}
		else {
			this.setState({
				showModal: true,
				textModal: "Titulo o Contenido vacios..."
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

// ------------------------------------------------------------------------------------- handleCreate()

	handleCreate() {
	 	fetch(`http://${api}:5000/tareas/create`,{
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				titulo: this.state.titulo,
				contenido: this.state.contenido
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.status) {
					this.setState({
						showModal: true,
						textModal: "Tarea Creada...",
						titulo: "",
						contenido: ""
					})
				}
				else {
					this.setState({
						showModal: true,
						textModal: "Algo ha ido mal, intenta de nuevo...",
						titulo: "",
						contenido: ""
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

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<ScrollView style={styles.container}>
				{
					this.state.showModal ? this.modalRender(this.state.textModal) : <View></View>
				}
				<View style={{alignItems: "center", marginBottom: 10, marginTop: 5}}>
					<Text style={styles.titleStyle}>Agregar Tarea</Text>
				</View>
				<View style={styles.bodyContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.textTitle}>Titulo</Text>
						<TextInput style={styles.inputStyle} value={this.state.titulo} onChangeText={textUpdated => {this.handleChange(textUpdated, "titulo")}} />
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.textTitle}>Contenido</Text>
						<TextInput multiline={true} numberOfLines={5} style={styles.inputStyle} value={this.state.contenido} onChangeText={textUpdated => {this.handleChange(textUpdated, "contenido")}} />
					</View>
				</View>
				<View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
					<TouchableOpacity style={styles.touchCrear} onPress={() => {this.inputsValidate()}}>
						<Text style={styles.touchTextCrear}>   Crear   </Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

// ------------------------------------------------------------------------------------- styles

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B0B3FFaa"
	},
	titleStyle: {
		fontSize: 30,
		fontWeight: "bold",
		color: "red"
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