import React,{useState,useEffect,useRef} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,Share} from 'react-native';
//import {AdMobBanner,AdMobInterstitial,PublisherBanner} from 'react-native-admob'
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import ResultList from '../presentational/ResultList';
import InfoTray from '../presentational/InfoTray';
import ModalInfoTray from '../presentational/ModalInfoTray';
import OriginalTrayInfoModal from '../presentational/OriginalTrayInfoModal';
import { BlurView } from "@react-native-community/blur";
import {toggleBlurAction,fastConvertionAction} from '../redux/actions';
import * as KitchenMath from '../api/kitchenMath';

const styles=StyleSheet.create({
	mainContainer:{
		flex:1,
		margin:'2.5%',
	},
	titleBox:{
		flex:1,
		alignItems:'center',
	},
	recipe:{
		flex:8,
	},
	titleContainer:{
		flex:1,
		flexDirection:'row',
	},
	titleView:{
		flex:1,
		marginLeft:20,
	},
	title:{
		textAlign:'center'
	},
	shareIcoContainer:{
		marginRight:5,
		alignItems:'flex-end'
	},
	shareIco:{
		fontSize:25,
	},
	infoTray:{
		flex:1,
		paddingLeft:'2.5%',
		borderRadius:25,
		borderTopWidth:1,
		borderLeftWidth:1,
		borderBottomWidth:3,
		borderRightWidth:3,
	},
	blur:{
		zIndex:5,
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
	},
	imgContainer:{
		flex:3,
		paddingBottom:5,
	},
	img:{
		flex:3,
	},
	
})

function ResultScreen(props){
	const {toggleBlurAction,fastConvertionAction} = props
	const {selectedTray,result} = props
	const {navigation,route} = props
	const {dim,key} = selectedTray
	const [showModal,setShowModal] = useState(false)
	const [modalOriginalTray, setModalOriginalTray] = useState(true)
	const [loaded,setLoaded] = useState(false)
	const [areaSource,setAreaSource] = useState()
	const [areaTarget,setAreaTarget] = useState()
	const [k,setK] = useState(1) 
	const [convertedRecipe,setConverted] = useState()
	const prevAreaTarget = usePrevState(areaTarget)
	const prevK = usePrevState(k)
	const prevTray = usePrevState(selectedTray.dim)
	


	function usePrevState(value){
		const ref = useRef()
		useEffect(()=>{
			ref.current = value
		})
		return ref.current
	}

/*	useEffect(()=>{
		AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    	AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433');

    	AdMobInterstitial.addEventListener('adLoaded', () =>
      		console.log('AdMobInterstitial adLoaded'),
    	);
    	AdMobInterstitial.addEventListener('adFailedToLoad', error =>
      		console.warn(error),
    	);
    	AdMobInterstitial.addEventListener('adOpened', () =>
      		console.log('AdMobInterstitial => adOpened'),
    	);
	    AdMobInterstitial.addEventListener('adClosed', () => {
	    	console.log('AdMobInterstitial => adClosed');
	    	AdMobInterstitial.requestAd().catch(error => console.warn(error));
	    });
	    AdMobInterstitial.addEventListener('adLeftApplication', () =>
	    	console.log('AdMobInterstitial => adLeftApplication'),
	    );
	    AdMobInterstitial.requestAd().catch(error => console.warn(error));

	    AdMobInterstitial.showAd().catch(err=>console.log(err))
	    return ()=> AdMobInterstitial.removeAllListeners()
	},[])*/

	useEffect(()=>{
		if(selectedTray.dim !== prevTray && prevTray !== undefined){
			const myTray = KitchenMath.getAreaByType(dim,key)
			setAreaTarget(myTray.area)
		}
	},[selectedTray])

	useEffect(()=>{
		if(props.convert){
			const {area} = KitchenMath.getAreaByType(dim,key)
			setAreaTarget(area)
		}
	},[props.convert])

	useEffect(()=>{
		if(prevAreaTarget !== areaTarget){
			setK(KitchenMath.getKfromArea(areaSource,areaTarget))
		}
	},[areaTarget])

	const onContinueOriginalTray=(area)=>{
		setAreaSource(area)
		setModalOriginalTray(false);
		setShowModal(true);
	}

	const onConfirmTray=(area)=>{
		toggleBlurAction();
		setAreaTarget(area)
		setShowModal(false)
	}

	const changeTray=()=>{
		toggleBlurAction();
		fastConvertionAction();
		setShowModal(false)
		navigation.navigate('MyTrayScreen')
	}

	/*const onShare = async () => {
    try {
      const result = await Share.share({
        title:'-Converteglia- ',
 		message: 'Converteglia', 
  		url: 'converteglia://result/', 
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };*/

	if(result.hasOwnProperty('recipe')){
		if(result.recipe.hasOwnProperty('err'))
			return (<Text>{result.recipe.msg}</Text>)
		else{
			return (
				<View style={styles.mainContainer}>
				{(showModal || modalOriginalTray) && 
					<BlurView
		 	    	  style={styles.blur}
		 		      blurType="dark"
	 		          blurAmount={1}
	 		        />}
	 		        <OriginalTrayInfoModal 
	 		        				blurAction={toggleBlurAction}
	 		        				confirm={(area)=>onContinueOriginalTray(area)}
	 		        				showModal={modalOriginalTray}
	 		        				tray={result.recipe.trayRad}
	 		        />
					<ModalInfoTray 	close={()=>changeTray()}
									confirm={(area)=>onConfirmTray(area)}
									showModal={showModal}
									selectedTray={selectedTray}/>
					<View style={styles.titleContainer}>
						<View style={styles.titleView}>
							<Text style={styles.title}>{result.recipe.title}</Text>
						</View>
							{/*<TouchableOpacity 	style={styles.shareIcoContainer}
												onPress={()=>onShare()}>
								<Icon style={styles.shareIco} name ='share-social' />
							</TouchableOpacity>*/}
					</View>
					<View style={loaded ? styles.imgContainer : {display:'none'}}>
						<Image 	onLoad={()=>setLoaded(true)}
								source={{uri:result.recipe.src}}
								style={styles.img} />
					</View>
					<View style={styles.recipe}>
						<ResultList list={result} k = {k}/>
					</View>
				</View>
			);
		}	
	}
	else{
		return (<Text>C'è stato un problema nel leggere la ricetta</Text>)
	}	
}
	

const mapStateToProps=(state)=>({
	result:state.result,
	selectedTray:state.settings.selection,
	convert:state.system.convert
})
export default connect(mapStateToProps,{toggleBlurAction,
										fastConvertionAction,})(ResultScreen);