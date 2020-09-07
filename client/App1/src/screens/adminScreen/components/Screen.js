import React, {Component} from "react"
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image} from "react-native"

export default class Screen extends Component {

	constructor() {
		super()
	}

// ------------------------------------------------------------------------------------- render()

	render() {
		return(
			<View style={{flex: 1}}>
				<SafeAreaView style={styles.safeAreaStyle}>
					<Image style={styles.imageStyle} source={require("./logoRH.png")} />
					<Text style={styles.titleStyle}>App</Text>
					<TouchableOpacity style={styles.touchableStyle} onPress={this.props.navigation.openDrawer}>
						<Text style={styles.menuBtnStyle}> Menu </Text>
					</TouchableOpacity>
				</SafeAreaView>
				<this.props.compScreen />
			</View>
		)
	}
}

// ------------------------------------------------------------------------------------- styles

const styles = StyleSheet.create({
	safeAreaStyle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#69F064"
	},
	imageStyle: {
		marginLeft: 20,
		marginTop: 5,
		marginBottom: 5,
		resizeMode: "contain",
		height: 60
	},
	titleStyle: {
		fontSize: 30,
		fontWeight: "bold"
	},
	touchableStyle: {
		borderRadius: 10,
		borderColor: "black",
		borderWidth: 2,
		marginRight: 20,
		backgroundColor: "white"
	},
	menuBtnStyle: {
		fontSize: 20,
		fontWeight: "bold"
	}
})