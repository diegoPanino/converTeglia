import React from 'react';
import {View,Modal,StyleSheet,useWindowDimensions} from 'react-native';
import {Button,Icon} from 'native-base';
import MyText from './MyText';
import * as KitchenMath from '../api/kitchenMath';

export default function ModalMessage(props){
	const {close,confirm,showModal,selectedTray} = props;
	const {dim,key,servs} = selectedTray
	const {area,type} = KitchenMath.getAreaByType(dim,key)
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;
	const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		top:windowHeight/3,
		height:windowHeight/3.8,
		width:windowWidth-40,
		margin: 20,
    	backgroundColor: "white",
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
	  extraData:{
	  	fontWeight:'bold',
	 	textAlign:'center',
	 	marginTop:10,
	  },
	  convertButton:{
	  	position:'absolute',
	  	right:20,
	  	bottom:5,
	  },
	  changeButton:{
	  	position:'absolute',
	  	left:20,
	  	bottom:5,
	  },
	  selectedTray:{
	  	flex:1,
	  	alignItems:'center',
	  	marginBottom:50,
	  	marginTop:10,
	  },
	  flex1:{
	  	flex:1,
	  },
	  bold:{
	  	fontWeight:'bold'
	  },
	  ico:{
	  	fontSize:18,
	  },
	  center:{
	  	textAlign:'center',
	  },
	  h4:{
	  	fontSize:18
	  },
	  btnText:{
	  	fontSize:22
	  }
	})

	const onConfirmTray = () =>{
		const {area} = KitchenMath.getAreaByType(dim,key)
		confirm(area)
	}

	return (
		<Modal animationType='slide' transparent={true} visible={showModal}>
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
				<Button style={styles.changeButton} rounded transparent onPress={close}>
					<MyText myStyle={styles.btnText}>CAMBIA</MyText>
				</Button>
				<Button style={styles.convertButton} rounded transparent onPress={()=>onConfirmTray()}>
					<MyText myStyle={styles.btnText}>CONVERTI</MyText>
				</Button>
			</View>
		</Modal>
		);
}