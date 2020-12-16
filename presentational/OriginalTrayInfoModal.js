import React,{useState,useEffect} from 'react';
import {View,Text,Modal,StyleSheet,useWindowDimensions} from 'react-native';
import {Button,Icon} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import * as KitchenMath from '../api/kitchenMath';

export default function OriginalTrayInfoModal(props){
	const {confirm,showModal,tray} = props
	const [size,setSize] = useState(tray)
	const [servs,setServs] = useState(KitchenMath.getServsFromRad(tray))
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;
	const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		top:windowHeight/3,
		height:windowHeight/4.5,
		width:windowWidth-40,
		margin: 20,
    	backgroundColor: "white",
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
	  	right:20,
	  	bottom:5,
	},
	selectedTray:{
	  	flex:1,
	  	alignItems:'center',
	  	marginBottom:30,
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
	},
	flex1:{
	 	flex:1,
	},
	bold:{
	 	fontWeight:'bold'
	},
	ico:{
	  	fontSize:15,
	  	paddingLeft:5,
	},
	center:{
	  	textAlign:'center',
	  	fontSize:16,
	},
	warning:{
		color:'red',
		fontSize:11,
	}
})

	let pickerSize=[];
	for(let i = 1;i<=44;i++){
		pickerSize.push(i)
	}
	const PickerItemsSize = pickerSize.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})
	let pickerPortions=[];
	for(let i = 1;i<=30;i++){
		pickerPortions.push(i)
	}
	const PickerItemsPortions = pickerPortions.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

	useEffect(()=>{
		onServsChange()
	},[servs])
	useEffect(()=>{
		onSizeChange()
	},[size])

	const onSizeChange=()=>{
		const newServs = KitchenMath.getServsFromRad(size)
		setServs(newServs);
	}
	const onServsChange=()=>{
		const newSize = KitchenMath.getRadFromServs(servs)
		setSize(newSize);
	}

	const onConfirm=()=>{
		const area = KitchenMath.getAreaFromRad(size);
		confirm(area);
	}

	return (
		<Modal animationType='slide' transparent={true} visible={showModal}>
			<View style={styles.modalView}>
				<View>
					<Text style={styles.center}>
						La ricetta originale usa questa teglia:
					</Text>
					<Text style={[styles.center,styles.warning]}>
						(Si consiglia di controllare sempre!)
					</Text>
				</View>
				<View style={styles.selectedTray}>
					<View style={styles.pickerContainer}>
						<Picker style={styles.picker} mode='dropdown'
								selectedValue={size} 
								onValueChange={(value)=>setSize(value)}>
							{PickerItemsSize}
						</Picker>
						<Text style={styles.cm}>cm</Text>
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
				<Button style={styles.closeButton} rounded transparent onPress={()=>onConfirm()}>
					<Text>CONTINUA</Text>
				</Button>
			</View>
		</Modal>
		);
}