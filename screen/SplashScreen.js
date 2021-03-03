import React from 'react';
import {View,StyleSheet,Image,useWindowDimensions} from 'react-native';

export default function MySplashScreen(props){
	const {height,width} = useWindowDimensions()
	return (
		<View style={styles.mainView}>
			<Image style={[styles.image,{width:width,height:height/2}]} source={require('../img/splash_icon.png')} />
		</View>
		)
}

const styles = StyleSheet.create({
	mainView:{
		flex:1,
		justifyContent:'center',
		backgroundColor:'#feebc4'
	},
	image:{
		marginBottom:'30%',
	}
})