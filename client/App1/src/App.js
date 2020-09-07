import React, {Component} from "react"
import {View, Text} from "react-native"
import Login from "./screens/LoginScreen"
import EmpApp from "./screens/empleadoScreen/EmpApp"
import AdmApp from "./screens/adminScreen/AdmApp"
import RrhhApp from "./screens/rrhhScreen/rrhhApp"
import {api} from "./config"

import UsrCreater from "./UsrCreater"

export default class App extends Component {

	constructor() {
		super()
		this.state = {
			isLogged: false,
			rol: 0
		}
		this.handleRender = this.handleRender.bind(this)
		this.changeState = this.changeState.bind(this)
	}

// ------------------------------------------------------------------------------------- componentDidMount()

	componentDidMount() {
		fetch(`http://${api}:5000/users/check`)
			.then(res => res.json())
			.then(data => {
				if (data.body.usrLogged) {
					const {usrLogged, usrRol} = data.body
					this.changeState(usrLogged, usrRol)
				}
			})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- changeState()

	changeState(logState, rolState) {
		this.setState({
			isLogged: logState,
			rol: rolState
		})
	}

// ------------------------------------------------------------------------------------- handleRender()

	handleRender() {
		if (this.state.isLogged) {
			switch(this.state.rol) {
				case 0: return <EmpApp changeState={this.changeState} />;
				case 1: return <RrhhApp changeState={this.changeState} />;
				default: return <AdmApp changeState={this.changeState} />
			}
		}
		else {
			//return <UsrCreater />
			return <Login changeState={this.changeState} />
		}
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<View style={{flex: 1}}>
				<this.handleRender />
			</View>
		)
	}
}