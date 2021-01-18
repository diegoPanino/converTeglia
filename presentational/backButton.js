import React from 'react';
import {Text,TouchableOpacity,Image,StyleSheet} from 'react-native';

const bckBtn = require('../img/backButtonBAD.png');
const styles = StyleSheet.create({
backButton:{
		position:'absolute',
		bottom:0,
		left:0,
		height:'55%',
		width:'55%',
	},
	ico:{
		fontSize:50
	}
})
export default function BackButton({navigation,blurRadius}){
	if(!navigation.canGoBack()){
		return null
	}
	else{
		return(
			<TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
				<Image blurRadius={blurRadius} source={bckBtn} style = {styles.backButton} />				
			</TouchableOpacity>	
		);
	}
}

