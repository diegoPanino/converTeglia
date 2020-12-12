import React from 'react';
import {View,Text,Modal,StyleSheet,useWindowDimensions} from 'react-native';
import {Button,Icon} from 'native-base';
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
		height:windowHeight/4.5,
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
	  closeButton:{
	  	position:'absolute',
	  	right:20,
	  	bottom:5,
	  },
	  deleteButton:{
	  	position:'absolute',
	  	left:20,
	  	bottom:5,
	  },
	  selectedTray:{
	  	flex:1,
	  	alignItems:'center',
	  	marginBottom:30,
	  	marginTop:10,
	  },
	  flex1:{
	  	flex:1,
	  },
	  bold:{
	  	fontWeight:'bold'
	  },
	  ico:{
	  	fontSize:15,
	  },
	  center:{
	  	textAlign:'center',
	  }
	})

	return (
		<Modal animationType='slide' transparent={true} visible={showModal}>
			<View style={styles.modalView}>
				<View>
					<Text style={styles.center}>La teglia che userai per cucinare:</Text>
				</View>
				<View style={styles.selectedTray}>
					<View style={styles.flex1}>
						<Text style={styles.bold}>{type}</Text>
					</View>
					<View style={styles.flex1}>
						<Text style={styles.bold}>{dim}cm</Text>
					</View>
					<View style={styles.flex1}>
						<Text style={styles.bold}>{servs}
							<Icon name='md-person' style={styles.ico} />
						</Text>
					</View>
				</View>
				<Button style={styles.closeButton} rounded transparent onPress={close}>
					<Text>CAMBIA TEGLIA</Text>
				</Button>
				<Button style={styles.deleteButton} rounded transparent onPress={confirm}>
					<Text>CONVERTI</Text>
				</Button>
			</View>
		</Modal>
		);
}