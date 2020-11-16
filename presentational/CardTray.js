import React,{useEffect,useState} from 'react';
import {View,Text,Image,StyleSheet,TextInput,Dimensions} from 'react-native';
import {Item , Input , Label , Button} from 'native-base';
import Fade from 'react-native-fade';

const styles = StyleSheet.create({
	card:{
		height:200,
		width:200,
		borderWidth:1,
		borderColor:'black',
	},
	img:{
		borderWidth:1,
		borderColor:'green',
		height:150,
		width:200,
	},
	input:{
		flex:1,
		backgroundColor:'yellow'
	}
})

const squareTray = require ('../img/quadrata.png');
const rectTray = require('../img/rettangolare.png');
const circleTray = require('../img/rotonda.png');
const trays = [rectTray,circleTray,squareTray]

/*const InputTray = ({type}) =>{
	switch(type){
		case 'rectTray': return <Input placeholder='Quanto misurano i 2 lati della teglia?' />
		case 'squareTray': return <Input placeholder='Quale è il lato della teglia?' />
		case 'circleTray': return <Input placeholder='Che diametro ha la teglia ?' />
		default: return <Text>Tipo teglia non trovato. C'è un errore</Text>
	}
}*/

export default function ({type}){
	const [visible,setVisible] = useState(false)
	useEffect(()=>{
		setVisible(true)
		return (()=> setVisible(false))
	},[type])

	return (
		<View style = {styles.card}>
			<Image source = {trays[type]} style = {styles.img}/>
			<View style = {styles.input}>
				<Fade visible={visible} direction='down' duration={15000} >
					<Text>{`Tipo teglia: ${type}`}</Text>
				</Fade>
			</View>
		</View>
		)
}
