import React,{useState,useEffect} from 'react';
import {View,Modal,StyleSheet,TouchableOpacity,useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MyText from './MyText';
import * as KitchenMath from '../api/kitchenMath';
import TutorialBox from './tutorial/TutorialBox.js';
import MyPicker from './MyPicker.js';

export default function OriginalTrayInfoModal(props){
	const {height,width} = useWindowDimensions()
	const {confirm,showModal,tray,blurAction,tutorial} = props
	const [size,setSize] = useState(tray)
	const [servs,setServs] = useState(KitchenMath.getServsFromRad(tray))

	let pickerSize=[];
	for(let i = 1;i<=44;i++){
		pickerSize.push(i)																		//create a picker items with numbers
	}
	let pickerPortions=[];
	for(let i = 1;i<=30;i++){
		pickerPortions.push(i)
	}

	useEffect(()=>{
		blurAction()							//on mount blur the header
	},[])
	useEffect(()=>{
		onServsChange()							//when servs change call the function to update also the size
	},[servs])
	useEffect(()=>{								//same as above, one value depend on the other one
		onSizeChange()
	},[size])

	const onSizeChange=()=>{
		const newServs = KitchenMath.getServsFromRad(size)				//calculate the corresponding servs depending on size of the tray
		setServs(newServs);
	}
	const onServsChange=()=>{
		const newSize = KitchenMath.getRadFromServs(servs)			//same as above, the value are closed, so 1 value change correspond to 2 renders
		setSize(newSize);
	}

	const onConfirm=()=>{
		const area = KitchenMath.getAreaFromRad(size);			//onConfirm button set the area of the recipe original tray
		confirm(area);
	}

	return (
		<View style={[styles.mainView,{height:height*0.76,width:width}]} >
			<View style={styles.contentView}>
				<View style={styles.contentTextView}>
					<MyText myStyle={[styles.center,styles.underlineText]}>
						La ricetta originale usa questa teglia:
					</MyText>
					<MyText myStyle={[styles.center,styles.warning]}>
						(Si consiglia di controllare sempre!)
					</MyText>
				</View>
				<View style={styles.rowContainer}>
					<View style={styles.row}>
						<View style={styles.pickerContainer}>	
							<MyPicker values={pickerSize} textStyle={{fontSize:20}}
									selectValue={size} 
									onValueChange={(value)=>setSize(value)} />
						</View>
						<View style={styles.pickerTextContainer}>
							<MyText myStyle={styles.cm}>cm</MyText>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.pickerContainer}>	
							<MyPicker values={pickerPortions} textStyle={{fontSize:20}}
									selectValue={servs} 
									onValueChange={(value)=>setServs(value)} />
						</View>
						<View style={styles.pickerTextContainer}>						
							<Icon name='md-person' style={[styles.ico,styles.cm]} />
						</View>	
					</View>
				</View>
				<View style={styles.btnRow}>
					<TouchableOpacity style={styles.closeButton} onPress={()=>onConfirm()}>
						<MyText myStyle={styles.closeBtnText}>CONTINUA</MyText>
					</TouchableOpacity>
				</View>
			</View>
			{tutorial && <TutorialBox type='modalOriginal' reduxFunction ={()=>onConfirm()}  />}
		</View>
		);
}
	const styles= StyleSheet.create({
		mainView:{
			position:'absolute',
			top:'10%',
			left:0,
			justifyContent:'center',
			alignItems:'center',
			backgroundColor:'transparent',
			zIndex:6,
		},
		contentView:{
			maxWidth:600,
			flex:0.6,
			alignItems:'center',
			marginRight: 20,
			marginLeft:20,
	    	backgroundColor: "#fef1d8",			//SURFACE
		    borderRadius: 20,
		    padding: 10,
		    shadowColor: "#000",
		    shadowOffset: {
		      width: 0,
		      height: 2
		    },
		    shadowOpacity: 0.25,
		    shadowRadius: 3.84,
		    elevation: 5,
		},
		contentTextView:{
			flex:2,
			flexGrow:1,
		},
		underlineText:{
			borderBottomWidth:1,
		},
		rowContainer:{
			flex:1,
			flexGrow:2,
			justifyContent:'center',
			alignSelf:'center'
		},
		row:{
			width:'50%',
			flexDirection:'row',
			alignItems:'center',
		},
		pickerContainer:{
			flex:1,
			alignItems:'flex-end'
		},
		pickerTextContainer:{
			flex:1,
			alignItems:'flex-start',
		},
		btnRow:{
			marginTop:10,
			flex:0.6,
			alignSelf:'flex-end',
			justifyContent:'flex-start',
		},
		closeButton:{
			maxHeight:45,
			backgroundColor:'#feea52', //BUTTON BACKGROUND
			borderWidth:2,
			borderColor:'#E8871E', 		//BUTTON BORDER
			borderRadius:20,
			padding:5,
			elevation:5,
		},
		closeBtnText:{
			textAlign:'center',
			fontSize:22,
			color:'#e8871e'       //BUTTON TEXT COLOR
		},
		cm:{
			justifyContent:'center',
		},
		ico:{
		  	fontSize:18,
		},
		center:{
			textAlign:'center',
		},
		warning:{
			paddingTop:5,
			color:'red',
			fontSize:16,
		}
	})