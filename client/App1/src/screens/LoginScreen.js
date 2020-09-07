import React, {Component} from "react"
import {View, Text, TextInput, StyleSheet, Modal, TouchableOpacity} from "react-native"
import {api} from "../config"

export default class Login extends Component {

	constructor() {
		super()
		this.state = {
			email: "admin@gmail.com",
			password: "123456",
			textModal: "",
			showModal: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.modalRender = this.modalRender.bind(this)
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
						<Text style={{fontWeight: "bold", fontSize: 18, color: "red"}}>{text}</Text>
						<TouchableOpacity onPress={() => {this.setState({showModal: false, textModal: "", password: ""})}} style={{marginTop: 15, backgroundColor: "black", borderWidth: 2, borderRadius: 15, borderColor: "white"}}>
							<Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>  Continuar  </Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)
	}

// ------------------------------------------------------------------------------------- handleLogin()

	handleLogin() {
		fetch(`http://${api}:5000/users/login`, {
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.body.wrongData !== null) {
					if (data.body.wrongData) {
						this.setState({
							showModal: true,
							textModal: "Datos Invalidos..."
						})
					}
					else {
						console.log("Loggeo Exitoso...")
						const usrRol = data.body.usrRol
						this.props.changeState(true, usrRol)
					}
				}
				else {
					console.log("El usuario ya esta loggeado...")
				}
			})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<View style={styles.loginContainer}>
				{
					this.state.showModal ? this.modalRender(this.state.textModal) : <View></View>
				}
				<View>
					<Text style={styles.textStyle}>E-mail</Text>
					<TextInput style={styles.inputStyle} value={this.state.email} onChangeText={textUpdated => {this.handleChange(textUpdated, "email")}} />
				</View>
				<View>
					<Text style={[styles.textStyle, {marginTop: 15}]}>Password</Text>
					<TextInput style={styles.inputStyle} value={this.state.password} onChangeText={textUpdated => {this.handleChange(textUpdated, "password")}} />
				</View>
				<View style={styles.btnContainer}>
					<TouchableOpacity onPress={() => {this.handleLogin()}}>
						<Text style={styles.btnTextStyle}>   Sign-In   </Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

// ------------------------------------------------------------------------------------- styles

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		backgroundColor: "#C8CB68",
		alignItems: "center",
		justifyContent: "center"
	},
	textStyle: {
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center"
	},
	inputStyle: {
		fontSize: 20,
		backgroundColor: "white",
		borderRadius: 15,
		borderColor: "black",
		borderWidth: 3,
		width: 280,
		textAlign: "center"
	},
	btnContainer: {
		marginTop: 15,
		backgroundColor: "black",
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 2
	},
	btnTextStyle: {
		fontSize: 25,
		fontWeight: "bold",
		color: "white"
	},
	modalContainer: {
		flex: 1,
		marginTop: "60%",
		marginBottom: "60%",
		marginRight: "20%",
		marginLeft: "20%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#D8D8D8",
		borderRadius: 20,
		borderWidth: 3,
		borderColor: "red"
	}
})