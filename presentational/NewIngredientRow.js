import React,{useState,useEffect} from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
import {Button,Icon} from 'native-base';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
	ingredientRow:{
		flex:1,
		flexDirection:'row',
		marginTop:5,
		marginBottom:5,
	},
	amount:{
		flex:1,
		borderWidth:2,
		borderRadius:10,
	},
	unit:{
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
	name:{
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

export default function NewIngredientRow(props){
	const [amount,setAmount] = useState()
	const [unit,setUnit] = useState(' ')
	const [name,setName] = useState()
	const [enableInput,setEnableInput] = useState(true)
	const {newIngredient,id} = props

	const units = ['g','kg','ml','dl','l','CT','ct','tz',' ']
	const pickerUnit = units.map(el=>{
		return <Picker.Item style={styles.pickerItem} label={`${el}`} value={el} key={el}/>
	})
	
	console.log(id)

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
		let failed;
		if(amount && name)
			failed = newIngredient({amount,unit,name})
		if(!failed){
			setAmount('')
			setUnit(' ')
			setName()
		}
		else{
			setEnableInput(false)
		}


	}


	return (
		<View style={styles.ingredientRow}>
				<View style={styles.amount}>
					<TextInput
						placeholder='250'
						placeholderTextColor='gray'
						textAlign='center'
						keyboardType='numeric'
						value={amount}
						onChangeText={text=>onAmountChageHandler(text)}
						onSubmitEditing={()=>onSubmitHandler()}
						returnKeyType='next'
						
					/>
				</View>
				<View style={styles.unit}>
					<Picker style={styles.picker}
							mode='dropdown'
							selectedValue={unit}
							onValueChange={(val)=>setUnit(val)}
							
							>
						{pickerUnit}	
					</Picker>

				</View>
				<View style={styles.name}>
					<TextInput
						placeholder='burro'
						placeholderTextColor='gray'
						textAlign='center'
						value={name}
						onChangeText={(text)=>onNameChange(text)}
						onSubmitEditing={()=>onSubmitHandler()}
						returnKeyType='next'
						
					/>
				</View>
				<View style={styles.icoContainer}>
					<Icon name='close-circle-outline' onPress={()=>console.log('press')} />
				</View>
			</View>
		);
}


/*<TextInput
						placeholder='g'
						placeholderTextColor='black'
						textAlign='center'
						onChangeText={(text)=>onUnitChange(text)}
					/>*/