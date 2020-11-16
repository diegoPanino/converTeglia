import React,{useState,useRef} from 'react';
import {View,Text,StyleSheet,TextInput,useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import  CardTray from '../presentational/CardTray';


export default function MyTrayScreen(){
	
const styles=StyleSheet.create({
	view:{
		justifyContent:'center',
		alignItems:'center'
	},
	carousel:{
		borderWidth:1,
		borderColor:'red',
		height:'70%',
	},
	ccs:{
		borderWidth:3,
		borderColor:'blue',
		justifyContent:'center',
		alignItems:'center',
	},
})

	const [tray,setTray] = useState('Rotonda');
	const [visible,setVisible] = useState(true)
	const data = ['Rettangolare','Rotonda','Quadrata'];
	const ref = useRef();
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;

	function onScrollHandler(){
		console.log('visible ',visible)
		
	}
	function onSnapToItemHandler(index){
		setTray(data[index])
	}

	return (
		<View style={styles.view}>
			<Carousel 
				contentContainerStyle={styles.ccs}
				containerCustomStyle={styles.carousel}
				ref={ref}
				data={data}
				renderItem = {({item,index})=>{return <CardTray type={index} />}}
				itemWidth = {200}
				sliderWidth={windowWidth}
				inactiveSlideScale={0.38}
				activeSlideAlignment='center'
				onSnapToItem = {(index)=>onSnapToItemHandler(index)}
				firstItem = {1}
				/>
			
		</View>
		);
}