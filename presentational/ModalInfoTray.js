import React from 'react';
import {View,StyleSheet,TouchableOpacity,useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MyText from './MyText';
import * as KitchenMath from '../api/kitchenMath';
import TutorialBox from './tutorial/TutorialBox.js';

export default function ModalMessage(props){
	const {height,width} = useWindowDimensions()
	const {close,confirm,showModal,selectedTray,tutorial} = props;
	const {dim,key,servs} = selectedTray
	const {area,type} = KitchenMath.getAreaByType(dim,key)

	const onConfirmTray = () =>{
		const {area} = KitchenMath.getAreaByType(dim,key)
		confirm(area)
	}

	return (
		<View style={[styles.mainView,{height:height*0.76,width:width}]}>
		{tutorial && <TutorialBox type='selectedTray' reduxFunction={()=>onConfirmTray()} />}
			<View style={styles.contentView}>
				<View style={styles.contentTextView}>
					<MyText myStyle={[styles.center,styles.h4,styles.textUnderline]}>La teglia che userai per cucinare:</MyText>
				</View>
				<View style={styles.flex1}>
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
				<View style={styles.rowContainer}>
					<View style={styles.changeButton}>
						<TouchableOpacity style={styles.btn} onPress={close}>
							<MyText myStyle={styles.btnText}>CAMBIA</MyText>
						</TouchableOpacity>
					</View>
					<View style={styles.convertButton}>
						<TouchableOpacity style={styles.btn} onPress={()=>onConfirmTray()}>
							<MyText myStyle={styles.btnText}>CONVERTI</MyText>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
		);
}
const styles = StyleSheet.create({
	mainView:{
		position:'absolute',
		top:'10%',
		left:0,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'transparent',
		zIndex:6,
	},
	contentView:{
		maxWidth:600,
		flex:0.5,
		alignItems:'center',
		marginRight: 20,
		marginLeft:20,
    	backgroundColor: "#fef1d8",			//SURFACE
	    borderRadius: 20,
	    padding: 15,
	    shadowColor: "#000",
	    shadowOffset: {
	      width: 0,
	      height: 2
	    },
	    shadowOpacity: 0.25,
	    shadowRadius: 3.84,
	    elevation: 5,
	},
	contentTextView:{
		flex:0.5,
		justifyContent:'center',
	},
	rowContainer:{
		flex:0.6,
		flexDirection:'row',
		alignItems:'flex-end'
	},
	changeButton:{
		flex:1,
		alignItems:'flex-start'
	},
	convertButton:{
		flex:1,
		alignItems:'flex-end'
 	},
	center:{
	  	textAlign:'center',
	  	alignItems:'flex-start'
	},
	h4:{
	  	fontSize:18
	},
	textUnderline:{
		borderBottomWidth:1,
	},
	bold:{
	  	fontWeight:'bold'
	},
	flex1:{
	  	flex:1,
	  	justifyContent:'center',
	  	alignItems:'center'
	},
	ico:{
	  	fontSize:18,
	},
	btn:{
		maxHeight:45,
		backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		padding:5,
		elevation:5,
	},
	btnText:{
		textAlign:'center',
	  	fontSize:22,
	  	color:'#e8871e',			//BUTTON TEXT
	},
})