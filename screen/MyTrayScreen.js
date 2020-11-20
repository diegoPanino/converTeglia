import React,{useState,useRef} from 'react';
import {View,Text,StyleSheet,TextInput,useWindowDimensions,Modal} from 'react-native';
import {Button,Icon} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import CardTray from '../presentational/CardTray';
import CardTrayList from '../presentational/CardStandarTrayList';
import AdvancedSettingsModal from '../presentational/AdvancedSettingsModal';
import NewTrayModal from '../presentational/MakeNewTray';

const background = require('../img/backgroundPink.jpeg');

export default function MyTrayScreen(){
	
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
	},
	settingsBtnIcon:{
		position:'absolute',
		right:0,
	},
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

	return (
		<View style={styles.view}>
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
			<Button rounded transparent block large onPress={()=>setShowNTM(true)} >
				<Text style={{fontSize:20,color:'blue'}}>CREA LA TUA TEGLIA</Text>
			</Button>
			
			<View style={styles.settingsBtn}>
				<Button rounded block light iconRight small onPress={()=>setAdvSett(true)}>
					<Text>Impostazioni avanzate</Text>
					<Icon style={styles.settingsBtnIcon} name='add-outline' />
				</Button>
				<Modal animationType='slide' transparent={true} visible={advSett}>
					<AdvancedSettingsModal hide={()=>setAdvSett(false)} />
				</Modal>
				<Modal animationType='slide' transparent={true} visible={showNTM}>
					<NewTrayModal hide = {()=>setShowNTM(false)} />
				</Modal>
			</View>
		</View>
		);
}