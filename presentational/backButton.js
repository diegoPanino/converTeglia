import React from 'react';
import {Text,TouchableOpacity,Image,StyleSheet} from 'react-native';

const bckBtn = require('../img/backButtonBAD.png');
const styles = StyleSheet.create({
	backButton:{
		flex:1,	
		justifyContent:'flex-end',
		alignItems:'flex-start',
	},
	backButtonImg:{
		resizeMode:'cover',
		height:50,
		width:150,
	}
})
export default function BackButton({navigation,blurRadius,disabled}){
	if(!navigation.canGoBack()){
		return null
	}
	else{
		return(
			<TouchableOpacity style = {styles.backButton} disabled={disabled} onPress={()=>navigation.goBack()}>
				<Image blurRadius={blurRadius} source={bckBtn} style = {styles.backButtonImg} />				
			</TouchableOpacity>	
		);
	}
}

