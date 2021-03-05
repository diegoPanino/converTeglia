import React,{useState,useEffect,useRef} from 'react';
import {View,StyleSheet,Image,TouchableOpacity,InteractionManager,Animated,ActivityIndicator,Modal} from 'react-native';
import {connect} from 'react-redux';
import MyText from '../presentational/MyText';
import ResultList from '../presentational/ResultList';
import ModalInfoTray from '../presentational/ModalInfoTray';
import OriginalTrayInfoModal from '../presentational/OriginalTrayInfoModal';
import { BlurView } from "@react-native-community/blur";
import {toggleBlurAction,fastConvertionAction} from '../redux/actions';
import * as KitchenMath from '../api/kitchenMath';
import TutorialBox from '../presentational/tutorial/TutorialBox.js';
import Loader from './Loader.js';
import {AdMobBanner,AdMobInterstitial} from 'react-native-admob';

const def1 = require('../img/1.jpg')
const def2 = require('../img/2.jpg')
const def3 = require('../img/3.jpg')
const def4 = require('../img/4.jpg')
const defaultImg = [def1,def2,def3,def4]

function ResultScreen(props){

	const {toggleBlurAction,fastConvertionAction} = props
	const {selectedTray,result,tutorial,ad} = props
	const {searchedRecipe} = ad
	const {navigation} = props
	const {dim,key} = selectedTray
	const [showModal,setShowModal] = useState(false)
	const [modalOriginalTray, setModalOriginalTray] = useState(true)
	const [loaded,setLoaded] = useState(false)
	const [areaSource,setAreaSource] = useState()
	const [areaTarget,setAreaTarget] = useState()
	const [k,setK] = useState(1)
	const [adError,setAdError] = useState(false)
	const [adLoaded,setAdLoaded] = useState(false)
	const [isLoaded,setIsLoaded] = useState(false)
	const [defaultImgIndex,setDefaultImgIndex] = useState(0)
	const prevAreaTarget = usePrevState(areaTarget)
	const prevTray = usePrevState(selectedTray.dim)
	const scale = useRef(new Animated.Value(0)).current

	function usePrevState(value){							//hook to get the prevStatus of value
		const ref = useRef()
		useEffect(()=>{
			ref.current = value
		})
		return ref.current
	}

	useEffect(()=>{																	//if there is not img from web site, get a random index  > 0, flaggin def img
		if(result.recipe.src === 'immagine personale')
			setDefaultImgIndex(Math.trunc(Math.random() * (5 - 1) + 1))
	},[])

	useEffect(()=>{
		AdMobInterstitial.setAdUnitID('ca-app-pub-7517699325717425/2883816461')//ca-app-pub-3940256099942544/1033173712<--TEST 
		
		AdMobInterstitial.addEventListener('adClosed',()=>{
			AdMobInterstitial.requestAd().catch(err=>{})
		})
		AdMobInterstitial.isReady(ready =>{
			if(!ready)
				AdMobInterstitial.requestAd().catch(err=>{})
		})

		return () => AdMobInterstitial.removeAllListeners()
	},[])
	useEffect(()=>{
		if((searchedRecipe % 3 === 0) && (searchedRecipe !== 0))
			AdMobInterstitial.showAd().catch(err=>{})
	},[searchedRecipe])

	useEffect(()=>{
		InteractionManager.runAfterInteractions(()=>{			//wait for animation to be completed and then show the component
				setIsLoaded(true)
		})	
	})
	useEffect(()=>{
		if(selectedTray.dim !== prevTray && prevTray !== undefined){
			const myTray = KitchenMath.getAreaByType(dim,key)			//when the selected tray change and is different from prev calculate the area
			setAreaTarget(myTray.area)
		}
	},[selectedTray])

	useEffect(()=>{
		if(props.convert){
			const {area} = KitchenMath.getAreaByType(dim,key)		//used to start conversion after change tray from MyTrayScreen. can be removed and implement different
			setAreaTarget(area)
		}
	},[props.convert])

	useEffect(()=>{
		if(prevAreaTarget !== areaTarget){
			setK(KitchenMath.getKfromArea(areaSource,areaTarget))	//when target area is set, calcolare the k factor
		}
	},[areaTarget])

	const onContinueOriginalTray=(area)=>{				//when press continue on the original trayModal, set the source area of the tray
		setAreaSource(area)								//hide the original tray modal and show the target area modal(modalInfo)
		setModalOriginalTray(false);
		setShowModal(true);
	}

	const onConfirmTray=(area)=>{			//when press convert from the target area modal (modalInfo), remove the blur effect from the header
		toggleBlurAction();					//set area target and hide the modal
		setAreaTarget(area)
		setShowModal(false)
	}

	const changeTray=()=>{					//when press change from the target area modal (modalInfo), remove the blur effect from the header
		toggleBlurAction();					//switch the value for the convertion button in the next screen -- can be implemented better, most likely
		fastConvertionAction();				//not necessary. hide the target area modal (modalInfo) and navigate to the tray's selection screen
		setShowModal(false)
		navigation.navigate('MyTrayScreen')
	}

	const adAnimation=()=>{
		Animated.timing(scale,{
			toValue:1,
			duration:300,
			useNativeDriver:true
		}).start()
	}
	const showAd=()=>{
		setAdLoaded(true)
		adAnimation()
		setAdError(false)
	}
	const onAdFailed=()=>{
		setAdLoaded(false)
		setAdError(true)
	}

	if(!isLoaded)
		return <Loader />					//if the component is not loaded, show the activity indicator and tips
	else{
	if(result.hasOwnProperty('recipe')){												
		if(result.recipe.hasOwnProperty('err'))						//check if the result loaded into redux, exist and if has error, show it
			return (<View style={styles.errMsgContainer}>
						{(adLoaded || adError) 
							?<View style={styles.errMsgTextView}>
								<MyText myStyle={styles.errMsg}>{result.recipe.msg}</MyText>
								<TouchableOpacity onPress={()=>{navigation.goBack()}}>
									<MyText myStyle={styles.errMsg}>Riprova</MyText>
								</TouchableOpacity>
							 </View>
							 : <View style={styles.activityIndicator}><ActivityIndicator size='large' color='#feaa52' /></View>}
							<Animated.View style={[styles.adView,{transform:[{scale}]}]}>
								<AdMobBanner adSize="largeBanner"
			  								adUnitID='ca-app-pub-7517699325717425/8128210768'//"ca-app-pub-3940256099942544/6300978111"//<-TEST 
			  								onAdLoaded = {showAd}
			  								onAdFailedToLoad={onAdFailed}/>
			  				</Animated.View>
			  			
					</View>)
		else{     				//if there is no error show the 2 modals and the ResultList
			return (
				<View style={styles.mainContainer}>
				{(showModal || modalOriginalTray) && 
					<BlurView
		 	    	  style={styles.blur}
		 		      blurType="dark"
	 		          blurAmount={1}
	 		        />}
	 		        {(tutorial && !modalOriginalTray && !showModal) && <TutorialBox type='result' next='HistoryScreen' navigation={navigation} />}
		 		    <Modal animationType='slide' transparent={true} visible={modalOriginalTray}>    
		 		        <OriginalTrayInfoModal 
		 		        				blurAction={toggleBlurAction}
		 		        				confirm={(area)=>onContinueOriginalTray(area)}
		 		        				showModal={modalOriginalTray}
		 		        				tray={result.recipe.trayRad}
		 		        				tutorial={tutorial}
		 		        />
		 		    </Modal>
		 		    <Modal animationType='slide' transparent={true} visible={showModal}>
						<ModalInfoTray 	close={()=>changeTray()}
										confirm={(area)=>onConfirmTray(area)}
										showModal={showModal}
										selectedTray={selectedTray}
										tutorial={tutorial}
						/>
					</Modal>
					<View style={styles.titleContainer}>
						<View style={styles.titleView}>
							<MyText myStyle={styles.title}>{result.recipe.title}</MyText>
						</View>
					</View>
					<View style={loaded ? styles.imgContainer : {display:'none'}}>
						{defaultImgIndex 
							?	<Image onLoad={()=>setLoaded(true)}
									source={defaultImg[defaultImgIndex-1]}
									style={styles.img} />
							: 	<Image onLoad={()=>setLoaded(true)}
									source={{uri:result.recipe.src}}
									style={styles.img} />
						}
					</View>
					<View style={styles.recipe}>
						<ResultList list={result} k = {k}/>
					</View>
				</View>
			);
		}	
	}
	else{
		return (<MyText>C'è stato un problema nel leggere la ricetta</MyText>)
		}	
	}
}
	

const mapStateToProps=(state)=>({
	result:state.result,
	selectedTray:state.settings.selection,
	tutorial:state.settings.tutorial,
	convert:state.system.convert,
	ad:state.ad
})
export default connect(mapStateToProps,{toggleBlurAction,fastConvertionAction,})(ResultScreen);

const styles=StyleSheet.create({
	errMsgContainer:{
		flex:1,
		justifyContent:'space-evenly',
		backgroundColor:'#fef1d8'

	},
	errMsg:{
		textAlign:'center',
		color:'#780116'
	},
	mainContainer:{
		flex:1,
		backgroundColor:'#feebc4' //BACKGROUND
	},
	blur:{
		zIndex:5,
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
	},
	errMsgTextView:{
		flex:1,
		justifyContent:'center',
	},
	activityIndicator:{
		flex:1,
		justifyContent:'center',
	},
	adView:{
		flex:1,
		marginBottom:10,
		justifyContent:'flex-end',
		alignSelf:'center',
	},
	titleContainer:{
		flex:1,
		flexDirection:'row',
	},
	titleBox:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
	},
	titleView:{
		justifyContent:'center',
		flex:1,
		flexGrow:2
	},
	title:{
		textAlign:'center',
		fontSize:22,
		borderBottomWidth:1,
		borderColor:'#feaa52',
	},
	imgContainer:{
		flex:3,
		justifyContent:'center',
		paddingBottom:5,
		marginTop:30,
	},
	img:{
		width:'100%'
	},
	recipe:{
		flex:8,
	},	
})
