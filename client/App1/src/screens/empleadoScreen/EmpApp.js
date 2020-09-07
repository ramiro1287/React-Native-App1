import React, {Component} from "react"
import {Dimensions, View, Text} from "react-native"
import {createAppContainer} from "react-navigation"
import {createDrawerNavigator} from "react-navigation-drawer"
import SlideBarLook from "./SlideBarLook"
import {ProfileScreen, CrearTareaScreen, MostrarTareaScreen} from "./components/index"
import {api} from "../../config"

export default class EmpApp extends Component {

	constructor() {
		super()
		this.state = {
			nombre: "",
			apellido: ""
		}
		this.handleNavigator = this.handleNavigator.bind(this)
	}

// ------------------------------------------------------------------------------------- componentDidMount()

	componentDidMount() {
		fetch(`http://${api}:5000/users/getUser`)
			.then(res => res.json())
			.then(data => {
				this.setState({
					nombre: data.nombre,
					apellido: data.apellido
				})
			})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- handleNavigator()

	handleNavigator() {
		const DrawerNavigator = createDrawerNavigator({
				ProfileScreen: {
					screen: ProfileScreen,
					navigationOptions: {
						title: "Perfil"
					}
				},
				MostrarTareaScreen: {
					screen: MostrarTareaScreen,
					navigationOptions: {
						title: "Mostrar Tareas"
					}
				},
				CrearTareaScreen: {
					screen: CrearTareaScreen,
					navigationOptions: {
						title: "Agregar Tarea"
					}
				}
			},
			{
				contentComponent: props =>
				<SlideBarLook
					{...props}
					nombre={this.state.nombre}
					apellido={this.state.apellido}
					changeState={this.props.changeState}
				/>,
				drawerWidth: Dimensions.get("window").width * 0.75,
				hideStatusbar: true,
				contentOptions: {
					activeBackgroundColor: "#D8D8D8aa",
					activeTintColor: "black"
				}
			}
		)
		return createAppContainer(DrawerNavigator)
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		const EmpleApp = this.handleNavigator()
		return(
			<EmpleApp />
		)
	}
}