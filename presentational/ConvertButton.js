import React from 'react';
import {View, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import {fastConvertionAction,convertAction} from '../redux/actions';
import MyText from './MyText';



function ConvertButton(props){
	const {blurRadius,navigation} = props
	const {fastConvertionAction,convertAction} = props
	const convert = () =>{
		convertAction();
		fastConvertionAction();
		navigation.navigate('ResultScreen');
	}
	return (
		<View style={styles.btnView}>
			<TouchableOpacity style={styles.btn}  onPress={()=>convert()}>
				<MyText myStyle={styles.text}>CONVERTI</MyText>
			</TouchableOpacity>
			<TouchableOpacity style={styles.icoContainer} onPress={()=>fastConvertionAction()}>
				<Icon style={styles.ico} name='close'/>
			</TouchableOpacity>
		</View>
		);
}
export default connect(null,{fastConvertionAction,convertAction})(ConvertButton);
const styles = StyleSheet.create({
	btnView:{
		flex:1,
		flexDirection:'row',
		marginTop:'5%',
		marginLeft:10,
	},
	btn:{
		flex:0.8,
		justifyContent:'center',
		backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		elevation:5,
	},
	text:{
		textAlign:'center',
		fontSize:35,
		color:'#e8871e',
	},
	icoContainer:{
		flex:0.5,
	},
	ico:{
		fontSize:20,
	}
})