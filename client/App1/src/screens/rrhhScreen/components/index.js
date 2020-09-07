import React from "react"
import Screen from "./Screen"
import Perfil from "./subComponents/Perfil"
import BorrarUsr from "./subComponents/BorrarUsr"
import CrearUsr from "./subComponents/CrearUsr"
import MostrarUsr from "./subComponents/MostrarUsr"

export const ProfileScreen = ({navigation}) => <Screen navigation={navigation} compScreen={Perfil} />
export const MostrarUsrScreen = ({navigation}) => <Screen navigation={navigation} compScreen={MostrarUsr} />
export const CrearUsrScreen = ({navigation}) => <Screen navigation={navigation} compScreen={CrearUsr} />
export const BorrarUsrScreen = ({navigation}) => <Screen navigation={navigation} compScreen={BorrarUsr} />