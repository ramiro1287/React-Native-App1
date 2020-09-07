import React, {Component} from "react"
import {Text, View, StyleSheet, TouchableOpacity, Modal, ScrollView} from "react-native"
import moment from "moment"
import {api} from "../../../../config"

export default class MostrarUsr extends Component {

	constructor() {
		super()
		this.state = {
			showModal: false,
			tareaModal: {},
			tareas: []
		}
		this.showTarea = this.showTarea.bind(this)
		this.modalRender = this.modalRender.bind(this)
	}

// ------------------------------------------------------------------------------------- componentDidMount()

	componentDidMount() {
		fetch(`http://${api}:5000/tareas/mostrar`)
			.then(res => res.json())
			.then(data => {
				this.setState({
					tareas: data
				})
			})
			.catch(err => console.log(err))
	}

// ------------------------------------------------------------------------------------- showTarea()

	showTarea(tarea) {
		this.setState({
			tareaModal: tarea,
			showModal: true
		})
	}

// ------------------------------------------------------------------------------------- modalRender()

	modalRender(tarea) {
		return(
			<Modal style={{alignItems: "center", justifyContent: "center"}} transparent={true}>
				<View style={{flex: 1, backgroundColor: "#363636aa"}}>
					<ScrollView style={styles.modalContainer}>
						<Text style={{fontSize: 18, marginTop: 15, fontWeight: "bold", textAlign: "center"}}>Titulo</Text>
						<Text style={{fontSize: 18, textAlign: "center"}}>{tarea.titulo}</Text>
						<Text style={{fontSize: 18, marginTop: 15, fontWeight: "bold", textAlign: "center"}}>Fecha</Text>
						<Text style={{fontSize: 18, textAlign: "center"}}>{moment(tarea.fechaCreacion).format("DD-MM-YYYY")}</Text>
						<Text style={{fontSize: 18, marginTop: 15, fontWeight: "bold", textAlign: "center"}}>Contenido</Text>
						<Text style={{fontSize: 18, textAlign: "center"}}>{tarea.contenido}</Text>
						<View style={{alignItems: "center", justifyContent: "center"}}>
							<TouchableOpacity onPress={() => {this.setState({showModal: false})}} style={{marginTop: 25, backgroundColor: "black", borderWidth: 2, borderRadius: 15, borderColor: "white"}}>
								<Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>  Continuar  </Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</Modal>
		)
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<ScrollView style={styles.container}>
				{
					this.state.showModal ? this.modalRender(this.state.tareaModal) : <View></View>
				}
				<View style={{alignItems: "center", marginBottom: 10, marginTop: 5}}>
					<Text style={styles.titleStyle}>Tareas</Text>
				</View>
				<View style={{flexDirection: "row", marginLeft: 20, marginBottom: 20}}>
					<TouchableOpacity onPress={() => {this.componentDidMount()}} style={{backgroundColor: "#3EBC46aa", borderColor: "blue", borderRadius: 10, borderWidth: 2}}>
						<Text style={{fontSize: 18}}> Refresh </Text>
					</TouchableOpacity>
				</View>
				{
					this.state.tareas.map(t => {
						return(
							<View style={styles.tareaContainer} key={t._id}>
								<View style={styles.textContainer}>
									<Text style={styles.textStyle}>Titulo: {t.titulo}</Text>
									<Text style={styles.textStyle}>Fecha: {moment(t.fechaCreacion).format("DD/MM/YYYY")}</Text>
								</View>
								<TouchableOpacity onPress={() => {this.showTarea(t)}} style={styles.touchStyle}>
									<Text style={{fontSize: 20, fontWeight: "bold"}}> O </Text>
								</TouchableOpacity>
							</View>
						)
					})
				}
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
		fontWeight: "bold"
	},
	tareaContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#E4E4E4",
		marginLeft: 25,
		marginRight: 25,
		marginTop: 10,
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 2
	},
	textContainer: {
		marginTop: 5,
		marginLeft: 15,
		marginBottom: 5
	},
	textStyle: {
		fontSize: 15,
		fontWeight: "bold"
	},
	touchStyle: {
		backgroundColor: "black",
		borderColor: "white",
		borderRadius: 15,
		borderWidth: 2,
		marginTop: 5,
		marginRight: 15,
		marginBottom: 5
	},
	modalContainer: {
		flex: 1,
		marginTop: "20%",
		marginBottom: "20%",
		marginRight: "10%",
		marginLeft: "10%",
		backgroundColor: "#AEB3FF",
		borderRadius: 20,
		borderWidth: 3,
		borderColor: "white"
	}
})