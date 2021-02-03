import React from 'react';
import {View,Modal,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import MyText from './MyText';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ModalMessage(props){
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
				<TouchableOpacity style={[styles.deleteButton,styles.btn]}  onPress={close}>
					<MyText myStyle={styles.btnText}>CHIUDI</MyText>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.closeButton,styles.btn]}  onPress={confirm}>
					<MyText myStyle={styles.btnText}>ELIMINA</MyText>
				</TouchableOpacity>
			</View>
		</Modal>
		);
}
const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		top:windowHeight/3,
		height:windowHeight/4.3,
		width:windowWidth-40,
		margin: 20,
		backgroundColor:'#feebc4', 	//background
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
	  	color:'#e8871e'
	  },
	  btn:{
	  	backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		padding:5,
		elevation:5,
		margin:10,
	  }
})