import React,{useEffect,useState} from 'react';
import {View,Image,StyleSheet} from 'react-native';


const styles = StyleSheet.create({
	card:{
		height:200,
		width:200,
		elevation:5,
		backgroundColor:'#fef1d8', //surface
		borderRadius:10,
	},
	img:{
		height:150,
		width:200,
	},
	input:{
		flex:1,
	}
})

const squareTray = require ('../img/quadrata.png');
const rectTray = require('../img/rettangolare.png');
const circleTray = require('../img/rotonda.png');
const trays = [rectTray,circleTray,squareTray]

export default function ({type}){
	const [visible,setVisible] = useState(false)
	useEffect(()=>{
		setVisible(true)
		return (()=> setVisible(false))
	},[type])

	return (
		<View style = {styles.card}>
			<Image source = {trays[type]} style = {styles.img}/>
		</View>
		)
}