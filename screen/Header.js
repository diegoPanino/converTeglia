import React,{useState,useEffect,useRef} from 'react';
import {useWindowDimensions, View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Animated} from 'react-native';
import {withBadge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import BackButton from '../presentational/backButton';
import ConvertButton from '../presentational/ConvertButton';
import { BlurView } from "@react-native-community/blur";
import {toggleChangedIcoAction} from '../redux/actions';

const logo = require('../img/logo_name.png');
const historyBtn = require ('../img/history.png');
const squareTray = require ('../img/quadrata.png');
const rectTray = require('../img/rettangolare.png');
const circleTray = require('../img/rotonda.png');
const trays = [circleTray,rectTray,squareTray];

function Header({scene,previous,navigation,settings,system,toggleChangedIcoAction}){
	const select = settings.selection
	const {tutorial} = settings 
	const trayIndex = Math.trunc(select.key)
	const option = scene.descriptor
	const blur = system.blur ? 3 : 0
	const {changedIco} = system
	const {fastConv} = system
	const {height,width} = useWindowDimensions();

	const BadgedImage = withBadge(<Text style={styles.color}>{select.servs}<Icon name='md-person' style={styles.servsIco}/></Text>,
		{top:22,right:5,badgeStyle:styles.badgeStyleServs})(Image)
	const BadgedImg = withBadge(<Text style={styles.color}>{select.dim}{trayIndex === 1 ? '':'cm'}</Text>,
		{right:5,badgeStyle:styles.badgeStyle})(BadgedImage)
	const scale = useRef(new Animated.Value(1)).current

	useEffect(()=>{							//Animation when the selected tray is changed -- need to be improved
		if(changedIco){
			Animated.timing(scale,{
				toValue:0,
				duration:300,
				useNativeDriver:true
			}).start(finished=>{
				if(finished)
					toggleChangedIcoAction()
				Animated.timing(scale,{
					toValue:1,
					duration:300,
					useNativeDriver:true
				}).start()
			})
		}
	},[changedIco])

	return (
		<View style={[styles.header,{height:height*0.18,width:width}]}>
			<View style={styles.logoContainer}>
				<Image source = {logo} style={styles.image}/>
			</View>
			<View style={styles.btnRow}>
				{fastConv
				?	(<View style={styles.singleBtn}>
						<ConvertButton blurRadius={blur} navigation={navigation} />
					</View>
					)
				: 	(<View style={styles.btnRow}>
						<View style={styles.leftClnm}>
							<BackButton disabled={tutorial || system.blur} blurRadius={blur} navigation={navigation} />
						</View>
						<View style = {styles.rightMenu}>
							<TouchableOpacity style={styles.btnContainer} disabled={tutorial || system.blur} onPress={()=>navigation.navigate('HistoryScreen')}> 
				 				<Image blurRadius={blur} source={historyBtn} style = {styles.historyBtn} />	
							</TouchableOpacity>
							<Animated.View style={[{transform:[{scale}]}]} >
								<TouchableOpacity style={styles.btnContainer} disabled={tutorial || system.blur} onPress={()=>navigation.navigate('MyTrayScreen')}> 
								{system.blur 
									? <Image blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>
									: <BadgedImg blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>	
								}
								</TouchableOpacity>
							</Animated.View>
						</View>
					</View>
					)
				}
			</View>
		</View>
		);
}
mapStateToProps = state => ({
	settings: state.settings,
	system: state.system	
})
export default connect(mapStateToProps,{toggleChangedIcoAction})(Header);

const styles = StyleSheet.create({
	header:{
		elevation: 6,
		backgroundColor:'#FFDCBA', //background
	},
	logoContainer:{
		marginTop:15,
		flex:3,
		justifyContent:'center',
		alignItems:'center',
	},
	image:{
		flex:1,
		resizeMode: "cover",
		minHeight:80,
    	justifyContent: "center",
	},
	btnRow:{
		flex:2,
		flexDirection:'row',
		alignItems:'flex-end',
		minHeight:25,
	},
	singleBtn:{
		flex:1,
		alignItems:'center',
	},
	leftClnm:{
		flex:1,
	},
	rightMenu:{
		flex:1,
		flexDirection:'row',
	},
	btnContainer:{
		flex:1,
		alignItems:'flex-end',
	},
	historyBtn:{
		height:50,
		width:50,
	},
	myTrayBtn:{
		height:50,
		width:50,
		margin:5,
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
	},
	servsIco:{
		fontSize:16
	}
})


/*
import React,{useState,useEffect,useRef} from 'react';
import {useWindowDimensions, View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Animated} from 'react-native';
import {withBadge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import BackButton from '../presentational/backButton';
import ConvertButton from '../presentational/ConvertButton';
import { BlurView } from "@react-native-community/blur";
import {toggleChangedIcoAction} from '../redux/actions';

const logo = require('../img/logo_name2.png');
const historyBtn = require ('../img/history.png');
const squareTray = require ('../img/quadrata.png');
const rectTray = require('../img/rettangolare.png');
const circleTray = require('../img/rotonda.png');
const trays = [circleTray,rectTray,squareTray];

function Header({scene,previous,navigation,settings,system,toggleChangedIcoAction}){
	const select = settings.selection
	const {tutorial} = settings 
	const trayIndex = Math.trunc(select.key)
	const option = scene.descriptor
	const blur = system.blur ? 3 : 0
	const {changedIco} = system
	const {fastConv} = system
	const {height,width} = useWindowDimensions();

	const BadgedImage = withBadge(<Text style={styles.color}>{select.servs}<Icon name='md-person' style={styles.servsIco}/></Text>,
		{top:22,right:5,badgeStyle:styles.badgeStyleServs})(Image)
	const BadgedImg = withBadge(<Text style={styles.color}>{select.dim}{trayIndex === 1 ? '':'cm'}</Text>,
		{right:5,badgeStyle:styles.badgeStyle})(BadgedImage)
	const scale = useRef(new Animated.Value(1)).current

	useEffect(()=>{							//Animation when the selected tray is changed -- need to be improved
		if(changedIco){
			Animated.timing(scale,{
				toValue:0,
				duration:300,
				useNativeDriver:true
			}).start(finished=>{
				if(finished)
					toggleChangedIcoAction()
				Animated.timing(scale,{
					toValue:1,
					duration:300,
					useNativeDriver:true
				}).start()
			})
		}
	},[changedIco])

	return (
		<View style={[styles.header,{height:height*0.18,width:width}]}>
			<View style={styles.logoContainer}>
				<Image source = {logo} style={styles.image}/>
			</View>
			<View style={styles.btnRow}>
				<View style={styles.leftClnm}>
			{fastConv 
			? 	<ConvertButton blurRadius={blur} navigation={navigation} />
			: 	<BackButton disabled={tutorial || system.blur} blurRadius={blur} navigation={navigation} />
			}
				</View>
			<View style = {styles.rightMenu}>
			{!fastConv &&	<TouchableOpacity style={styles.historyBtnContainer} disabled={tutorial || system.blur} onPress={()=>navigation.navigate('HistoryScreen')}> 
			 					<Image blurRadius={blur} source={historyBtn} style = {styles.historyBtn} />	
							</TouchableOpacity>
			}
				<Animated.View style={[{transform:[{scale}]}]} >
					<TouchableOpacity style={styles.historyBtnContainer} disabled={tutorial || system.blur} onPress={()=>navigation.navigate('MyTrayScreen')}> 
						{system.blur 
							? <Image blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>
							: <BadgedImg blurRadius={blur} source={trays[trayIndex]} style = {styles.myTrayBtn}/>	
						}
					</TouchableOpacity>
				</Animated.View>
			</View>
			</View>
		</View>
		);
}
mapStateToProps = state => ({
	settings: state.settings,
	system: state.system	
})
export default connect(mapStateToProps,{toggleChangedIcoAction})(Header);

const styles = StyleSheet.create({
	header:{
		elevation: 6,
		backgroundColor:'#FFDCBA', //background
	},
	logoContainer:{
		marginTop:15,
		flex:3,
		justifyContent:'center',
		alignItems:'center',
	},
	image:{
		flex:1,
		resizeMode: "cover",
		minHeight:80,
    	justifyContent: "center",
	},
	btnRow:{
		flex:2,
		flexDirection:'row',
		alignItems:'flex-end',
		minHeight:25,
	},
	leftClnm:{
		flex:1,
	},
	rightMenu:{
		flex:1,
		flexDirection:'row',
	},
	historyBtnContainer:{
		flex:1,
		alignItems:'flex-end',
	},
	myTrayBtnContainer:{
		flex:1,
		alignSelf:'flex-end',
	},
	historyBtn:{
		height:50,
		width:50,
	},
	myTrayBtn:{
		height:50,
		width:50,
		margin:5,
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
	},
	servsIco:{
		fontSize:16
	}
})

*/