import React,{useEffect,useState} from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import MyText from '../presentational/MyText.js';

export default function OrientationScreen({navigation}){
	const [landscape,setLandscape] = useState(true)
	
	const backToApp=()=>{
		console.log('press btn')
	}

	return(
		<View style={styles.mainView}>
			<MyText myStyle={styles.text}>
				Per un'esperienza migliore, ConverTeglia non permette la rotazione dello schermo per questo device.
				Capovolgi il telefono nuovamente, prima di poter tornare a utilizzarmi!
			</MyText>
			<TouchableOpacity onPress={backToApp} disabled={!landscape}>
				<MyText myStyle={styles.btnText}>INDIETRO</MyText>
			</TouchableOpacity>
		</View>
		)
}

const styles=StyleSheet.create({
	mainView:{},
})