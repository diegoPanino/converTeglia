import React from 'react';
import {View,StyleSheet,Image,Dimensions} from 'react-native';

export default function MySplashScreen(props){
	return (
		<View style={styles.mainView}>
			<Image style={styles.image} source={require('../img/splash_icon.png')} />
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
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height / 2
	}
})