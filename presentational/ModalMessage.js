import React from 'react';
import {View,Modal,StyleSheet,useWindowDimensions,TouchableOpacity} from 'react-native';
import MyText from './MyText';

export default function ModalMessage(props){
	const {height,width} = useWindowDimensions()
	const {showModal,message,extraData,close,confirm} = props	

	return(
		<Modal animationType='slide' transparent={true} visible={showModal}>
			<View style = {[styles.modalView,{top:height/3,width:width-40}]}>
				<View style={styles.textContaier}>
					<MyText myStyle={styles.text}>{message}</MyText>
				</View>
				<View style={styles.extraDataContaier}>
					<MyText myStyle={[styles.text,styles.extraData]}>{extraData}</MyText>
				</View>
				<View style={styles.btnContainer}>
					<View style={styles.closeButton}>	
						<TouchableOpacity style={styles.btn}  onPress={close}>
							<MyText myStyle={styles.btnText}>CHIUDI</MyText>
						</TouchableOpacity>
					</View>
					<View style={styles.deleteButton}>
						<TouchableOpacity style={styles.btn}  onPress={confirm}>
							<MyText myStyle={styles.btnText}>ELIMINA</MyText>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
		);
}
const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		flex:1,
		alignSelf:'center',
		maxWidth:600,
		margin: 20,
		backgroundColor:'#feebc4', 	//background
	    borderColor:'#feaa52',
	    borderWidth:1,
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
	textContaier:{
		flex:1,
	},
	extraDataContaier:{
		flex:3,
	},
	btnContainer:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
	},
	extraData:{
		fontWeight:'bold',
	 	textAlign:'center',
	 	marginTop:10,
	},
	closeButton:{
		flex:1,
		alignItems:'flex-start'
	},
	deleteButton:{
		flex:1,
		alignItems:'flex-end'
	},
	text:{
	  	fontSize:18,
	  	textAlign:'center',
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