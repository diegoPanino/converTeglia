import React,{useState,useEffect,useRef} from 'react';
import {Dimensions, View, Text, StyleSheet, Button, Image, TouchableOpacity,Animated} from 'react-native';
import {withBadge} from 'react-native-elements';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import BackButton from '../presentational/backButton';
import ConvertButton from '../presentational/ConvertButton';
import { BlurView } from "@react-native-community/blur";
import {toggleChangedIcoAction} from '../redux/actions';

const logo = require('../img/Converteglia.jpg');
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
		backgroundColor:'#FFDCBA', //background

	},
	logoContainer:{
		marginTop:15,
		height:'50%',
	},
	logo:{
		//resizeMode:'contain',
		height: height *0.090,
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
	badgeStyleServs:{
		backgroundColor:'#feaa52',
		borderColor:'#e8871e',
		padding:5,
	},
	badgeStyle:{
		backgroundColor:'#feaa52',		//BUTTON COLOR PRIMARY
		borderColor:'#e8871e',
		padding:2,
	},
	color:{
		color:'black'					//TEXT COLOR
	}
})

function Header({scene,previous,navigation,settings,system,toggleChangedIcoAction}){
	let select = settings.selection
	let trayIndex = Math.trunc(select.key)
	const option = scene.descriptor
	const blur = system.blur ? 3 : 0
	const {changedIco} = system
	const {fastConv} = system
	const BadgedImage = withBadge(<Text style={styles.color}>{select.servs}<Icon name='md-person' style={{fontSize:16}}/></Text>,
		{top:22,right:5,badgeStyle:styles.badgeStyleServs})(Image)
	const BadgedImg = withBadge(<Text style={styles.color}>{select.dim}cm</Text>,
		{right:5,badgeStyle:styles.badgeStyle})(BadgedImage)
	const scale = useRef(new Animated.Value(1)).current

	useEffect(()=>{
		if(changedIco){
			Animated.sequence([
				Animated.timing(scale,{
					toValue:0,
					duration:300,
					useNativeDriver:true
				}),
				Animated.timing(scale,{
					toValue:1,
					duration:300,
					useNativeDriver:true
				})])
				.start(finished=>{
					if(finished)
						toggleChangedIcoAction();
				})
		}
	},[changedIco])

	return (
		<View style={styles.header}>
			<View style={styles.logoContainer}>
				<Image blurRadius={blur} source = {logo} style = {styles.logo} />
			</View>
			{fastConv 
			? 	<ConvertButton blurRadius={blur} navigation={navigation} />
			: 	<BackButton blurRadius={blur} navigation={navigation} />
			}
			<View style = {styles.rightMenu}>
			{!fastConv && <TouchableOpacity onPress={()=>navigation.navigate('HistoryScreen')}> 
					<Image blurRadius={blur} source={historyBtn} style = {styles.historyBtn} />	
				</TouchableOpacity>
			}
				<Animated.View style={[{transform:[{scale}]}]} >
				<TouchableOpacity onPress={()=>navigation.navigate('MyTrayScreen')}> 
					{system.blur 
						? <Image blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>
						: <BadgedImg blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>	
					}
				</TouchableOpacity>
				</Animated.View>
			</View>
		</View>
		);
}
mapStateToProps = state => ({
	settings: state.settings,
	system: state.system	
})
export default connect(mapStateToProps,{toggleChangedIcoAction})(Header);