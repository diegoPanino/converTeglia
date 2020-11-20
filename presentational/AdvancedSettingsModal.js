import React,{useState} from 'react';
import {Modal,View,Text,StyleSheet} from 'react-native';
import {Icon,Button} from 'native-base';
const styles = StyleSheet.create({
	modalStyle:{
		backgroundColor:'gray',
		position:'absolute',
		bottom:0,
		height:'25%',
		width:'100%',
		borderRadius:15,
	},
	settingsBtnIcon:{
		position:'absolute',
		right:0,
	},
	settings:{
		paddingTop:30,
		padding:10,
	}
})
	

export default function AdvancedSettingsModal({hide}){
	return(
			<View style={styles.modalStyle}>
				<Button rounded block light small onPress={hide}>
					<Text>Impostazioni avanzate</Text>
					<Icon style={styles.settingsBtnIcon} name='add-outline' />
				</Button>
				<View style={styles.settings}>
					<Text>Cancella cronologia automaticamente dopo: </Text>
					<Text>Mostra tutorial all'avvio </Text>
				</View>		
			</View>
		);
}