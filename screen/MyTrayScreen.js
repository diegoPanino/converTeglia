import React,{useState,useRef} from 'react';
import {View,Text,StyleSheet,TextInput,useWindowDimensions,Modal} from 'react-native';
import {Button,Icon} from 'native-base';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {toggleBlurAction} from '../redux/actions';
import CardTray from '../presentational/CardTray';
import CardTrayList from '../presentational/CardStandarTrayList';
import AdvancedSettingsModal from '../presentational/AdvancedSettingsModal';
import NewTrayModal from '../presentational/MakeNewTray';
import { BlurView } from "@react-native-community/blur";

function MyTrayScreen({navigation,toggleBlurAction}){

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	carouselImg:{
		flex:1,
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
	settingsBtn:{
		width:350,
		zIndex:1,
	},
	settingsBtnIcon:{
		position:'absolute',
		right:0,
	},
	blur:{
		zIndex:5,
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
	}
})

	const [tray,setTray] = useState('Rotonda');
	const [advSett,setAdvSett] = useState(false)
	const [showNTM,setShowNTM] = useState(false)
	const data = ['Rettangolare','Rotonda','Quadrata'];
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
				<NewTrayModal hide={()=>setShowNTM(false)}/>}
			 {showNTM &&
			  <BlurView
			 		    	  style={styles.blur}
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
				<Text style={{fontSize:20,color:'blue'}}>CREA LA TUA TEGLIA</Text>
			</Button>
			
			<View style={styles.settingsBtn}>
				<Button rounded block light iconRight small onPress={()=> setAdvSett(true)}>
					<Text>Impostazioni avanzate</Text>
					<Icon style={styles.settingsBtnIcon} name='add-outline' />
				</Button>
				<Modal animationType='slide' transparent={true} visible={advSett}>
					<AdvancedSettingsModal hide={()=>setAdvSett(false)} />
				</Modal>
			</View>
		</View>
		);
}
export default connect(null,{toggleBlurAction})(MyTrayScreen)