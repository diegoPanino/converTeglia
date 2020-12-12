import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'native-base';
import * as KitchenMath from '../api/kitchenMath';

const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		flexDirection:'row',
	},
	picker:{
		backgroundColor:'transparent',
	},
	trayRad:{
		flex:1.3,
		flexDirection:'row',
		alignItems:'center',
	},
	trayRadText:{
		flex:1,
		marginRight:'5%',
	},
	sizePicker:{
		flex:1,
		width:'60%',
	},
	portions:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-end',
	},
	portionsPicker:{
		width:'60%',
	},
	icon:{
		width:'30%',
		fontSize:20,
		marginLeft:'-28%',
	},
})

export default function InfoTray({rad=22}){
	const [servs,setServs] = useState(KitchenMath.getServsFromRad(rad));
	const [size,setSize] = useState(rad);

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

	let pickerPortions=[];
	for(let i = 1;i<=30;i++){
		pickerPortions.push(i)
	}
	const PickerItemsPortions = pickerPortions.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

	let pickerSize=[];
	for(let i = 1;i<=44;i++){
		pickerSize.push(i)
	}
	const PickerItemsSize = pickerSize.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

	return (
		<View style={styles.mainContainer}>
			<View style={styles.trayRad}>
				<Text style={styles.trayRadText}>Teglia ricetta originale(cm):</Text>
				<View style={styles.sizePicker}>
					<Picker style={styles.picker} mode='dropdown'
							selectedValue={size} 
							onValueChange={(value)=>setSize(value)}>
						{PickerItemsSize}
					</Picker>
				</View>
			</View>
			<View style={styles.portions}>
				<View style={styles.portionsPicker}>
					<Picker style={styles.picker} mode='dropdown'
							selectedValue={servs}
							onValueChange={(value)=>setServs(value)}>
						{PickerItemsPortions}
					</Picker>
				</View>
				<Icon style={styles.icon} name='md-person' />
			</View>
		</View>
		);
}