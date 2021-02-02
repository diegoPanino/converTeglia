import React,{useState,useEffect} from 'react';
import {View,Modal,StyleSheet,Dimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import MyText from './MyText';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ModalMessageAd(props){
	const {showModal,message,extraData,close,confirm,ad} = props	
	const [adLoaded,setAdLoaded] = useState(false)
	const [adError,setAdError] = useState(false)
	const [attempt,setAttempt] = useState(0)

	useEffect(()=>{
		console.log('modal mount')
		ad.addEventListener('adFailedToLoad', error =>{
			console.log('adFail')
			setAdLoaded(false)
			setAdError(true)
		})
		ad.addEventListener('adLoaded', () =>{
			console.log('ad loaded')
			setAdLoaded(true)
			setAdError(false)
		})
		ad.addEventListener('adClosed',()=>{
			 console.log('ad close')
			 setAdLoaded(false)
		})
		return ()=> ad.removeAllListeners();
	},[])

	useEffect(()=>{
		console.log('effect,',adLoaded)
		if(!adLoaded && !adError)
			ad.requestAd().catch(err=>console.warn(err))
	},[adLoaded])

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
				<TouchableOpacity style={[styles.closeButton,styles.btn]}  onPress={confirm} disabled={adError}>
					{(!adLoaded && !adError)
						?<ActivityIndicator size='small' color='#feaa52' />
						: (adError) ? <MyText myStyle={styles.btnTextError}>Non disponibile!</MyText>
									: <MyText myStyle={styles.btnText}>GUARDA</MyText> }
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