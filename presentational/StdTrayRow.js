import React,{useState} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import {setMyTrayAction} from '../redux/actions';

function StdTrayRow({trayKey,dim,servs,selected,setMyTrayAction}){

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

	const choiceHandler=()=>{
		setMyTrayAction(trayKey)
	}

	return (
		<View style={styles.row}>
			<Text style={styles.rowEl}>{dim}cm</Text>
			<Text style={styles.rowEl}>{servs}</Text>
			<View styles={styles.rowIcon}>
				{(selected && <Icon name='restaurant-outline'/>) || 
								<TouchableOpacity style={styles.rowIcon} 
									onPress={()=>choiceHandler()}>
								</TouchableOpacity> }
			</View>
		</View>
		);
}
export default connect(null,{setMyTrayAction})(StdTrayRow)