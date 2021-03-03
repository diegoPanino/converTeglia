import React from 'react';
import {View,Image,StyleSheet} from 'react-native';
import MyText from './MyText.js';

export default function Tips({style,img=false}){
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

	return (
		<View style={[styles.mainView,style]}>
			{img && <Image source={require('../img/tips.png')} style={styles.tipsImg} />}
			<MyText myStyle={styles.tipsText}>{tips[index]}</MyText>
		</View>
		)
}

const styles = StyleSheet.create({
	mainView:{
		backgroundColor:'#fef1d8',
		justifyContent:'center',
		alignContent:'center',
		padding:20,
		borderWidth:2,
		borderRadius:20,
		borderColor:'#feaa52'
	},
	tipsText:{
		justifyContent:'center',
		alignItems:'center',
		alignContent:'center',
		textAlign:'center',
		fontSize:18,
	},
	tipsImg:{
		alignSelf:'flex-end',
		marginRight:-30,
		marginTop:-50,
		width:60,
		height:60,
	}
})