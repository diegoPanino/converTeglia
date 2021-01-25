import React,{useState} from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ModalMessage from './ModalMessage';
import MyText from './MyText';

export default function CustomTrayRow({tray,onErase,onSelect}){
	const {name,dim,servs,selected,key} = tray
	const [showDelModal,setShowDelModal] = useState(false)

	const deleteTray=()=>{					//delete the tray, if selected, select the standard tray
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
				<Icon style={styles.text} name='md-person' />
			</View>
			<View style={styles.choice}>
				{(	selected && 
					<Icon style={[styles.icoSize,styles.selectIco]} name='restaurant-outline'/>)
				}
				<TouchableOpacity onPress={()=>setShowDelModal(true)}>
					<Icon style={styles.icoSize} name='trash-outline' />
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
const styles = StyleSheet.create({
	rowContainer:{
		flexDirection:'row',
		height:35,
		borderBottomWidth:0.8,
		borderColor:'#FFDCBA',
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
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
	selectIco:{
		marginRight:10,
	},
	text:{
		fontSize:18
	},
	icoSize:{
		fontSize:28,
		alignSelf:'center'
	}
})