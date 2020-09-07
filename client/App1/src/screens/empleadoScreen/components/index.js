import React from "react"
import Screen from "./Screen"
import Perfil from "./subComponents/Perfil"
import CrearTarea from "./subComponents/CrearTarea"
import MostrarTareas from "./subComponents/MostrarTareas"


export const ProfileScreen = ({navigation}) => <Screen navigation={navigation} compScreen={Perfil} />
export const MostrarTareaScreen = ({navigation}) => <Screen navigation={navigation} compScreen={MostrarTareas} />
export const CrearTareaScreen = ({navigation}) => <Screen navigation={navigation} compScreen={CrearTarea} />