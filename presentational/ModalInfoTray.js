import React from 'react';
import {View,Modal,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MyText from './MyText';
import * as KitchenMath from '../api/kitchenMath';
import TutorialBox from './tutorial/TutorialBox.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ModalMessage(props){
	const {close,confirm,showModal,selectedTray,tutorial} = props;
	const {dim,key,servs} = selectedTray
	const {area,type} = KitchenMath.getAreaByType(dim,key)

	const onConfirmTray = () =>{
		const {area} = KitchenMath.getAreaByType(dim,key)
		confirm(area)
	}

	return (
		<Modal animationType='slide' transparent={true} visible={showModal}>
		{tutorial && <TutorialBox type='selectedTray' reduxFunction={()=>onConfirmTray()} />}
			<View style={styles.modalView}>
				<View>
					<MyText myStyle={[styles.center,styles.h4]}>La teglia che userai per cucinare:</MyText>
				</View>
				<View style={styles.selectedTray}>
					<View style={styles.flex1}>
						<MyText myStyle={[styles.bold,styles.h4]}>{type}</MyText>
					</View>
					<View style={styles.flex1}>
						<MyText myStyle={[styles.bold,styles.h4]}>{dim}cm</MyText>
					</View>
					<View style={styles.flex1}>
						<MyText myStyle={[styles.bold,styles.h4]}>{servs}
							<Icon name='md-person' style={styles.ico} />
						</MyText>
					</View>
				</View>
				<TouchableOpacity style={[styles.changeButton,styles.btn]} onPress={close}>
					<MyText myStyle={styles.btnText}>CAMBIA</MyText>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.convertButton,styles.btn]} onPress={()=>onConfirmTray()}>
					<MyText myStyle={styles.btnText}>CONVERTI</MyText>
				</TouchableOpacity>
			</View>
		</Modal>
		);
}
const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		top:windowHeight/3,
		height:windowHeight/3.5,
		width:windowWidth-40,
		margin: 20,
    	backgroundColor: "#fef1d8",  //SURFACE
	    borderRadius: 20,
	    padding: 10,
	    shadowColor: "#000",
	    shadowOffset: {
	      width: 0,
	      height: 2
	    },
	    shadowOpacity: 0.25,
	    shadowRadius: 3.84,
	    elevation: 5,
	  },
	center:{
	  	textAlign:'center',
	},
	h4:{
	  	fontSize:18
	},
	selectedTray:{
	  	flex:1,
	  	alignItems:'center',
	  	marginBottom:50,
	  	marginTop:10,
	},
	bold:{
	  	fontWeight:'bold'
	},
	flex1:{
	  	flex:1,
	},
	ico:{
	  	fontSize:18,
	},
	changeButton:{
	  	position:'absolute',
	  	left:20,
	  	bottom:5,
	},
	btn:{
		backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		padding:5,
		elevation:5,
		margin:10,
	},
	btnText:{
	  	fontSize:22,
	  	color:'#e8871e',			//BUTTON TEXT
	},

	convertButton:{
		position:'absolute',
	  	right:20,
	  	bottom:5,
	 },
})