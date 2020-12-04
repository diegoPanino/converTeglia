import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet, Image, TouchableOpacity, 
		TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const styles= StyleSheet.create({
	rowContainer:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
	},
	pickerContainer:{
		flex:1,
		justifyContent:'center',
		textAlign:'center',
		alignContent:'center',
		alignItems:'center',
		width:150,
	},
	picker:{
		backgroundColor:'transparent',
		flex:1,
		marginLeft:50,
		width:80,
	},
	text:{
		flex:1,
	},
})

export default function MyPicker(){

	let nums=[];
	for(let i = 1;i<=40;i++){
		nums.push(i)
	}
	const pickers = nums.map(i=>{
		return <Picker.Item label={`${i}`} value={i} key={i}/>
	})

	return (
		<View style={styles.rowContainer}>
			<View style={styles.pickerContainer}> 
				<Picker style={styles.picker} mode='dropdown'>
					{pickers}
				</Picker>
			</View>
				<Text style={styles.text}>X</Text>
			<View style={styles.pickerContainer}> 
				<Picker style={styles.picker} mode='dropdown'>
					{pickers}
				</Picker>
			</View>
				<Text style={styles.text}>cm</Text>
			
		</View>
		)
}