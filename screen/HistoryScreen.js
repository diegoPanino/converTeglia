import React,{useState,useEffect,useRef} from 'react';
import {View,StyleSheet,InteractionManager,useWindowDimensions,Animated} from 'react-native';
import {connect} from 'react-redux';
import HistoryList from '../presentational/HistoryList';
import MyText from '../presentational/MyText';
import TutorialBox from '../presentational/tutorial/TutorialBox.js';
import Loader from './Loader.js';
import {AdMobBanner} from 'react-native-admob';
import Tips from '../presentational/Tips.js';

function HistoryScreen({history,navigation,tutorial,adCounter,adLimit}){
	const {height} = useWindowDimensions()
	const [isLoaded,setIsLoaded] = useState(false)
	const [adError,setAdError] = useState(false)
	const scale = useRef(new Animated.Value(0)).current
	function animationScale(){
		Animated.timing(scale,{
				toValue:1,
				duration:300,
				useNativeDriver:true
		}).start()
	}
	function showAd(){
		setAdError(false)
		animationScale()
	}
	function onAdFailed(){
		setAdError(true)
		animationScale()
	}

	useEffect(()=>{
		return ()=>{
			Animated.timing(scale,{
				toValue:0,
				duration:50,
				useNativeDriver:true
			}).start()
		}
	},[])		

	useEffect(()=>{											//if component is not rendered show the activity indicator and tips
  		InteractionManager.runAfterInteractions(()=>{
  				setIsLoaded(true)
   		})	
	})
	if(!isLoaded)
		return <Loader />
	else{
	return (
		<View style={styles.mainView}>
			<View style={{height:height*0.6}}>
				{(history.length > 0) 
					? <HistoryList list = {history} navigation = {navigation} adCounter={adCounter} adLimit={adLimit}/>
					: <MyText myStyle={styles.errMsg}>Nessuna ricetta salvata!</MyText>
				}
				{tutorial && <TutorialBox navigation={navigation} type='history' next='MyTrayScreen'/>}
			</View>
			<Animated.View style={[styles.adView,{transform:[{scale}]}]}>
					{ !adError 
						? <AdMobBanner adSize="largeBanner"
			  					adUnitID="ca-app-pub-3940256099942544/6300978111"
			  					onAdLoaded = {showAd}
			  					onAdFailedToLoad={onAdFailed}/>
			  			: <Tips style={styles.tipsStyle} />
					}
			</Animated.View>
		</View>
	)}
}
const mapStateToProps=(state)=>({
	history:state.history,
	tutorial:state.settings.tutorial,
	adCounter:state.ad.favoriteRecipe,
	adLimit:state.ad.maxFavRecipe
})
export default connect(mapStateToProps)(HistoryScreen)

const styles=StyleSheet.create({
	mainView:{
		flex:1,
		backgroundColor:'#feebc4',
	},
	adView:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		minHeight:100,
		minWidth:320,
	},
	errMsgContainer:{
		flex:1,
		justifyContent:'center',
		backgroundColor:'#fef1d8'
	},
	errMsg:{
		marginTop:50,
		textAlign:'center',
		color:'black',
	},
	tipsStyle:{
		height:'80%',
		width:'100%',
		paddingTop:10,
		alignSelf:'center',
	},
})
