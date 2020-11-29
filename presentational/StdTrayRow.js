import React,{useState} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {setMyTrayAction} from '../redux/actions';

export default function StdTrayRow({tray,onSelect}){
	const {dim,servs,key,selected} = tray
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
		<TouchableOpacity style={styles.row} onPress={()=>onSelect(key)}>
			<Text style={styles.rowEl}>{dim}cm</Text>
			<View style={styles.rowEl}>
				<Text>{servs}</Text>
				<Icon name='md-person-outline'/>
			</View>
			<View styles={styles.rowIcon}>
				{(selected && <Icon name='restaurant-outline'/>) || 
								<TouchableOpacity style={styles.rowIcon}
									onPress={()=>onSelect(key)}>
								</TouchableOpacity> }
			</View>
		</TouchableOpacity>
		);
}