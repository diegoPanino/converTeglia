import React,{useState,useEffect} from 'react';
import {View,Modal,StyleSheet,useWindowDimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import MyText from './MyText';

export default function ModalMessageAd(props){
	const {height} = useWindowDimensions()
	const {showModal,message,extraData,close,confirm,ready,error} = props	

	return(
		<Modal animationType='slide' transparent={true} visible={showModal}>
			<View style = {[styles.modalView,{top:height/3}]}>
				<View style={styles.textContaier}>
					<MyText myStyle={styles.text}>{message}</MyText>
				</View>
				<View style={styles.extraDataContaier}>
					<MyText myStyle={[styles.text,styles.extraData]}>{extraData}</MyText>
				</View>
				<View style={styles.btnContainer}>
					<View style={styles.closeBtnContainer}>
						<TouchableOpacity style={[styles.deleteButton,styles.btn]}  onPress={close}>
							<MyText myStyle={styles.btnText}>CHIUDI</MyText>
						</TouchableOpacity>
					</View>
					<View style={styles.watchAdBtnContainer}>
						<TouchableOpacity  onPress={confirm} disabled={!ready}
							style={error ? styles.adErrorBtn : styles.btn}>
							{(!ready && !error)
								?<ActivityIndicator size='small' color='#feaa52' />
								: (error) ? <MyText myStyle={styles.btnTextError}>Non disponibile!</MyText>
											: <MyText myStyle={styles.btnText}>GUARDA</MyText> }
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
		maxWidth:600,
		alignSelf:'center',
		flex:1,
		margin: 20,
		backgroundColor:'#feebc4', 	//background
	    borderRadius: 20,
	    borderColor:'#feaa52',
	    borderWidth:4,
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
	  extraData:{
	  	flex:1,
	  	fontWeight:'bold',
	 	textAlign:'center',
	 	marginTop:10,
	  },
	  btnContainer:{
	  	flex:1,
	  	flexDirection:'row',
	  	alignItems:'center',
	  },
	  closeBtnContainer:{
	  	flex:1,
	  	alignItems:'flex-start',
	  },
	  watchAdBtnContainer:{
	  	flex:1,
	  	alignItems:'flex-end',
	  },
	  adErrorBtn:{
	  	margin:20,
	  	marginRight:5,
	  },
	  text:{
	  	fontSize:18,
	  	textAlign:'center',
	  },
	  btnText:{
	  	fontSize:22,
	  	color:'#e8871e'
	  },
	  btnTextError:{
	  	fontSize:18,
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