import React,{useState,useRef} from 'react';
import {View,Text,StyleSheet,TextInput,useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CardTray from '../presentational/CardTray';
import CardTrayList from '../presentational/CardStandarTrayList';

const background = require('../img/backgroundPink.jpeg');

export default function MyTrayScreen(){
	
const styles=StyleSheet.create({
	view:{
		justifyContent:'center',
		alignItems:'center'
	},
	carousel:{
		height:150,
		margin:25,
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
	}
})

	const [tray,setTray] = useState('Rotonda');
	const [visible,setVisible] = useState(true)
	const data = ['Rettangolare','Rotonda','Quadrata'];
	const refImg = useRef();
	const refStdTrays = useRef();
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;

	function onScrollHandler(){
		console.log('visible ',visible)
		
	}
	function onSnapToItemHandler(index){
		setTray(data[index])
		refStdTrays.current.snapToItem(index,true)
	}

	return (
		<View style={styles.view}>
			<Carousel 
				contentContainerStyle={styles.ccs}
				containerCustomStyle={styles.carousel}
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
				containerCustomStyle={styles.carousel}
				data={data}
				renderItem = {({item,index})=>{return <CardTrayList type={index} />}}
				itemWidth={windowWidth}
				sliderWidth={windowWidth}
				scrollEnabled={false}
				firstItem = {1}
			/>
		</View>
		);
}