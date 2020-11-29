import React,{useState} from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import ModalMessage from './ModalMessage';

const styles = StyleSheet.create({
	rowContainer:{
		flexDirection:'row',
	},
	name:{
		flex:2,
	},
	dim:{
		flex:1,
	},
	servs:{
		flex:1,
	},
	choice:{
		flex:2,
	},
})

export default function CustomTrayRow({tray,onErase,onSelect}){
	const {name,dim,servs,selected,key} = tray
	const [showDelModal,setShowDelModal] = useState(false)

	const deleteTray=()=>{
		if(selected)
			onSelect('0.2')
		onErase(key)
		setShowDelModal(false)
	}

	return (
		<View>
		<TouchableOpacity style={styles.rowContainer} onPress={()=>onSelect(key)}>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.dim}>{dim}</Text>
			<Text style={styles.servs}>{servs}</Text>
			{(selected && 
				<Icon name='restaurant-outline'/>) || 
				<TouchableOpacity style={styles.choice} onPress={()=>onSelect(key)}>
				</TouchableOpacity>}
			<TouchableOpacity style={styles.choice} onPress={()=>setShowDelModal(true)}>
				<Icon name='trash-outline' />
			</TouchableOpacity>
		</TouchableOpacity>
		<ModalMessage showModal={showDelModal}
					  message='Sei sicura di eliminare la teglia?'
					  extraData={name}
					  confirm = {()=>deleteTray()}
					  close={()=>setShowDelModal(false)} />
		</View>
		);
}