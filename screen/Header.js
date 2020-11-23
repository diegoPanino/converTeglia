import React from 'react';
import {Dimensions, View, Text, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import {withBadge,Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import BackButton from '../presentational/backButton';

const logo = require('../img/logo.png');
const historyBtn = require ('../img/history.png');
const squareTray = require ('../img/quadrata.png');
const rectTray = require('../img/rettangolare.png');
const circleTray = require('../img/rotonda.png');
const trays = [circleTray,rectTray,squareTray];
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
		backgroundColor:'transparent',
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
	},
})

function Header({scene,previous,navigation,settings,system}){

	const select = settings.selection
	const trayIndex = Math.trunc(select.key)
	const option = scene.descriptor
	const blur = system.blur ? 3 : 0
	const BadgedImage = withBadge(`${select.servs} pers`,
		{top:22,right:5,badgeStyle:{backgroundColor:'gray'}})(Image)
	const BadgedImg = withBadge(`${select.dim}cm`,
		{right:5,badgeStyle:{backgroundColor:'gray'}})(BadgedImage)
	
	return (
		<View style={styles.header}>
			<Image blurRadius={blur} source = {logo} style = {styles.logo} />
			<BackButton blurRadius={blur} navigation={navigation} />
			<View style = {styles.rightMenu}>
				<TouchableOpacity onPress={()=>navigation.navigate('HistoryScreen')}> 
					<Image blurRadius={blur} source={historyBtn} style = {styles.historyBtn} />	
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>navigation.navigate('MyTrayScreen')}> 
					<BadgedImg blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>	
				</TouchableOpacity>
			</View>
		</View>
		);
}
mapStateToProps = state => ({
	settings: state.settings,
	system: state.system	
})
export default connect(mapStateToProps)(Header);