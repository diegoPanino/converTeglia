import React,{useState,useEffect} from 'react';
import {View,Modal,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MyText from './MyText';
import * as KitchenMath from '../api/kitchenMath';
import TutorialBox from './tutorial/TutorialBox.js';
import MyPicker from './MyPicker.js';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default function OriginalTrayInfoModal(props){
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
		<View style={styles.mainView} >
		{tutorial && <TutorialBox type='modalOriginal' reduxFunction ={()=>onConfirm()}  />}
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
			height:HEIGHT * 0.86,
			width:WIDTH,
			minHeight:550,
			backgroundColor:'transparent',
			zIndex:6,
		},
		contentView:{
			maxWidth:600,
			flex:0.5,
			alignItems:'center',
			marginRight: 20,
			marginLeft:20,
	    	backgroundColor: "#fef1d8",			//SURFACE
		    borderRadius: 20,
		    padding: 20,
		    shadowColor: "#000",
		    shadowOffset: {
		      width: 0,
		      height: 2
		    },
		    shadowOpacity: 0.25,
		    shadowRadius: 3.84,
		    elevation: 5,
		    borderRightWidth:3,
		    borderBottomWidth:3,
		    borderColor:'#feaa52'
		},
		contentTextView:{
			flex:1,
		},
		underlineText:{
			borderBottomWidth:1,
		},
		rowContainer:{
			flex:1,
			justifyContent:'center'
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
			justifyContent:'flex-end',
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
			textAlign:'center'
		},
		warning:{
			paddingTop:5,
			color:'red',
			fontSize:16,
		}
	})

/*	const styles = StyleSheet.create({
	mainView:{
		position:'absolute',
		top:'20%',
		left:0,
		justifyContent:'center',
		height:HEIGHT * 0.76,
		width:WIDTH,
		backgroundColor:'transparent',
		zIndex:6,
		borderColor:'pink',
		borderWidth:3,
	},	
	contentView:{
		flex:0.5,
		margin: 20,
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
	    borderWidth:3,
	    borderColor:'blue'
	  },
	closeButton:{
	  	position:'absolute',
	  	right:5,
	  	bottom:0,
	  	backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		padding:5,
		elevation:5,
		margin:10,
	},
	closeBtnText:{
		fontSize:22,
		color:'#e8871e'       //BUTTON TEXT COLOR
	},
	selectedTray:{
	  	flex:1,
	  	justifyContent:'center',
	  	alignItems:'center',
	  	//marginBottom:70,
	  	marginTop:10,
	  	borderWidth:1,
	  	borderColor:'green'
	},
	pickerContainer:{
		width:'30%',
		height:'50%',
		borderWidth:1,
		borderColor:'red'
	},
	picker:{
		backgroundColor:'transparent',
		left:'28%',
		borderWidth:1,
		borderColor:'pink'
	},
	cm:{
		bottom:35,
		left:'75%',
		fontSize:18,
	},
	ico:{
	  	fontSize:15,
	  	paddingLeft:5,
	},
	center:{
	  	textAlign:'center',
	  	fontSize:18,
	},
	warning:{
		color:'red',
		fontSize:16,
	}
})*/