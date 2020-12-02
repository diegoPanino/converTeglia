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
		borderWidth:1,
		flexDirection:'row',
		alignItems:'center',
	},//PIKER-----------------------------------------------------------------
	pickerItem:{
		flex:1,
	},
	picker:{
		flex:1,
		borderWidth:1,
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

	},
	servs:{
		flex:1,
		alignItems:'center'
	},
	servsText:{
		fontWeight:'bold'
	}
})

function NewTrayModal(props){
	const [type,setType] = useState('circle')
  	const [dim, setDim] = useState(22)
  	const [a,setA] = useState(22)
  	const [b,setB] = useState(20)
	const [servs,setServs] = useState(6)
	const [name,setName] = useState()
	const {hide,toggleBlurAction,addTrayAction} = props
	
	useEffect(()=>{
		setPortions();
	},[dim,a,b,type])
	useEffect(()=>{
		return ()=> toggleBlurAction()
	},[])


	let nums=[];
	for(let i = 1;i<=40;i++){
		nums.push(i)
	}
	const pickers = nums.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

	const onSave=()=>{
		let dimensions;
		let key;

		if(type==='rect'){
			dimensions = a +'x' + b
			key = '1.'+Date.now()
		}
		else if(type === 'circle'){
			dimensions = dim
			key = '0.'+Date.now()
		}
		else{
			dimensions = dim
			key = '2.'+Date.now()
		}
		const tray = {
			type:type,
			name:name,
			dim:dimensions,
			servs:servs,
			selected:false,
			key:key
		}
		addTrayAction(tray);
		hide()
	}
	const onCancel=()=>{
		
		hide()
	}
	const setPortions=()=>{
		let area;
		if(type === 'rect')
			area = a * b
		else if(type === 'circle')
					area = Math.pow((dim / 2),2) * Math.PI
			else
				area = Math.pow(dim,2)

		switch(true){
			case(area <= 96):setServs(1);break;
			case(area>96 && area <=123):setServs(2);break;
			case(area>123 && area <=167):setServs(3);break;
			case(area>167 && area <=214):setServs(4);break;
			case(area>214 && area <=270):setServs(6);break;
			case(area>270 && area <=299):setServs(7);break;
			case(area>299 && area <=330):setServs(8);break;
			case(area>330 && area <=363):setServs(9);break;
			case(area>363 && area <=398):setServs(10);break;
			case(area>398 && area <=434):setServs(11);break;
			case(area>434 && area <=472):setServs(12);break;
			case(area>472 && area <=511):setServs(13);break;
			case(area>511 && area <=552):setServs(14);break;
			case(area>552 && area <=594):setServs(15);break;
			case(area>594 && area <=638):setServs(16);break;
			case(area>638 && area <=684):setServs(17);break;
			case(area>684 && area <=731):setServs(18);break;
			case(area>731 && area <=780):setServs(19);break;
			case(area>780 && area <=830):setServs(20);break;
			case(area>830 && area <=882):setServs(21);break;
			case(area>882 && area <=935):setServs(22);break;
			case(area>935 && area <=990):setServs(23);break;
			case(area>990 && area <=1047):setServs(24);break;
			case(area>1047 && area <=1105):setServs(25);break;
			case(area>1105 && area <=1164):setServs(26);break;
			case(area>1164 && area <=1226):setServs(27);break;
			case(area>1226 && area <=1288):setServs(28);break;
			default: setServs('Misure troppo grandi!')
		}
	}

	return (
		<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
		<View style={styles.mainView} >
			<View style={styles.contentView}>
				<View style={styles.nameInput}>
             		 <Label style={styles.label}>Nome</Label>
             		 <TextInput placeholder='Dai un nome alla tua teglia!'
             		 		autoFocus={true} clearButtonMode='while-editing'
             		 		maxLength={32} returnKeyType='done' textAlign='center'
             		 		onChangeText={text=>setName(text)} value = {name}              		 />
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
				<View style = {styles.measurement}>
				{type === 'rect' //pICKER--------------------------------------------
				//----------------------------------------------RECT
					? 	<View>
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
					: 	//PICKER----------------------------------------------------
					//--------------------------------------------------------------
					 	<View>
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
					<View style={styles.servs}>
						<Text>Porzioni: <Text style={styles.servsText}>{servs}</Text></Text>		
					</View>
				</View>
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