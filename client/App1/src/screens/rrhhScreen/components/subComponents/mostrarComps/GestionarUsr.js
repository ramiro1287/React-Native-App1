import React, {Component} from "react"
import {View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity} from "react-native"
import moment from "moment"
import {api} from "../../../../../config"

export default class GestionarUsr extends Component {

	constructor() {
		super()
		this.state = {
			showModal: false,
			showFiltrarModal: false,
			tareaModal: {},
			filtroYYYY: moment().year(),
			filtroMM: moment().month(),
			monthSelected: "",
			yearSelected: "",
			usrTareas: []
		}
		this.modalRender = this.modalRender.bind(this)
		this.showTarea = this.showTarea.bind(this)
		this.mesString = this.mesString.bind(this)
		this.modalFiltrarRender = this.modalFiltrarRender.bind(this)
	}

// ------------------------------------------------------------------------------------- componentDidMount()

	componentDidMount() {
		fetch(`http://${api}:5000/tareas/mostrar/`, {
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				filtroYYYY: moment().year(this.state.filtroYYYY).format("YYYY"),
				filtroMM: moment().month(this.state.filtroMM).format("MM"),
				id: this.props.usr._id
			})
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					usrTareas: data,
					monthSelected: this.state.filtroMM,
					yearSelected: this.state.filtroYYYY
				})
			})
			.catch(err => console.log(err))
	}

// ------------------------------------------------------------------------------------- componentDidUpdate()

	componentDidUpdate(prevProps, prevState) {
		if (prevState.filtroMM !== this.state.filtroMM || prevState.filtroYYYY !== this.state.filtroYYYY) {
			this.componentDidMount()
		}
	}

// ------------------------------------------------------------------------------------- showTarea()

	showTarea(tarea) {
		this.setState({
			tareaModal: tarea,
			showModal: true
		})
	}

// ------------------------------------------------------------------------------------- mesString()

	mesString(mes) {
		switch(mes) {
			case 0: return "Ene";
			case 1: return "Feb";
			case 2: return "Mar";
			case 3: return "Abr";
			case 4: return "May";
			case 5: return "Jun";
			case 6: return "Jul";
			case 7: return "Ago";
			case 8: return "Sep";
			case 9: return "Oct";
			case 10: return "Nov";
			case 11: return "Dic";
			default: return ""
		}
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

// ------------------------------------------------------------------------------------- modalFiltrarRender()

	modalFiltrarRender() {
		return(
			<Modal style={{alignItems: "center", justifyContent: "center"}} transparent={true}>
				<View style={{flex: 1, backgroundColor: "#363636aa"}}>
					<View style={styles.modalContainer}>
						<View style={{flexDirection: "row", justifyContent: "center"}}>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 0})}} style={this.state.monthSelected === 0 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text style={this.state.monthSelected === 0 ? styles.monthTextStyle : styles.monthTextStyle1}> Ene </Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 1})}} style={this.state.monthSelected === 1 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text  style={this.state.monthSelected === 1 ? styles.monthTextStyle : styles.monthTextStyle1}> Feb </Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 2})}} style={this.state.monthSelected === 2 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text style={this.state.monthSelected === 2 ? styles.monthTextStyle : styles.monthTextStyle1}> Mar </Text>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: "row", justifyContent: "center"}}>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 3})}} style={this.state.monthSelected === 3 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text style={this.state.monthSelected === 3 ? styles.monthTextStyle : styles.monthTextStyle1}> Abr </Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 4})}} style={this.state.monthSelected === 4 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text  style={this.state.monthSelected === 4 ? styles.monthTextStyle : styles.monthTextStyle1}> May </Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 5})}} style={this.state.monthSelected === 5 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text style={this.state.monthSelected === 5 ? styles.monthTextStyle : styles.monthTextStyle1}> Jun </Text>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: "row", justifyContent: "center"}}>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 6})}} style={this.state.monthSelected === 6 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text style={this.state.monthSelected === 6 ? styles.monthTextStyle : styles.monthTextStyle1}> Jul </Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 7})}} style={this.state.monthSelected === 7 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text  style={this.state.monthSelected === 7 ? styles.monthTextStyle : styles.monthTextStyle1}> Ago </Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 8})}} style={this.state.monthSelected === 8 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text style={this.state.monthSelected === 8 ? styles.monthTextStyle : styles.monthTextStyle1}> Sep </Text>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: "row", justifyContent: "center"}}>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 9})}} style={this.state.monthSelected === 9 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text style={this.state.monthSelected === 9 ? styles.monthTextStyle : styles.monthTextStyle1}> Oct </Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 10})}} style={this.state.monthSelected === 10 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text  style={this.state.monthSelected === 10 ? styles.monthTextStyle : styles.monthTextStyle1}> Nov </Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {this.setState({monthSelected: 11})}} style={this.state.monthSelected === 11 ? styles.monthTouchStyle : styles.monthTouchStyle1}>
								<Text style={this.state.monthSelected === 11 ? styles.monthTextStyle : styles.monthTextStyle1}> Dic </Text>
							</TouchableOpacity>
						</View>
						<View style={{alignItems: "center", justifyContent: "center"}}>
							<TouchableOpacity onPress={() => {this.setState({filtroMM: this.state.monthSelected, showFiltrarModal: false})}} style={{marginTop: 25, backgroundColor: "black", borderWidth: 2, borderRadius: 15, borderColor: "white"}}>
								<Text style={{color: "white", fontSize: 15, fontWeight: "bold"}}>  Seleccionar  </Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		)
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<ScrollView style={styles.container}>
				{
					this.state.showFiltrarModal ? this.modalFiltrarRender() : <View></View>
				}
				{
					this.state.showModal ? this.modalRender(this.state.tareaModal) : <View></View>
				}
				<View style={{alignItems: "center", marginBottom: 10, marginTop: 5}}>
					<Text style={styles.titleStyle}>Ver Usuario</Text>
				</View>
				<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
					<Text style={styles.textTitle}>Nombre: </Text>
					<Text style={styles.textValue}>{this.props.usr.nombre}</Text>
				</View>
				<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
					<Text style={styles.textTitle}>Apellido: </Text>
					<Text style={styles.textValue}>{this.props.usr.apellido}</Text>
				</View>
				<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
					<Text style={styles.textTitle}>Edad: </Text>
					<Text style={styles.textValue}>{this.props.usr.fechaNacimiento}</Text>
				</View>
				<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
					<Text style={styles.textTitle}>Sexo: </Text>
					<Text style={styles.textValue}>{this.props.usr.sexo ? "Hombre" : "Mujer"}</Text>
				</View>
				<View style={{flexDirection: "row", marginLeft: 5, alignItems: "center", marginBottom: 8}}>
					<Text style={styles.textTitle}>Tel: </Text>
					<Text style={styles.textValue}>{this.props.usr.tel}</Text>
				</View>
				<View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: 25, marginRight: 25, marginTop: 10}}>
					<TouchableOpacity onPress={() => {this.setState({showFiltrarModal: true})}} style={{backgroundColor: "white", borderColor: "black", borderRadius: 15, borderWidth: 3}}>
						<Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>   Filtrar   </Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {this.props.changeState(false)}} style={{backgroundColor: "white", borderColor: "black", borderRadius: 15, borderWidth: 3}}>
						<Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>   Volver   </Text>
					</TouchableOpacity>
				</View>
				<View style={{alignItems: "center", marginTop: 15}}>
						<Text style={{fontSize: 20, fontWeight: "bold"}}> Tareas de {this.mesString(this.state.filtroMM)} del {this.state.filtroYYYY} </Text>
				</View>
				{
					this.state.usrTareas.map(t => {
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFB0B0aa"
	},
	titleStyle: {
		fontSize: 30,
		fontWeight: "bold"
	},
	textTitle: {
		fontSize: 20,
		fontWeight: "bold"
	},
	textValue: {
		fontSize: 20
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
		backgroundColor: "#AEFFAE",
		borderRadius: 20,
		borderWidth: 3,
		borderColor: "white"
	},
	monthTouchStyle: {
		backgroundColor: "white",
		borderColor: "green",
		borderRadius: 10,
		borderWidth: 2,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15
	},
	monthTouchStyle1: {
		backgroundColor: "white",
		borderColor: "red",
		borderRadius: 10,
		borderWidth: 2,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15
	},
	monthTextStyle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "green"
	},
	monthTextStyle1: {
		fontSize: 18,
		fontWeight: "bold",
		color: "red"
	}
})