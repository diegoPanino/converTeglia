import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet, Image, TouchableOpacity, 
		TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Icon,Button,Item,Input,Form,Label} from 'native-base';
import { RadioButton } from 'react-native-paper';
import {connect} from 'react-redux';
import {toggleBlurAction} from '../redux/actions';

const squareIco = require ('../img/quadrata.png');
const rectIco = require('../img/rettangolare.png');
const circleIco = require('../img/rotonda.png');

const styles = StyleSheet.create({
	mainView:{
		position:'absolute',
		top:'-25%',
		height:'125%',
		width:'100%',
		backgroundColor:'transparent',
		zIndex:6,
	},
	contentView:{
		position:'relative',
		top:'28%',
		backgroundColor: 'white',
		padding:10,
		paddingBottom:15,
		borderRadius:25,
		borderRightWidth:4,
		borderBottomWidth:4,
	},
	btnRow:{
		flexDirection:'row',
		justifyContent:'space-around',
	},
	name:{
		justifyContent:'center',
		alignItems:'center',
		borderTopWidth:1,
		borderTopColor:'black',
		marginBottom:20,
	},
	nameInput:{
	//	backgroundColor:'#add8e6',
		borderTopWidth:1,
		textAlign:'center',
		
	},
	type:{
		justifyContent:'center',
		paddingBottom:20,
		marginBottom:10,
		borderBottomWidth:1,
		borderTopWidth:1,
	},
	measurement:{
		justifyContent:'center',
		borderBottomWidth:1,
		
	},
	label:{
		textAlign:'center'
	},
	select:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		borderBottomWidth:3,
		borderBottomColor:'green',
	},
	touch:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	imgRow:{
		alignItems:'center',
		justifyContent:'center'
	}
})

function NewTrayModal(props){
	const [type,setType] = useState('circle')
	const [dim,setDim] = useState(20)
	const [servs,setServs] = useState()
	const [name,setName] = useState()
	const {hide,toggleBlurAction} = props

	const onSave=()=>{
		toggleBlurAction();
		hide()
		console.log('save')
	}
	const onCancel=()=>{
		toggleBlurAction();
		hide()
		console.log('cancel')
	}

	return (
		<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
		<View style={styles.mainView} >
			<Form style={styles.contentView}>
				<View style={styles.nameInput}>
             		 <Label style={styles.label}>Nome</Label>
             		 <TextInput placeholder='Scrivi qui un nome alla tua teglia!'
             		 		autoFocus={true} clearButtonMode='while-editing'
             		 		maxLength={32} returnKeyType='done' textAlign='center'
             		 		onEndEditing={()=>console.log('textInput blur')}
             		 />
            	</View>
				<View style = {styles.type}>
					<Label style={styles.label}>Forma</Label>
					<View style={styles.btnRow}>
						<TouchableOpacity
							style={type === 'rect'? [styles.select,styles.touch] : styles.touch}
							onPress={()=>{Keyboard.dismiss();setType('rect')}}>
							<Image source={rectIco} />
						</TouchableOpacity>
						<TouchableOpacity
							style={type === 'circle'? styles.select : styles.touch}
							onPress={()=>{Keyboard.dismiss();setType('circle')}}>
							<Image source={circleIco} />
						</TouchableOpacity>
						<TouchableOpacity
						style={type === 'square'? styles.select : styles.touch}
						onPress={()=>{Keyboard.dismiss();setType('square')}}>
							<Image source={squareIco} />
						</TouchableOpacity>
					</View>
				</View>
				{type === 'rect' 
					? 	<View style = {styles.measurement}>
							<Label style={styles.label}>Misure</Label>
						</View>
					: <Label>Misura:</Label>
				}
				<View style={styles.btnRow}>
					<Button large transparent onPress={()=>onSave()}>
						<Text>SALVA TEGLIA</Text>
					</Button>
					<Button  large transparent onPress={()=>onCancel()}>
						<Text>TORNA INDIETRO</Text>
					</Button>
				</View>
			</Form>
		</View>
		</TouchableWithoutFeedback>
		);
}
export default connect(null,{toggleBlurAction})(NewTrayModal)