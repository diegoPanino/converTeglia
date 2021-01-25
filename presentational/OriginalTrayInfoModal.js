import React,{useState,useEffect} from 'react';
import {View,Modal,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Picker} from '@react-native-picker/picker';
import MyText from './MyText';
import * as KitchenMath from '../api/kitchenMath';
import TutorialBox from './tutorial/TutorialBox.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OriginalTrayInfoModal(props){
	const {confirm,showModal,tray,blurAction,tutorial} = props
	const [size,setSize] = useState(tray)
	const [servs,setServs] = useState(KitchenMath.getServsFromRad(tray))

	let pickerSize=[];
	for(let i = 1;i<=44;i++){
		pickerSize.push(i)																		//create a picker items with numbers
	}
	const PickerItemsSize = pickerSize.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})
	let pickerPortions=[];
	for(let i = 1;i<=30;i++){
		pickerPortions.push(i)
	}
	const PickerItemsPortions = pickerPortions.map(i=>{										//create a picker items with numbers for portions
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

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
		<Modal animationType='slide' transparent={true} visible={showModal}>
		{tutorial && <TutorialBox type='modalOriginal' reduxFunction ={()=>onConfirm()}  />}
			<View style={styles.modalView}>
				<View>
					<MyText myStyle={styles.center}>
						La ricetta originale usa questa teglia:
					</MyText>
					<MyText myStyle={[styles.center,styles.warning]}>
						(Si consiglia di controllare sempre!)
					</MyText>
				</View>
				<View style={styles.selectedTray}>
					<View style={styles.pickerContainer}>
						<Picker style={styles.picker} mode='dropdown'
								selectedValue={size} 
								onValueChange={(value)=>setSize(value)}>
							{PickerItemsSize}
						</Picker>
						<MyText myStyle={styles.cm}>cm</MyText>
					</View>
					<View style={styles.pickerContainer}>
						<Picker style={styles.picker} mode='dropdown'
								selectedValue={servs} 
								onValueChange={(value)=>setServs(value)}>
							{PickerItemsPortions}
						</Picker>						
							<Icon name='md-person' style={[styles.ico,styles.cm]} />
					</View>
				</View>
				<TouchableOpacity style={styles.closeButton} onPress={()=>onConfirm()}>
					<MyText myStyle={styles.closeBtnText}>CONTINUA</MyText>
				</TouchableOpacity>
			</View>
		</Modal>
		);
}

	const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		top:windowHeight/3,
		height:windowHeight/3.5,
		width:windowWidth-40,
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
	  	alignItems:'center',
	  	marginBottom:70,
	  	marginTop:10,
	},
	pickerContainer:{
		width:'30%',
		height:'50%',
	},
	picker:{
		backgroundColor:'transparent',
		position:'relative',
		left:'28%',
	},
	cm:{
		position:'relative',
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
})