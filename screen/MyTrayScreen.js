import React,{useState,useEffect,useRef} from 'react';
import {View,StyleSheet,TextInput,useWindowDimensions,Modal,StatusBar,TouchableOpacity,InteractionManager,Animated} from 'react-native';
import {Icon} from 'native-base';
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


function MyTrayScreen({navigation,toggleBlurAction,setMyTrayAction,tutorial,showTutorialAction}){

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#feebc4'//'#fef1d8'  								//BACKGROUND
	},
	carouselImg:{
		flex:1,
		marginTop:10
	},
	carouselTrays:{
		height:'28%',
	},
	trayContainerStyle:{

	},
	ccs:{
		justifyContent:'center',
		alignItems:'center',
	},
	img:{
		width:windowWidth,
		height:windowHeight,
		resizeMode:'stretch',
		flex:1,
	},
	settingsBtnContainer:{
		width:350,
		zIndex:1,
		borderWidth:2,
		borderColor:'#e8871e', // settings border button 			BORDER/TEXT
		borderRadius:20,
	},
	settBtn:{
		backgroundColor:'#feea52',
		borderRadius:20, //settings background button     BUTTON
	},
	settingsBtnIcon:{
		position:'absolute',
		right:0,
		color:'#e8871e',        //settingsICO text Button 				TEXT
	},
	blur:{
		zIndex:5,
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
	},
	settingsText:{
		textAlign:'center',
		fontSize:20,
		color:'#e8871e', // settings text Button 					TEXT
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
	btn:{
		margin:5,

	}
})

	const [tray,setTray] = useState('circle');
	const [advSett,setAdvSett] = useState(false)
	const [showNTM,setShowNTM] = useState(false)
	const data = ['rect','circle','square'];
	const refImg = useRef();
	const refStdTrays = useRef();
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;
	const [isLoaded,setIsLoaded] = useState(false)
	const scale = useRef(new Animated.Value(0)).current

  	useEffect(()=>{
  		const transEnd = navigation.addListener('transitionEnd',e=>{
  			Animated.timing(scale,{
  				toValue:1,
  				duration:400,
  				useNativeDriver:true
  			}).start()
  		})
  	},[navigation])

	useEffect(()=>{
		InteractionManager.runAfterInteractions(()=>{
    		setIsLoaded(true)
    	})	
	})

	function onSnapToItemHandler(index){
		setTray(data[index])
		refStdTrays.current.snapToItem(index,true)
	}
	function onCreateTrayHandler(){
		setShowNTM(true);
		toggleBlurAction();
	}

	if(!isLoaded)
		return <Loader />
	else{
	return (
		
		 <View style={styles.view}>
		 <Animated.View style = {{transform:[{scale}] }} >
		{tutorial && <TutorialBox navigation={navigation} type='myTray' reduxFunction={(key)=>setMyTrayAction(key)} next='end' exampleFunction={(bool)=>showTutorialAction(bool)}/>}
			{showNTM && 
				<NewTrayModal select={tray} hide={()=>setShowNTM(false)}/>}
			 {showNTM &&
			  <BlurView style={styles.blur}
			 		    blurType="dark"
			 		    blurAmount={1}
			 		    />}
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
				contentContainerStyle={styles.trayContainerStyle}
				containerCustomStyle={styles.carouselTrays}
				data={data}
				renderItem = {({item,index})=>{return <CardTrayList type={index} />}}
				itemWidth={windowWidth}
				sliderWidth={windowWidth}
				scrollEnabled={false}
				firstItem = {1}
				inactiveSlideScale={0.2}
			/>
			<TouchableOpacity style={styles.btn} onPress={()=>onCreateTrayHandler()} >
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
		</View>
		
		);}
}
mapStateToProps=state=>({
	tutorial:state.settings.tutorial
})
export default connect(mapStateToProps,{toggleBlurAction,setMyTrayAction,showTutorialAction})(MyTrayScreen)
/*<*/