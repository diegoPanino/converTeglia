import React,{useState} from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import ModalMessage from './ModalMessage';
import MyText from './MyText';

const styles = StyleSheet.create({
	rowContainer:{
		flexDirection:'row',
		height:35,
		borderBottomWidth:0.8,
		borderColor:'#FFDCBA',
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		// borderRadius:20,
		// elevation:2,
		// marginBottom:5,
		// marginTop:5,
		// padding:2,
		// paddingLeft:3,
		// paddingRight:3,
		//backgroundColor:'#edd378', //surface
	},
	name:{
		flex:3,
		justifyContent:'center',
		marginLeft:5
	},
	dim:{
		flex:2,
		justifyContent:'center',
		marginLeft:-5
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
		fontSize:18,
	},
	text:{
		fontSize:18
	},
	trashIco:{

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
			<View style={styles.name}><MyText myStyle={styles.text}>{name}</MyText></View>
			<View style={styles.dim}><MyText myStyle={styles.text}>{dim}cm</MyText></View>
			<View style={styles.servs}>
				<MyText myStyle={styles.text}>{servs}</MyText>
				<Icon style={styles.servIco} name='md-person' />
			</View>
			<View style={styles.choice}>
				{(	selected && 
					<Icon style={{marginRight:10}} name='restaurant-outline'/>)
				}
				<TouchableOpacity style={styles.trashIco} onPress={()=>setShowDelModal(true)}>
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