import React from 'react';
import {View,Text,StyleSheet} from 'react-native'

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
})

export default function MyTrayScreen(){
	return (
		<View style={styles.view}><Text>MyTrayScreen</Text></View>
		);
}