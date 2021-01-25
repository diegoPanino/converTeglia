import React,{useState,useEffect} from 'react';
import {View,StyleSheet, Image, TouchableOpacity,TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {toggleBlurAction,addTrayAction} from '../redux/actions';
import {Picker} from '@react-native-picker/picker';
import MyPicker from './MyPicker';
import MyText from './MyText';

const squareIco = require ('../img/quadrata.png');
const rectIco = require('../img/rettangolare.png');
const circleIco = require('../img/rotonda.png');

function NewTrayModal(props){
	const {hide,toggleBlurAction,addTrayAction,select} = props
	const [type,setType] = useState(select)
  	const [dim, setDim] = useState(22)
  	const [a,setA] = useState(22)
  	const [b,setB] = useState(20)
	const [servs,setServs] = useState(6)
	const [name,setName] = useState()
	const [invalidForm,setInvalidForm] = useState(false)


	useEffect(()=>{					//when the size of the tray change, update the portions showed
		setPortions();
	},[dim,a,b,type])
	useEffect(()=>{					//if servs is not a number, disable the save button, check anytime servs change
		if(isNaN(servs))
			setInvalidForm(true)
	},[servs])
	useEffect(()=>{
		return ()=> toggleBlurAction()		//on unmount remove the blur from the header using redux
	},[])


	let nums=[];
	for(let i = 1;i<=44;i++){
		nums.push(i)																			//create a list of numbers for the picker
	}
	const pickers = nums.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

	const checkName=()=>{							//if name is not set, use standard name
		if(!name)
			setName('Teglia Personale')
	}

	const onSave=()=>{
		let dimensions;									//depending on the selected tray create an index with the data
		let key;

		checkName();

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
		const tray = {									//create tray obj
			type:type,
			name:name,
			dim:dimensions,
			servs:servs,
			selected:false,
			key:key
		}
		addTrayAction(tray);							//add the new tray to the redux store and hide the modal
		hide()
	}
	const onCancel=()=>{
		hide()
	}
	const setPortions=()=>{												//depending on the calculate area of the tray set the portions
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
			case(area>1226 && area <=1530):setServs(30);break;
			default: setServs('Misure troppo grandi!')
		}
	}

	return (
		<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
		<View style={styles.mainView} >
			<View style={styles.contentView}>
				<View style={styles.nameInput}>
					<MyText myStyle={styles.label}>Nome</MyText>
             		 <TextInput style={styles.textInput}
             		 		placeholder='Dai un nome alla tua teglia!'
             		 		autoFocus={true} clearButtonMode='while-editing'
             		 		maxLength={32} returnKeyType='done' textAlign='center'
             		 		onEndEditing={()=>checkName()}
             		 		onChangeText={text=>setName(text)} value = {name} />
            	</View>
				<View style = {styles.type}>
					<MyText myStyle={styles.label}>Forma</MyText>
					<View style={styles.btnRow}>
						<TouchableOpacity
							style={type === 'rect'? [styles.select,styles.touch] : styles.touch}
							onPress={()=>{Keyboard.dismiss();setType('rect')}}>
							<MyText myStyle={styles.imgText}>Rettangolare</MyText>
							<Image source={rectIco} style={styles.img} />
						</TouchableOpacity>
						<TouchableOpacity
							style={type === 'circle'? styles.select : styles.touch}
							onPress={()=>{Keyboard.dismiss();setType('circle')}}>
							<MyText myStyle={styles.imgText}>Rotonda</MyText>
							<Image source={circleIco} style={styles.img} />
						</TouchableOpacity>
						<TouchableOpacity
						style={type === 'square'? styles.select : styles.touch}
						onPress={()=>{Keyboard.dismiss();setType('square')}}>
							<MyText myStyle={styles.imgText}>Quadrata</MyText>
							<Image source={squareIco} style={styles.img} />
						</TouchableOpacity>
					</View>
				</View>
				<View style = {styles.measurement}>
				{type === 'rect' 
					? 	<View>
							<MyText myStyle={styles.label}>Misure</MyText>
							<View style={styles.dimInput}>
							    <Picker style={styles.picker}
							    		selectedValue={a} mode='dropdown'
							    		onValueChange={(value)=>setA(value)}>
							    			{pickers}
							    </Picker>
							    <MyText myStyle={styles.pickerText}>X</MyText>
							    <Picker style={styles.picker}
							    		selectedValue={b} mode='dropdown'
							    		onValueChange={(value)=>setB(value)}>
							    			{pickers}
							    </Picker>
							    <MyText myStyle={styles.pickerText}>cm</MyText>
							</View>
						</View>
					: 	
					 	<View>
					 		<MyText myStyle={styles.label}>Misura:</MyText>
							<View style={styles.sideView}>
								<MyText myStyle={styles.sideText}>Diametro/Lato:</MyText>
								<Picker style={styles.sidePicker}
							    		selectedValue={dim} mode='dropdown'
							    		onValueChange={(value)=>setDim(value)}>
							    			{pickers}
							    </Picker>
							</View>
						</View>
				}
					<View style={styles.servs}>
						<MyText myStyle={{fontSize:18}}>Porzioni: <MyText myStyle={styles.servsText}>{servs}</MyText></MyText>		
					</View>
				</View>
				<View style={styles.btnRow}>
					<TouchableOpacity style={styles.btn}  large transparent onPress={()=>onCancel()}>
						<MyText myStyle={styles.btnText}>INDIETRO</MyText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} disabled={invalidForm} large transparent onPress={()=>onSave()}>
						<MyText myStyle={styles.btnText}>SALVA TEGLIA</MyText>
					</TouchableOpacity>
				</View>
			</View>
		</View>
		</TouchableWithoutFeedback>
		);
}
export default connect(null,{toggleBlurAction,addTrayAction})(NewTrayModal)

const styles = StyleSheet.create({
	mainView:{
		position:'absolute',
		top:'-25%',
		height:'120%',
		width:'100%',
		backgroundColor:'transparent',
		zIndex:6,
	},
	contentView:{
		position:'relative',
		top:'25%',
		backgroundColor: '#fef1d8',   //SURFACE
		padding:10,
		paddingBottom:15,
		borderRadius:25,
		borderRightWidth:4,
		borderBottomWidth:4,
		borderColor:'#feaa52'   
	},
	label:{
		textAlign:'center',
		fontSize:20
	},
	nameInput:{
		borderTopWidth:1,
		textAlign:'center',
		borderColor:'#feaa52'
	},
	textInput:{
		fontSize:18
	},
	btnRow:{
		flexDirection:'row',
		justifyContent:'space-around',
	},
	name:{
		justifyContent:'center',
		alignItems:'center',
		borderTopWidth:1,
		borderTopColor:'#feaa52',
		marginBottom:20,
	},
	
	type:{
		justifyContent:'center',
		paddingBottom:20,
		marginBottom:10,
		borderBottomWidth:1,
		borderTopWidth:1,
		borderColor:'#feaa52',
	},
	measurement:{
		justifyContent:'center',
		borderBottomWidth:1,
		marginBottom:25,
		paddingBottom:25,
		borderColor:'#feaa52',
	},
	
	select:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		borderBottomWidth:3,
		borderBottomColor:'#feaa52'
	},
	touch:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	imgText:{
		fontSize:14,
		textAlign:'center',
	},
	img:{
		width:100,
		height:100,
	},
	dimInput:{
		flexDirection:'row',
		alignItems:'center',
		textAlign:'center',
	},
	pickerItem:{ //not in use in android
		
	},
	picker:{
		width:85,
		backgroundColor:'transparent',
		transform: [
      		{ scaleX: 1.1 }, 
      		{ scaleY: 1.3 },
  		],
  		position:'relative',
  		left:'200%',
	},
	pickerText:{
		width:'15%',
		position:'relative',
  		left:'90%',
  		marginRight:'-18%',
		textAlign:'center',
	},
	sidePicker:{
		flex:1,
		backgroundColor:'transparent',
		transform: [
      		{ scaleX: 1.1 }, 
      		{ scaleY: 1.3 },
  		],
	},
	sideView:{
		flexDirection:'row',
		alignItems:'center'
	},
	sideText:{
		flex:3,
		textAlign:'center',
		fontSize:18
	},
	servs:{
		flex:1,
		alignItems:'center',
	},
	servsText:{
		fontWeight:'bold',
		fontSize:18
	},
	btn:{
		backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		padding:5,
		elevation:5,
		margin:10,
	},
	btnText:{
		fontSize:22,
		color:'#e8871e',			//BUTTON TEXT
	},
	textInput:{
		fontSize:18
	}
})