import React from 'react',
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet, Image, TouchableOpacity, 
		TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function MyPicker(){

	let nums=[];
	for(let i = 1;i<=40;i++){
		nums.push(i)
	}
	const pickers = nums.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

	return (
		<View style={styles.rowContainer}>
			<Picker>
			</Picker>
			<Text>X</Text>
			<Picker>
			</Picker>
			<Text>cm</Text>
		</View>
		)
}