import React,{useState,useRef} from 'react';
import {View,StyleSheet,TextInput,useWindowDimensions,Modal,StatusBar} from 'react-native';
import {Button,Icon} from 'native-base';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {toggleBlurAction} from '../redux/actions';
import CardTray from '../presentational/CardTray';
import CardTrayList from '../presentational/CardStandarTrayList';
import MyText from '../presentational/MyText';
import AdvancedSettingsModal from '../presentational/AdvancedSettingsModal';
import NewTrayModal from '../presentational/MakeNewTray';
import { BlurView } from "@react-native-community/blur";

function MyTrayScreen({navigation,toggleBlurAction}){

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
		borderColor:'#c8bfb5', // settings border button 			TEXT
		borderRadius:20,
	},
	settBtn:{
		backgroundColor:'#847349', //settings background button     BUTTON
	},
	settingsBtnIcon:{
		position:'absolute',
		right:0,
		color:'#c8bfb5',        //settings text Button 				TEXT
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
		fontSize:20,
		color:'#c8bfb5',
	},
	h1Btn:{
		backgroundColor:'#847349', //makeNewTray button background 	BUTTON
		color:'#c8bfb5',			//makeNewTray button text       TEXT
		fontWeight:'normal',
		borderWidth:2,
		borderColor:'#c8bfb5', 		//makeNewTray button border     TEXT
		borderRadius:20,
		padding:5,
		elevation:5,
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

	function onSnapToItemHandler(index){
		setTray(data[index])
		refStdTrays.current.snapToItem(index,true)
	}
	function onCreateTrayHandler(){
		setShowNTM(true);
		toggleBlurAction();
	}

	return (
		<View style={styles.view}>
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
				containerCustomStyle={styles.carouselTrays}
				data={data}
				renderItem = {({item,index})=>{return <CardTrayList type={index} />}}
				itemWidth={windowWidth}
				sliderWidth={windowWidth}
				scrollEnabled={false}
				firstItem = {1}
				inactiveSlideScale={0.2}
			/>
			<Button rounded transparent block large onPress={()=>onCreateTrayHandler()} >
				<MyText myStyle={styles.h1Btn}>CREA LA TUA TEGLIA</MyText>
			</Button>
			
			<View style={styles.settingsBtnContainer}>
				<Button style={styles.settBtn} rounded block iconRight small onPress={()=>setAdvSett(true)}>
					<MyText myStyle={styles.settingsText}>Impostazioni avanzate</MyText>
					<Icon style={styles.settingsBtnIcon} name='chevron-up' />
				</Button>
				<Modal animationType='slide' transparent={true} visible={advSett}>
					<AdvancedSettingsModal hide={()=>setAdvSett(false)} />
				</Modal>
			</View>
		</View>
		);
}
export default connect(null,{toggleBlurAction})(MyTrayScreen)
/*<*/