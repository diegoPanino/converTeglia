import React,{useState} from 'react';
import {View,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {setMyTrayAction} from '../redux/actions';
import MyText from './MyText';

export default function StdTrayRow({tray,onSelect}){
	const {dim,servs,key,selected} = tray
	const styles = StyleSheet.create({
	rowContainer:{
		flexDirection:'row',
		height:35,
		borderBottomWidth:0.8,
		borderColor:'#FFDCBA',
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
		alignItems:'center',
	},
	servIco:{
		fontSize:18,
	},
	text:{
		fontSize:18
	},
	selectIco:{
		fontSize:28,
		textAlign:'center',
		marginTop:2,
	}
})

	return (
		<View>
		<TouchableOpacity style={styles.rowContainer} onPress={()=>onSelect(key)}
			delayPressIn={5} delayPressOut={5} delayLongPress={5}>
			<View style={styles.name}><MyText myStyle={styles.text}></MyText></View>
			<View style={styles.dim}><MyText myStyle={styles.text}>{dim}cm</MyText></View>
			<View style={styles.servs}>
				<MyText myStyle={styles.text}>{servs}</MyText>
				<Icon style={styles.servIco} name='md-person' />
			</View>
			<View style={styles.choice}>
				{(	selected && 
					<Icon style={styles.selectIco} name='restaurant-outline'/>)
				}
			</View>
		</TouchableOpacity>
		</View>
		);
}