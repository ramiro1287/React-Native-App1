import React, {Component} from "react"
import {Text, View, StyleSheet, TextInput, ScrollView, Modal, TouchableOpacity} from "react-native"
import moment from "moment"
import {api} from "../../../../../config"

export default class PerfilUpdate extends Component {

	constructor() {
		super()
		this.state = {
			checkOK: false,
			nombre: "",
			apellido: "",
			fechaNacimiento: "",
			sexo: true,
			tel: "",
			showModal: false,
			textModal: "",
			fechaDD: "",
			fechaMM: "",
			fechaYYYY: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.fetchUpdate = this.fetchUpdate.bind(this)
		this.checkInputs = this.checkInputs.bind(this)
		this.validarFecha = this.validarFecha.bind(this)
	}

// ------------------------------------------------------------------------------------- componentDidMount()

	componentDidMount() {
		this.setState({
			fechaDD: this.props.fechaDD,
			fechaMM: this.props.fechaMM,
			fechaYYYY: this.props.fechaYYYY,
			nombre: this.props.nombre,
			apellido: this.props.apellido,
			sexo: this.props.sexo,
			tel: this.props.tel
		})
	}

// ------------------------------------------------------------------------------------- fetchUpdate()

	fetchUpdate() {
		fetch(`http://${api}:5000/users/updateUser`, {
			method: "put",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				nombre: this.state.nombre,
				apellido: this.state.apellido,
				fechaNacimiento: this.state.fechaNacimiento,
				sexo: this.state.sexo,
				tel: this.state.tel
			})
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					nombre: "",
					apellido: "",
					fechaNacimiento: "",
					tel: "",
					fechaDD: "",
					fechaMM: "",
					fechaYYYY: ""
				})
			})
			.then(() => {this.props.changeState(false)})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- handleChange()

	handleChange(textUpdated, nameProp) {
		this.setState({
			[nameProp]: textUpdated
		})
	}

// ------------------------------------------------------------------------------------- validarFecha()

	validarFecha(dd, mm, yyyy) {
		if (dd !== "" && mm !== "" && yyyy !== "") {
			const yearActual = moment().year()
			if ((Number(dd) >= 1 && Number(dd) <= 31) && (Number(mm) >= 1 && Number(mm) <= 12) && (Number(yyyy) >= (yearActual-100) && Number(yyyy) <= yearActual)) {
				return false
			}
			else {
				return true
			}
		}
		else {
			return true
		}
	}

// ------------------------------------------------------------------------------------- checkInputs()

	async checkInputs() {
		if (this.validarFecha(this.state.fechaDD, this.state.fechaMM, this.state.fechaYYYY)) {
			this.setState({
				showModal: true,
				textModal: "Fecha Invalida..."
			})
		}
		else {
			if ((this.state.fechaDD).length === 1) {
				await this.setState({
					fechaDD: String("0" + this.state.fechaDD)
				})
			}
			if ((this.state.fechaMM).length === 1) {
				await this.setState({
					fechaMM: String("0" + this.state.fechaMM)
				})
			}
			const fecha = `${this.state.fechaDD}/${this.state.fechaMM}/${this.state.fechaYYYY}`
			await this.setState({fechaNacimiento: fecha})
			this.fetchUpdate()
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

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<ScrollView style={styles.container}>
				{
					this.state.showModal ? this.modalRender(this.state.textModal) : <View></View>
				}
				<View style={{alignItems: "center", marginBottom: 10, marginTop: 5}}>
					<Text style={styles.titleStyle}>Update Profile</Text>
				</View>
				<View style={{marginBottom: 20}}>
					<Text style={styles.textTitle}>Nombre</Text>
					<TextInput style={styles.inputStyle} value={this.state.nombre} onChangeText={textUpdated => {this.handleChange(textUpdated, "nombre")}} />
				</View>
				<View style={{marginBottom: 20}}>
					<Text style={styles.textTitle}>Apellido: </Text>
					<TextInput style={styles.inputStyle} value={this.state.apellido} onChangeText={textUpdated => {this.handleChange(textUpdated, "apellido")}} />
				</View>
					<View style={{alignItems: "center", marginBottom: 20}}>
						<Text style={{fontSize: 20, fontWeight: "bold"}}>Sexo: </Text>
						<View style={{flexDirection: "row"}}>
							<TouchableOpacity style={this.state.sexo ? styles.touchContainer : styles.touchContainer1} onPress={() => {this.setState({sexo: true})}}>
								<Text style={this.state.sexo ? styles.touchText : styles.touchText1}>  Hombre  </Text>
							</TouchableOpacity>

							<TouchableOpacity style={!this.state.sexo ? styles.touchContainer : styles.touchContainer1} onPress={() => {this.setState({sexo: false})}}>
								<Text style={!this.state.sexo ? styles.touchText : styles.touchText1}>  Mujer  </Text>
							</TouchableOpacity>
						</View>
					</View>
				<View style={{marginBottom: 20}}>
					<Text style={styles.textTitle}>Fecha Nacimiento: </Text>
					<View style={{flexDirection: "row", alignSelf: "center"}}>
						<TextInput keyboardType={"numeric"} style={[styles.fechaStyle, {width: "13%"}]} value={this.state.fechaDD} onChangeText={textUpdated => {this.handleChange(textUpdated, "fechaDD")}} />
						<Text style={{fontSize: 20, fontWeight: "bold"}}> / </Text>
						<TextInput keyboardType={"numeric"} style={[styles.fechaStyle, {width: "13%"}]} value={this.state.fechaMM} onChangeText={textUpdated => {this.handleChange(textUpdated, "fechaMM")}} />
						<Text style={{fontSize: 20, fontWeight: "bold"}}> / </Text>
						<TextInput keyboardType={"numeric"} style={[styles.fechaStyle, {width: "23%"}]} value={this.state.fechaYYYY} onChangeText={textUpdated => {this.handleChange(textUpdated, "fechaYYYY")}} />
					</View>
				</View>
				<View style={{marginBottom: 20}}>
					<Text style={styles.textTitle}>Tel: </Text>
					<TextInput keyboardType={"numeric"} style={styles.inputStyle} value={this.state.tel} onChangeText={textUpdated => {this.handleChange(textUpdated, "tel")}} />
				</View>
				<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
					<TouchableOpacity onPress={() => {this.checkInputs()}} style={{borderRadius: 10, marginRight: 10, borderWidth: 2, borderColor: "white", backgroundColor: "black"}}>
						<Text style={{color: "white", fontSize: 15}}>  Update  </Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {this.props.changeState(false)}} style={{borderRadius: 10, marginRight: 10, borderWidth: 2, borderColor: "white", backgroundColor: "black"}}>
						<Text style={{color: "white", fontSize: 15}}>  Volver  </Text>
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
		backgroundColor: "#B2FFAFaa"
	},
	titleStyle: {
		fontSize: 30,
		fontWeight: "bold",
		color: "red"
	},
	textTitle: {
		fontSize: 20,
		fontWeight: "bold",
		alignSelf: "center"
	},
	inputStyle: {
		fontSize: 20,
		backgroundColor: "white",
		paddingTop: 3,
		paddingBottom: 5,
		borderRadius: 10,
		alignSelf: "center",
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
		fontSize: 15
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
		fontSize: 15
	},
	fechaStyle: {
		fontSize: 20,
		backgroundColor: "white",
		paddingTop: 3,
		paddingBottom: 5,
		borderRadius: 10
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