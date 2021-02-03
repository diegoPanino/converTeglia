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
		console.log('mount')
		ad.addEventListener('adFailedToLoad', error =>{
			console.log('FailLoad',error)
			setAttempt(prevState => prevState + 1)
		})
		ad.isReady(ready=>{
			if(ready){
				setAdLoaded(true)
				setAdError(false)
			}
		})
		ad.addEventListener('adLoaded', () =>{
			console.log('loaded')
			setAdLoaded(true)
			setAdError(false)
		})
		ad.addEventListener('adClosed',()=>{
			 console.log('closed')
			 setAdLoaded(false)
		})
		return ()=> ad.removeAllListeners();
	},[])
	useEffect(()=>{
		return ()=> console.log('unmount')
	},[])

	useEffect(()=>{
		if(attempt <= 5){
			setTimeout(()=>{
				ad.requestAd().catch(err=>{console.log('attemptEffect ERR',err)}) 
			},5000)
		}
		else{
			setAdLoaded(false)
			setAdError(true)
		}
	},[attempt])

	useEffect(()=>{
		console.log('adLoadedEffect')
		if(!adLoaded && !adError)
			ad.requestAd().catch(err => console.log('adLoadedEffectERR',err) )
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
				<TouchableOpacity  onPress={confirm} disabled={adError}
					style={adError ? [styles.closeButton,styles.adErrorBtn] : [styles.closeButton,styles.btn]}>
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
	  adErrorBtn:{
	  	margin:20,
	  	marginRight:5,
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