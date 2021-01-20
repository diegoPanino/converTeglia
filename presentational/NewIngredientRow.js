import React,{useState,useEffect,useRef} from 'react';
import {View,Text,TextInput,StyleSheet,Keyboard,Animated,Dimensions} from 'react-native';
import {Button,Icon} from 'native-base';
import {Picker} from '@react-native-picker/picker';

const SCREEN_WIDTH = Dimensions.get('window').width
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
		borderColor:'#feaa52'			//BUTTON BACKGROUND
	},
	units:{
		flex:0.5,
		borderWidth:2,
		borderRadius:10,
		marginLeft:10,
		marginRight:10,	
		borderColor:'#feaa52'			//BUTTON BACKGROUND
	},
	picker:{
		backgroundColor:'transparent',
		width:78,
		color:'black'				//TEXT INPUT
	},
	names:{
		flex:3,
		borderWidth:2,
		borderRadius:10,
		borderColor:'#feaa52'			//BUTTON BACKGROUND
	},
	icoContainer:{
		flex:0.5,
		alignSelf:'center',
		alignItems:'flex-end',
		marginRight:-3
	},
	h3Text:{
		fontSize:20,
		color:'black'			//TEXT INPUT
	},
	color:{
		color:'black' 				//ICO COLOR
	}
})

export default function NewIngredientRow({form=false,...props}){
	const [amounts,setAmount] = useState(props.amounts)
	const [units,setUnit] = useState(props.units || 'g')
	const [names,setName] = useState(props.names)
	const [id,setId] = useState(props.id)
	const [showDeleteIco,setShowDeleteIco] = useState(false)
	const {newIngredient,deleteIngredient,delay} = props
	const animationScale = useRef(new Animated.Value(0)).current

	const unitss = [' ','g','kg','ml','dl','l','CT','ct','tz']
	const pickerUnit = unitss.map(el=>{
		return <Picker.Item style={styles.pickerItem} label={`${el}`} value={el} key={el}/>
	})

	useEffect(()=>{
		Animated.timing(animationScale,{
			toValue:1,
			duration:600,
			delay: delay ? delay* 250 :0,
			useNativeDriver:true
		}).start()
	},[])
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
		setName(text);
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
	const onDeleteIngredient=id=>{
		Animated.timing(animationScale,{
			toValue:0,
			duration:600,
			useNativeDriver:false
		}).start((finished=>{
			if(finished)
				deleteIngredient(id)		
		}))	
	}

	return (
		<Animated.View style={{scaleX:animationScale,scaleY:animationScale}}>
		<View style={styles.ingredientRow}>
				<View style={styles.amounts}>
					<TextInput
						style={styles.h3Text}
						placeholder='250'
						placeholderTextColor='gray'
						textAlign='center'
						keyboardType='numeric'
						returnKeyType='next'
						value={amounts}
						onChangeText={text=>onAmountChageHandler(text)}
						onSubmitEditing={()=>onSubmitHandler()}
						onEndEditing={()=>onSubmitHandler()}
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
						style={styles.h3Text}
						placeholder='burro'
						placeholderTextColor='gray'
						textAlign='center'
						value={names}
						onChangeText={(text)=>onNameChange(text)}
						onSubmitEditing={()=>onSubmitHandler()}
						onEndEditing={()=>onSubmitHandler()}
						returnKeyType='done'
					/>
				</View>
				<View style={styles.icoContainer}>
						{showDeleteIco
							?	<Icon style={styles.color} name='close-circle-outline' onPress={()=>onDeleteIngredient(id)} />
							: 	null
						}
				</View>
			</View>
		</Animated.View>
		);
}