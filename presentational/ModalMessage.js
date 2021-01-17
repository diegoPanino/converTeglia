import React from 'react';
import {View,Modal,StyleSheet,useWindowDimensions} from 'react-native';
import {Button} from 'native-base';
import MyText from './MyText';



export default function ModalMessage(props){
	
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;
	const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		top:windowHeight/3,
		height:windowHeight/4.3,
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
	    elevation: 5
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
	  text:{
	  	fontSize:18,
	  },
	  btnText:{
	  	fontSize:22,
	  }
	})

	const {showModal,message,extraData,close,confirm} = props	

	return(
		<Modal animationType='slide' transparent={true} visible={showModal}>
			<View style = {styles.modalView}>
				<View>
					<MyText myStyle={styles.text}>{message}</MyText>
				</View>
				<View>
					<MyText myStyle={[styles.text,styles.extraData]}>{extraData}</MyText>
				</View>
				<Button style={styles.deleteButton} rounded transparent onPress={close}>
					<MyText myStyle={styles.btnText}>CHIUDI</MyText>
				</Button>
				<Button style={styles.closeButton} rounded transparent onPress={confirm}>
					<MyText myStyle={styles.btnText}>ELIMINA</MyText>
				</Button>
			</View>
		</Modal>
		);
}