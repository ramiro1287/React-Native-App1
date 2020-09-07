import React, {Component} from "react"
import {Text, View, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity} from "react-native"
import {DrawerNavigatorItems} from "react-navigation-drawer"
import LogOut from "../LogOut"

export default sideBarLook = props => (
	<View style={{flex: 1}}>
		<View style={styles.headStyle}>
			<View style={{alignSelf: "center"}}>
				<Image style={styles.usrImageStyle} source={require("./homero.png")} />
				<Text style={{fontSize: 18, fontWeight: "bold"}}>{props.nombre} {props.apellido}</Text>
			</View>
		</View>
		<View style={styles.bodyStyle}>
			<DrawerNavigatorItems {...props} />
			<LogOut changeState={props.changeState} />
		</View>
	</View>
)

// ------------------------------------------------------------------------------------- styles

const styles = StyleSheet.create({
	headStyle: {
		flex: 1,
		backgroundColor: "#69F064",
		justifyContent: "center"
	},
	bodyStyle: {
		flex: 4,
		backgroundColor: "#B2FFAF"
	},
	usrImageStyle: {
		borderRadius: 40,
		marginTop: 10,
		marginBottom: 5
	}
})