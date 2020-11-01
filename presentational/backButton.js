import React from 'react';
import {Text,TouchableOpacity,Image,StyleSheet} from 'react-native';

const bckBtn = require('../img/backButton.png');
const styles = StyleSheet.create({
backButton:{
		position:'absolute',
		bottom:5,
		left:5,
		width:75,
		height:75,
	}
})
export default function BackButton({navigation}){
	if(!navigation.canGoBack()){
		return null
	}
	else{
		return(
			<TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
				<Image source={bckBtn} style = {styles.backButton} />
			</TouchableOpacity>	
		);
	}
}