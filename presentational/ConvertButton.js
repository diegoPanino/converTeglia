import React from 'react';
import {View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Icon,Button} from 'native-base';
import {connect} from 'react-redux';
import {fastConvertionAction} from '../redux/actions';
//import { BlurView } from "@react-native-community/blur";

const styles = StyleSheet.create({
	blur:{
		zIndex:5,
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
	},
	btnView:{
		flex:1,
		flexDirection:'row',
		marginTop:5,
		marginLeft:10,
	},
	btn:{
		flex:1,
		
		justifyContent:'center',
	},
	text:{
		fontSize:35,
	},
	icoContainer:{
		flex:0.5,
	},
	ico:{
		fontSize:20,
	}
})

function ConvertButton(props){
	const {blurRadius,navigation,fastConvertionAction} = props
	const convert = () =>{
		fastConvertionAction();
		navigation.navigate('ResultScreen');
	}
	return (
		<View style={styles.btnView}>
			<Button style={styles.btn} warning rounded onPress={()=>convert()}>
				<Text style={styles.text}>CONVERTI</Text>
			</Button>
			<TouchableOpacity style={styles.icoContainer} onPress={()=>fastConvertionAction()}>
				<Icon style={styles.ico} name='close' style={styles.ico}/>
			</TouchableOpacity>
		</View>
		);
}
export default connect(null,{fastConvertionAction})(ConvertButton);