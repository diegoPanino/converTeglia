import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet, Image, TouchableOpacity, 
		TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {Label} from 'native-base';
import {toggleBlurAction,addTrayAction} from '../redux/actions';
import {Picker} from '@react-native-picker/picker';


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
		
		marginBottom:25,
		paddingBottom:25,
		
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
	},
	dimInput:{
		flexDirection:'row',
		alignItems:'center',
	},
	picker:{
		flex:1,
	},
	pickerText:{
		flex:1,
	},
	sidePicker:{
		flex:1,
	},
	sideView:{
		flexDirection:'row',
		alignItems:'center'
	},
	sideText:{
		flex:3,
		textAlign:'center',

	}
})

function NewTrayModal(props){
	const [type,setType] = useState('circle')
  	const [dim, setDim] = useState(22)
  	const [a,setA] = useState(22)
  	const [b,setB] = useState(20)
	const [servs,setServs] = useState()
	const [name,setName] = useState()
	const {hide,toggleBlurAction,addTrayAction} = props
		
	let nums=[];
	for(let i = 1;i<=40;i++){
		nums.push(i)
	}
	const pickers = nums.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

	const onSave=()=>{
		const tray = {type:'',name:'',dim:'',serv:'',key:''}
		toggleBlurAction();
		hide()
	}
	const onCancel=()=>{
		toggleBlurAction();
		hide()
		console.log('cancel')
	}
	const onFirstSide=(val)=>{
		const value = val + 'x' + b
	}
	const onSecondSide=(val)=>{
		const value = a + 'x' + val
	}

	return (
		<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
		<View style={styles.mainView} >
			<View style={styles.contentView}>
				<View style={styles.nameInput}>
             		 <Label style={styles.label}>Nome</Label>
             		 <TextInput placeholder='Scrivi qui un nome alla tua teglia!'
             		 		autoFocus={true} clearButtonMode='while-editing'
             		 		maxLength={32} returnKeyType='done' textAlign='center'
             		 		onChangeText={text=>setName(text)} value = {name}
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
							<View style={styles.dimInput}>
							    <Picker style={styles.picker}
							    		selectedValue={a} mode='dropdown'
							    		onValueChange={(value)=>setA(value)}>
							    			{pickers}
							    </Picker>
							    <Text style={styles.pickerText}>X</Text>
							    <Picker style={styles.picker}
							    		selectedValue={b} mode='dropdown'
							    		onValueChange={(value)=>setB(value)}>
							    			{pickers}
							    </Picker>
							    <Text style={styles.pickerText}>cm</Text>
							</View>
						</View>
					: 	<View style = {styles.measurement}>
					 		<Label style={styles.label}>Misura:</Label>
							<View style={styles.sideView}>
								<Text style={styles.sideText}>Diametro/Lato:</Text>
								<Picker style={styles.sidePicker}
							    		selectedValue={dim} mode='dropdown'
							    		onValueChange={(value)=>setDim(value)}>
							    			{pickers}
							    </Picker>
							</View>
						</View>
				}
				<View style={styles.btnRow}>
					<TouchableOpacity large transparent onPress={()=>onSave()}>
						<Text>SALVA TEGLIA</Text>
					</TouchableOpacity>
					<TouchableOpacity  large transparent onPress={()=>onCancel()}>
						<Text>TORNA INDIETRO</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
		</TouchableWithoutFeedback>
		);
}
export default connect(null,{toggleBlurAction,addTrayAction})(NewTrayModal)