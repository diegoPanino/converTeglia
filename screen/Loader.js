import React,{useRef,useEffect} from 'react';
import {View,ActivityIndicator,StyleSheet,Animated, Image} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import MyText from '../presentational/MyText.js';
import Tips from '../presentational/Tips.js';


export default function Loader(props){
	const scale = useRef(new Animated.Value(0)).current

	const tips=['Cliccando sul lucchetto, di un ingredienti, puoi bloccare il suo valore e mantenere le proporzioni',
				'CT sta per Cucchiaio da Tavola',
				'ct sta per Cucchiaino da Te',
				'tz è una tazza, o cup nel sistema americano',
				'Se ti piace l\'app, lascia la tua opinione nel PlayStore',
				'Una tazza americana o una cup, equivale a circa 237ml di volume!',
				'Lo sapevi che un cucchiaino(ct) di sale fino è circa 5 grammi?',
				'Un cucchiaio(CT) di olio equivale a circa 8 grammi',
				'Un cucchiaio(CT) equivale a 3 cucchiaini(ct) di liquido',
				'16 dei nostri cucchiai(CT) sono come una tazza americana',
				'Non ti ricordi qualcosa? Guarda di nuovo il tutorial, dalle Impostazioni Avanzate',
				'CIAO MAMMA!',
				'La maggior parte delle teglie per le torte hanno uno spessore di 5/6cm',
				'Aye Capitano!',
				'Clicca la freccia per tornare indietro'
				]
	const index= Math.floor(Math.random() * (tips.length)); 

	useEffect(()=>{
		Animated.timing(scale,{
			toValue:1,
			duration:300,
			useNativeDriver:true
		}).start()

		return ()=>{
			Animated.timing(scale,{
				toValue:0,
				duration:300,
				useNativeDriver:true
			}).start()
		}
	},[])

	return (
		<View style={styles.mainView}>
			<Animated.View style={{transform:[{scale}]}}>
				<ActivityIndicator size='large' color='#feaa52' />
			</Animated.View>
			<View style={styles.tipsView}>
				<Tips img/> 
			</View>
		</View>
		);
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		justifyContent:'center',
		backgroundColor:'#feebc4',
	},
	tipsView:{
		position:'absolute',
		left:10,
		right:10,
		bottom:20,
	},
})