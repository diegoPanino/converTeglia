import React,{useState} from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import ModalMessage from './ModalMessage';

const styles = StyleSheet.create({
	rowContainer:{
		flexDirection:'row',
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
		justifyContent:'flex-end'
	},
	servIco:{
		fontSize:15,
	}
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
			<View style={styles.name}><Text>{name}</Text></View>
			<View style={styles.dim}><Text>{dim}cm</Text></View>
			<View style={styles.servs}>
				<Text>{servs}</Text>
				<Icon style={styles.servIco} name='md-person' />
			</View>
			<View style={styles.choice}>
				{(	selected && 
					<Icon style={{marginRight:10}} name='restaurant-outline'/>)
				}
				<TouchableOpacity  onPress={()=>setShowDelModal(true)}>
					<Icon name='trash-outline' />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
		<ModalMessage showModal={showDelModal}
					  message='Sei sicura di eliminare la teglia?'
					  extraData={name}
					  confirm = {()=>deleteTray()}
					  close={()=>setShowDelModal(false)} />
		</View>
		);
}