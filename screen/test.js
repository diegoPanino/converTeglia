import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MyPicker from '../presentational/MyPicker.js';
import MyPickerItems from '../presentational/MyPickerItems.js';

const unitss = ['g','kg','ml','dl','l','CT','ct','tz',' ','g','kg','ml','dl','l','CT','ct','tz',' ','g','kg','ml','dl','l','CT','ct','tz',' ','g','kg','ml','dl','l','CT','ct','tz',' ']
const num= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
export default function Test(){
	const [value,setValue] = useState()

	return (
		<View style={styles.mainView}>
			<View style={styles.pickerContainer}>
				<MyPicker 	selectValue={5}
							textStyle={{fontSize:26}}
							values={num}
							onValueChange={(item)=>setValue(item)}
				/>
			</View>
			<View style={styles.selection}>
				<Text>{value}</Text>
			</View>
		</View>
		)
}

const styles = StyleSheet.create({
	mainView:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		width:'100%'
	},
	pickerContainer:{
		flex:1,
		justifyContent:'center'
	},
	selection:{
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		bottom:10,
		height:50,
		width:50,
		borderWidth:1,
	}
})