import React,{useState} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {setMyTrayAction} from '../redux/actions';

export default function StdTrayRow({tray,onSelect}){
	const {dim,servs,key,selected} = tray
	const styles = StyleSheet.create({
	rowContainer:{
		flexDirection:'row',
		
		height:35,
	},
	name:{
		flex:3,
		justifyContent:'center',
	},
	dim:{
		flex:2,
		justifyContent:'center',
	},
	servs:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-end'
	},
	choice:{
		flex:2,
		flexDirection:'row',
		justifyContent:'center',
	},
	servIco:{
		fontSize:15,
	}
})

	return (
		<View>
		<TouchableOpacity style={styles.rowContainer} onPress={()=>onSelect(key)}
			delayPressIn={5} delayPressOut={5} delayLongPress={5}>
			<View style={styles.name}><Text></Text></View>
			<View style={styles.dim}><Text>{dim}cm</Text></View>
			<View style={styles.servs}>
				<Text>{servs}</Text>
				<Icon style={styles.servIco} name='md-person' />
			</View>
			<View style={styles.choice}>
				{(	selected && 
					<Icon style={{marginRight:10}} name='restaurant-outline'/>)
				}
			</View>
		</TouchableOpacity>
		</View>
		);
}