import React, {Component} from "react"
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {api} from "../config"

export default class LogOut extends Component {

	constructor() {
		super()
		this.handleLogOut = this.handleLogOut.bind(this)
	}

	handleLogOut() {
		fetch(`http://${api}:5000/users/logout`)
			.then(res => res.json())
			.then(data => {
				this.props.changeState(false, 0)
			})
			.catch(err => console.error(err))
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<View style={{flexDirection: "row", marginLeft: 10}}>
				<TouchableOpacity style={styles.touch} onPress={() => {this.handleLogOut()}}>
					<Text style={styles.textStyle}>   Sign-Out   </Text>
				</TouchableOpacity>
			</View>
		)
	}
}

// ------------------------------------------------------------------------------------- styles

const styles = StyleSheet.create({
	touch: {
		marginTop: 5,
		backgroundColor: "black",
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 2
	},
	textStyle: {
		color: "white",
		fontSize: 15,
		fontWeight: "bold"
	}
})