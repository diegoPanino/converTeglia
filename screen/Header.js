import React from 'react';
import {Dimensions, View, Text, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import {withBadge,Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import BackButton from '../presentational/backButton';
import ConvertButton from '../presentational/ConvertButton';
import { BlurView } from "@react-native-community/blur";

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
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderBottomWidth:1,
		backgroundColor:'#ffe199', //primary

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
	blurView:{
		position:'absolute',
		left:0,
		top:0,
	},
	blur:{
		position:'absolute',
		left:0,
		top:0,
		zIndex:5,
	},
	badgeStyle:{
		backgroundColor:'#847349',
		borderColor:'#c8bfb5',
	}
})

function Header({scene,previous,navigation,settings,system}){

	const select = settings.selection
	const trayIndex = Math.trunc(select.key)
	const option = scene.descriptor
	const blur = system.blur ? 3 : 0
	const {fastConv} = system
	const BadgedImage = withBadge(`${select.servs} pers`,
		{top:22,right:5,badgeStyle:styles.badgeStyle})(Image)
	const BadgedImg = withBadge(`${select.dim}cm`,
		{right:5,badgeStyle:styles.badgeStyle})(BadgedImage)
	
	return (
		<View style={styles.header}>
			<Image blurRadius={blur} source = {logo} style = {styles.logo} />
			{fastConv 
			? 	<ConvertButton blurRadius={blur} navigation={navigation} />
			: 	<BackButton blurRadius={blur} navigation={navigation} />
			}
			<View style = {styles.rightMenu}>
			{!fastConv && <TouchableOpacity onPress={()=>navigation.navigate('HistoryScreen')}> 
					<Image blurRadius={blur} source={historyBtn} style = {styles.historyBtn} />	
				</TouchableOpacity>
			}
				<TouchableOpacity onPress={()=>navigation.navigate('MyTrayScreen')}> 
					{system.blur 
						? <Image blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>
						: <BadgedImg blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>	
					}
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