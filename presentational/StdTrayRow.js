import React,{useState} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

export default React.memo(function StdTrayRow({dim,servs,selected=false}){

	const styles = StyleSheet.create({
		row:{
			height:25,
			flexDirection:'row',
			alignItems:'center',
			justifyContent:'space-evenly',
		},
		rowEl:{
			width:'30%',
		},
		rowIcon:{
			width:50,
			height:25,
		}
	})

	return (
		<View style={styles.row}>
			<Text style={styles.rowEl}>{dim}cm</Text>
			<Text style={styles.rowEl}>{servs}</Text>
			<View styles={styles.rowIcon}>
				{(selected && <Icon name='restaurant-outline'/>) || 
								<TouchableOpacity style={styles.rowIcon} 
									onPress={()=>console.log('touch')}>
								</TouchableOpacity> }
			</View>
		</View>
		);
})