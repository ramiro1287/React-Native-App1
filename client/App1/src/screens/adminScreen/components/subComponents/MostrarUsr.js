import React, {Component} from "react"
import {Text, View, StyleSheet, TouchableOpacity, Modal, ScrollView} from "react-native"
import GestionarUsr from "./mostrarComps/GestionarUsr"
import {api} from "../../../../config"

export default class MostrarUsr extends Component {

	constructor() {
		super()
		this.state = {
			auxRender: false,
			selectedUsr: {},
			filtro: true,
			users: []
		}
		this.rolString = this.rolString.bind(this)
		this.handleUser = this.handleUser.bind(this)
		this.changeState = this.changeState.bind(this)
		this.switchRender = this.switchRender.bind(this)
	}

// ------------------------------------------------------------------------------------- componentDidMount()

	componentDidMount() {
		fetch(`http://${api}:5000/users/show`,{
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				filtro: this.state.filtro
			})
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					users: data
				})
			})
			.catch(err => console.log(err))
	}

// ------------------------------------------------------------------------------------- componentDidUpdate()

	componentDidUpdate(prevProps, prevState) {
		if (prevState.filtro !== this.state.filtro) {
			this.componentDidMount()
		}
	}

// ------------------------------------------------------------------------------------- changeState()

	changeState(stateValue) {
		this.setState({
			auxRender: stateValue,
			selectedUsr: {}
		})
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

// ------------------------------------------------------------------------------------- handleUser()

	handleUser(usr) {
		this.setState({
			selectedUsr: usr,
			auxRender: true
		})
	}

// ------------------------------------------------------------------------------------- switchRender()

	switchRender() {
		switch (this.state.auxRender) {
			case true: return(
				<GestionarUsr usr={this.state.selectedUsr} changeState={this.changeState} />
			);
			default: return(
				<ScrollView style={styles.container}>
					<View style={{alignItems: "center", marginBottom: 10, marginTop: 5}}>
						<Text style={styles.titleStyle}>Usuarios</Text>
					</View>
					<View style={{flexDirection: "row", marginLeft: 20, marginBottom: 20}}>
						<TouchableOpacity onPress={() => {this.componentDidMount()}} style={{backgroundColor: "#3EBC46aa", borderColor: "blue", borderRadius: 10, borderWidth: 2}}>
							<Text style={{fontSize: 18}}> Refresh </Text>
						</TouchableOpacity>
					</View>
					<View style={styles.filtroContainer}>
						<TouchableOpacity onPress={() => {this.setState({filtro: true})}} style={this.state.filtro ? styles.filtroTouch1 : styles.filtroTouch}>
							<Text style={this.state.filtro ? styles.filtroText1 : styles.filtroText}>  Nombre  </Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {this.setState({filtro: false})}} style={!this.state.filtro ? styles.filtroTouch1 : styles.filtroTouch}>
							<Text style={!this.state.filtro ? styles.filtroText1 : styles.filtroText}>  Apellido  </Text>
						</TouchableOpacity>
					</View>
					{
						this.state.users.map(usr => {
							return(
								<View style={styles.userContainer} key={usr._id}>
									<View style={styles.textContainer}>
										<Text style={styles.textStyle}>Nombre: {usr.nombre}</Text>
										<Text style={styles.textStyle}>Apellido: {usr.apellido}</Text>
										<Text style={styles.textStyle}>Rol: {this.rolString(usr.rol)}</Text>
									</View>
									{
										usr.rol !== 0 ? <View></View> :
										<TouchableOpacity onPress={() => {this.handleUser(usr)}} style={styles.touchStyle}>
											<Text style={{fontSize: 20, fontWeight: "bold"}}> O </Text>
										</TouchableOpacity>
									}
								</View>
							)
						})
					}
				</ScrollView>
			)
		}
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return <this.switchRender />
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
	userContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#E4E4E4",
		marginTop: 10,
		width: "85%",
		alignSelf: "center",
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
	filtroContainer: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#FEFFC0",
		width: "70%",
		marginRight: 20,
		marginLeft: 20,
		alignSelf: "center",
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 3
	},
	filtroTouch: {
		backgroundColor: "#EBEBEB",
		borderColor: "red",
		borderRadius: 15,
		borderWidth: 2,
		marginTop: 10,
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10
	},
	filtroTouch1: {
		backgroundColor: "#EBEBEB",
		borderColor: "green",
		borderRadius: 15,
		borderWidth: 2,
		marginTop: 10,
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10
	},
	filtroText: {
		fontSize: 15,
		color: "red"
	},
	filtroText1: {
		fontWeight: "bold",
		fontSize: 15,
		color: "green"
	}
})