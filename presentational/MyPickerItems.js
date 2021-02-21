import React from 'react';
import {Text,TouchableOpacity,StyleSheet} from 'react-native';

export default function MyPickerItems(props){
	const {value,label,onChangeValue,itemStyle={}} = props

	return (
		<TouchableOpacity style={[styles.pickerItem,itemStyle]} onPress={()=>onChangeValue(value)}>
			<Text>{label || value}</Text>
		</TouchableOpacity>
		)
}
const styles = StyleSheet.create({
	pickerItem:{
		borderBottomWidth:1,
		padding:5,
		justifyContent:'center',
		alignItems:'center',
	},	
})
