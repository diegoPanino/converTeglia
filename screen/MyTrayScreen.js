import React,{useState,useEffect,useRef} from 'react';
import {View,StyleSheet,Dimensions,Modal,TouchableOpacity,InteractionManager,ActivityIndicator,Animated} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {toggleBlurAction,setMyTrayAction,showTutorialAction} from '../redux/actions';
import CardTray from '../presentational/CardTray';
import CardTrayList from '../presentational/CardStandarTrayList';
import MyText from '../presentational/MyText';
import AdvancedSettingsModal from '../presentational/AdvancedSettingsModal';
import NewTrayModal from '../presentational/MakeNewTray';
import { BlurView } from "@react-native-community/blur";
import TutorialBox from '../presentational/tutorial/TutorialBox.js';
import Loader from './Loader.js';
import ModalMessageAd from '../presentational/ModalMessageAd.js'
import {AdMobInterstitial,AdMobRewarded} from 'react-native-admob';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MyTrayScreen({navigation,toggleBlurAction,setMyTrayAction,tutorial,showTutorialAction,ad}){ // carousel render all the cards, should be removed
																									// and manually implemented
	const [tray,setTray] = useState('circle');
	const {createdTray} = ad
	const [advSett,setAdvSett] = useState(false)
	const [showNTM,setShowNTM] = useState(false)
	const [showAdModal,setShowAdModal] = useState(false)
	const data = ['rect','circle','square'];
	const refImg = useRef();
	const refStdTrays = useRef();
	const [isLoaded,setIsLoaded] = useState(false)
	const [adReady,setAdReady] = useState()
	const [adError,setAdError] = useState(false)
	const [adRewardError,setAdRewardError] = useState(false)
	const [adRewardLoaded,setAdRewardLoaded] = useState(false)
	const [adRewardAttempt,setAdRewardAttempt] = useState(0)
	const scale = useRef(new Animated.Value(0)).current

	useEffect(()=>{
		AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId])
		AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')//<--TEST | MINE --> ca-app-pub-7517699325717425/8278811044

		AdMobRewarded.isReady(ready=>{
				setAdRewardLoaded(ready)
		})
		AdMobRewarded.addEventListener('adLoaded',()=>{
			setAdRewardError(false)
			setAdRewardLoaded(true)
		})
		AdMobRewarded.addEventListener('adFailedToLoad',err=>{
			setAdRewardAttempt(prevAttempt => prevAttempt + 1)
		})
		AdMobRewarded.addEventListener('rewarded',reward =>{
			setShowNTM(true)
		})
		AdMobRewarded.addEventListener('adClosed',()=>{
			setAdRewardLoaded(false)
			AdMobRewarded.requestAd().catch(err=>{})
		})
		return ()=>AdMobRewarded.removeAllListeners()							//useEffect managin rewarded ad after 3 tray creation
	},[])
	useEffect(()=>{
		if(adRewardAttempt <= 5 && setAdRewardAttempt !== 0){
			setTimeout(()=>{
				AdMobRewarded.requestAd().catch(err=>{}) 
			},5000)
		}
		else if(adRewardAttempt === 6 ){
			setAdRewardError(true)
		}
	},[adRewardAttempt])

/*------------------------------------------------------------------------------------*/
	useEffect(()=>{
		AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    	AdMobInterstitial.setAdUnitID(/*'ca-app-pub-7517699325717425/9027259851'*/ 
    									'ca-app-pub-3940256099942544/1033173712');  //test id

    	AdMobInterstitial.addEventListener('adLoaded', () =>{
      		setAdReady(true)															//effect managing interstitial ad
      		setAdError(false)
      		});
	    AdMobInterstitial.addEventListener('adFailedToLoad', error =>{
	      	setAdReady(false)
	      	setAdError(true)
	      	});
	    AdMobInterstitial.isReady(ready=>{
    		setAdReady(ready)
    		if(!ready){
    			AdMobInterstitial.requestAd().catch(error => console.warn('requestAd: ',error));
    		}
    	})
	    return ()=>  AdMobInterstitial.removeAllListeners();
	},[])

  	useEffect(()=>{														//when navigation obj change, make appear the view with animation
  		const transEnd = navigation.addListener('transitionEnd',e=>{
  			Animated.timing(scale,{
  				toValue:1,
  				duration:400,
  				useNativeDriver:true
  			}).start()
  		})
  	},[navigation])

	useEffect(()=>{
		InteractionManager.runAfterInteractions(()=>{				//activity indicator while loading component
    		setIsLoaded(true)
    	})	
	})

	function onSnapToItemHandler(index){						//on the snap of the image, set the state to the
		setTray(data[index])									//selected shape of tray and snap the second carousel linked with ref
		refStdTrays.current.snapToItem(index,true)
	}
	function onCreateTrayHandler(){	
		if((createdTray % 3 === 0) && (createdTray !==0)){
			setShowAdModal(true)
		}	
		else {													
			AdMobInterstitial.showAd().catch(error => console.warn(error));			
			setShowNTM(true);
		}
		
	}
	function showAd(){
		AdMobRewarded.showAd().catch(err=>console.warn(err))
	}
	function onConfirmAdShow(){
		showAd()
		setShowAdModal(false)
	}

	if(!isLoaded)
		return <Loader />
	else{
	return (
		 <View style={styles.view}>
		 <Animated.View style = {{transform:[{scale}] }} >
		{tutorial && <TutorialBox navigation={navigation} type='myTray' next='end'
								reduxFunction={(key)=>setMyTrayAction(key)}  exampleFunction={(bool)=>showTutorialAction(bool)}
					/>}
			{(showNTM && (adReady || adError)) ?
				<View style={styles.newTrayView}>
					<NewTrayModal select={tray} hide={()=>setShowNTM(false)}/>
					<BlurView style={styles.blur}
			 		    blurType="dark"
			 		    blurAmount={1}
			 		/>
			 	</View>
				: showNTM && <ActivityIndicator style={styles.activity} size='large' color='#feaa52' />
			}  
			<Carousel 
				contentContainerStyle={styles.ccs}
				containerCustomStyle={styles.carouselImg}
				ref={refImg}
				data={data}
				renderItem = {({item,index})=>{return <CardTray type={index} />}}
				itemWidth = {200}
				sliderWidth={windowWidth}
				inactiveSlideScale={0.5}
				activeSlideAlignment='center'
				onSnapToItem = {(index)=>onSnapToItemHandler(index)}
				firstItem = {1}
				/>
			<Carousel
				ref={refStdTrays}
				containerCustomStyle={styles.carouselTrays}
				data={data}
				renderItem = {({item,index})=>{return <CardTrayList type={index} />}}
				itemWidth={windowWidth}
				sliderWidth={windowWidth}
				scrollEnabled={false}
				firstItem = {1}
				inactiveSlideScale={0.2}
			/>
			<TouchableOpacity style={styles.btn} onPress={onCreateTrayHandler} >
				<MyText myStyle={styles.h1Btn}>CREA LA TUA TEGLIA</MyText>
			</TouchableOpacity>
			
			<View style={styles.settingsBtnContainer}>
				<TouchableOpacity style={styles.settBtn} onPress={()=>setAdvSett(true)}>
					<MyText myStyle={styles.settingsText}>Impostazioni avanzate</MyText>
					<Icon style={styles.settingsBtnIcon} name='chevron-up' />
				</TouchableOpacity>
				<Modal animationType='slide' transparent={true} visible={advSett}>
					<AdvancedSettingsModal hide={()=>setAdvSett(false)} navigation={navigation}/>
				</Modal>
			</View>
			</Animated.View>
			{ showAdModal && <ModalMessageAd showModal={showAdModal}
							message={'Sembra che tu abbia raggiunto il limite di teglie personali create! Guarda un video per aggiungerne un\'altra!'}
							confirm={onConfirmAdShow}
							close={()=>setShowAdModal(false)}
							ready={adRewardLoaded}
							error={adRewardError}
				/>}
		</View>
		
		);}
}
mapStateToProps=state=>({
	tutorial:state.settings.tutorial,
	ad: state.ad
})
export default connect(mapStateToProps,{toggleBlurAction,setMyTrayAction,showTutorialAction})(MyTrayScreen)

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#feebc4',  								//BACKGROUND
	},
	newTrayView:{
		position:'absolute',
		top:0,
		left:0,
		width:'100%',
		height:'100%',
	},
	activity:{
		position:'absolute',
		top:'50%',
		left:'50%',
		zIndex:7,
		flex:1,
	},
	blur:{
		zIndex:5,
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
	},
	ccs:{
		justifyContent:'center',
		alignItems:'center',
	},
	carouselImg:{
		flex:1,
		marginTop:10
	},
	carouselTrays:{
		height:'28%',
	},
	btn:{
		margin:5,
	},
	h1Btn:{
		backgroundColor:'#feea52', //makeNewTray button background 	BUTTON
		color:'#e8871e',			//makeNewTray button text       TEXT
		fontWeight:'normal',
		textAlign:'center',
		borderWidth:2,
		borderColor:'#e8871e', 		//makeNewTray button border     BORDER/TEXT
		borderRadius:20,
		padding:5,
		elevation:5,
	},
	settingsBtnContainer:{
		zIndex:1,
		borderWidth:2,
		borderColor:'#e8871e', // settings border button 			BORDER/TEXT
		borderRadius:20,
		marginBottom:10,
	},
	settBtn:{
		backgroundColor:'#feea52',
		borderRadius:20, //settings background button     BUTTON
	},
	settingsText:{
		textAlign:'center',
		fontSize:20,
		color:'#e8871e', // settings text Button 					TEXT
	},
	settingsBtnIcon:{
		fontSize:25,
		position:'absolute',
		right:10,
		marginTop:2,
		color:'#e8871e',        //settingsICO text Button 				TEXT
	},
})