import React from 'react';
import {Text,View,StyleSheet} from 'react-native';

export default function StdTrayRow({dim,servs}){
	const styles = StyleSheet.create({
		row:{
			flex:1,
			flexDirection:'row',
			justifyContent:'space-between',
			margin:10,
		}
	})
	return (
		<View style={styles.row}>
			<Text>Dimension: {dim}</Text>
			<Text>Persone: {servs}</Text>
		</View>
		);
}