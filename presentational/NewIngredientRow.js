import React,{useState,useEffect,useRef} from 'react';
import {View,Text,TextInput,StyleSheet,Keyboard} from 'react-native';
import {Button,Icon} from 'native-base';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
	ingredientRow:{
		flex:1,
		flexDirection:'row',
		marginTop:5,
		marginBottom:5,
	},
	amounts:{
		flex:1,
		borderWidth:2,
		borderRadius:10,
	},
	units:{
		flex:0.5,
		borderWidth:2,
		borderRadius:10,
		marginLeft:10,
		marginRight:10,		
	},
	picker:{
		backgroundColor:'transparent',
		width:78,
	},
	names:{
		flex:3,
		borderWidth:2,
		borderRadius:10,
	},
	icoContainer:{
		flex:0.5,
		alignSelf:'center',
		alignItems:'flex-end',
		marginRight:-3
	}
})

export default function NewIngredientRow({form=false,...props}){
	const [amounts,setAmount] = useState(props.amounts)
	const [units,setUnit] = useState(props.units)
	const [names,setName] = useState(props.names)
	const [id,setId] = useState(props.id)
	const [showDeleteIco,setShowDeleteIco] = useState(false)
	const {newIngredient,deleteIngredient,index} = props
	const ref = useRef()

	const unitss = [' ','g','kg','ml','dl','l','CT','ct','tz']
	const pickerUnit = unitss.map(el=>{
		return <Picker.Item style={styles.pickerItem} label={`${el}`} value={el} key={el}/>
	})

	useEffect(()=>{
		onSubmitHandler()
	},[units])

	useEffect(()=>{
		if(id)
			setShowDeleteIco(true)
	},[id])


	const onAmountChageHandler=text=>{
		onAmountChange(text)
	}
	const onAmountChange=text=>{
		const onlyNums = text.search(/\D/g)
		if( onlyNums === -1)
			setAmount(text)
	}
	const onNameChange=text=>{
		setName(text)
	}
	const onSubmitHandler=()=>{
		if(names&&amounts){
			const fail = newIngredient({amounts,units,names,id})
			if(fail || form){
				setName()
				setAmount()
				setUnit(' ')
			}
		}
	}

	return (
		<View style={styles.ingredientRow}>
				<View style={styles.amounts}>
					<TextInput
						placeholder='250'
						placeholderTextColor='gray'
						textAlign='center'
						keyboardType='numeric'
						returnKeyType='next'
						value={amounts}
						onChangeText={text=>onAmountChageHandler(text)}
						onSubmitEditing={()=>onSubmitHandler()}
					/>
				</View>
				<View style={styles.units}>
					<Picker style={styles.picker}
							mode='dropdown'
							selectedValue={units}
							onValueChange={(val)=>setUnit(val)}
							>
						{pickerUnit}	
					</Picker>

				</View>
				<View style={styles.names}>
					<TextInput
						
						autofocus={false}
						placeholder='burro'
						placeholderTextColor='gray'
						textAlign='center'
						value={names}
						onChangeText={(text)=>onNameChange(text)}
						onSubmitEditing={()=>onSubmitHandler()}
						returnKeyType='done'
					/>
				</View>
				<View style={styles.icoContainer}>
						{showDeleteIco
							?	<Icon name='close-circle-outline' onPress={()=>deleteIngredient(id)} />
							: 	null
						}
				</View>
			</View>
		);
}