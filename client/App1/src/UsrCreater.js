import React, {Component} from "react"
import {View, Text, TouchableOpacity} from "react-native"
import {api} from "./config"

export default class UsrCreater extends Component {

	constructor() {
		super()
		this.state = {
			email: "admin@gmail.com",
			password: "123456",
			rol: 2,
			dni: "38022410",
			showButton: true
		}
		this.fetchCreate = this.fetchCreate.bind(this)
		this.rolString = this.rolString.bind(this)
	}

	rolString(num) {
		switch(num) {
			case 0: return "Empleado";
			case 1: return "RRHH";
			default: return "Admin"
		}
	}

	fetchCreate() {
		this.setState({
			showButton: false
		})
		console.log("Por entrar al fetch...")
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
				console.log(data.status)
			})
			.catch(err => console.error(err))
	}

	render() {
		return(
			<View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "grey"}}>
				<Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}> {this.state.email} </Text>
				<Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}> {this.state.password} </Text>
				<Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}> {this.rolString(this.state.rol)} </Text>
				<Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}> {this.state.dni} </Text>
				{
					this.state.showButton ? 
						<View style={{marginTop: 20}}>
							<TouchableOpacity onPress={() => {this.fetchCreate()}} style={{backgroundColor: "blue", borderRadius: 15, borderWidth: 3, borderColor: "white"}}>
								<Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>  Crear  </Text>
							</TouchableOpacity>
						</View>
					: <View></View>
				}
			</View>
		)
	}
}