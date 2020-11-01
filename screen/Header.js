import React,{useState} from 'react';
import {Dimensions, View, Text, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import BackButton from '../presentational/backButton';

const logo = require('../img/logo.png');
const historyBtn = require ('../img/history.png');
const squareTray = require ('../img/quadrata.png');
const rectTray = require('../img/rettangolare.png');
const circleTray = require('../img/rotonda.png');
const {height,width} = Dimensions.get('screen');
const styles = StyleSheet.create({
	header:{
		height: height *0.18,
		width: width,
		borderBottomWidth:1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	logo:{
		resizeMode:'stretch',
		height: height *0.10,
		width: width,	
	},
	rightMenu:{
		flexDirection:'row',
		position:'absolute',
		right:10,
		bottom:0,
	},
	historyBtn:{
		height:50,
		width:50,
		margin:5
	},
	myTrayBtn:{
		height:50,
		width:50,
		margin:5,
	},
	selected:{
		backgroundColor:'yellow'
	}
})

export default function Header({scene,previous,navigation}){
	const [trayType,setTrayType] = useState(rectTray)
	const option = scene.descriptor
	return (
		<View style={styles.header}>
			<Image source = {logo} style = {styles.logo} />
			<BackButton navigation={navigation} />
			<View style = {styles.rightMenu}>
				<TouchableOpacity onPress={()=>navigation.navigate('HistoryScreen')}> 
					<Image source={historyBtn} style = {styles.historyBtn} />	
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>navigation.navigate('MyTrayScreen')}> 
					<Image source={trayType} style = {styles.myTrayBtn} />	
				</TouchableOpacity>
			</View>
		</View>
		);
}