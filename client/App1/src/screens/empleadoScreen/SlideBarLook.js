import React, {Component} from "react"
import {Text, View, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity} from "react-native"
import {DrawerNavigatorItems} from "react-navigation-drawer"
import LogOut from "../LogOut"

export default sideBarLook = props => (
	<View style={{flex: 1}}>
		<View style={styles.headStyle}>
			<View style={{alignSelf: "center"}}>
				<Image style={styles.usrImageStyle} source={require("./lenny.png")} />
				<Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>{props.nombre} {props.apellido}</Text>
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
		backgroundColor: "#3341FF",
		justifyContent: "center"
	},
	bodyStyle: {
		flex: 4,
		backgroundColor: "#9A92FF"
	},
	usrImageStyle: {
		borderRadius: 40,
		resizeMode: "stretch",
		height: 46,
		width: 50,
		marginTop: 10,
		marginBottom: 5
	}
})