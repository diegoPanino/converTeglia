import React,{useState,useEffect,useRef} from 'react';
import {View,TextInput,StyleSheet,Animated,Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MyPicker from './MyPicker.js';

const SCREEN_WIDTH = Dimensions.get('window').width

export default function NewIngredientRow({form=false,...props}){
	const [amounts,setAmount] = useState(props.amounts)
	const [units,setUnit] = useState(props.units || ' ')
	const [names,setName] = useState(props.names)
	const [id,setId] = useState(props.id)
	const [showDeleteIco,setShowDeleteIco] = useState(false)
	const {newIngredient,deleteIngredient,delay} = props
	const animationScale = useRef(new Animated.Value(0)).current
	const [firstClickPicker,setFirstClickPicker] = useState(false)

	const unitss = [' ','g','kg','ml','dl','l','CT','ct','tz']

	useEffect(()=>{								//animation delayed showing new line of ingredients
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
	const onAmountChange=text=>{				//allow to insert only number into the ingredients input box
		const onlyNums = text.search(/\D/g)
		if( onlyNums === -1)
			setAmount(text)
	}
	const onNameChange=text=>{
		setName(text);
	}

	const onSubmitHandler=()=>{							//when units change or onSubmitEnding create the new ingredient
		if(names&&amounts){
			const fail = newIngredient({amounts,units,names,id})
			if(fail || form){
				setName()
				setAmount()
				setUnit(' ')
			}
		}
	}
	const onDeleteIngredient=id=>{				//animation and when finishe removed the ingredient
		Animated.timing(animationScale,{
			toValue:0,
			duration:600,
			useNativeDriver:true
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
						maxLength={4}
					/>
				</View>
				<View style={styles.units}>
					<MyPicker values={unitss} onValueChange={(val)=>setUnit(val)} icon={false} selectValue={units}
							 iconStyle={styles.pickerFontSize} textStyle={styles.pickerFontSize} xOffset={form?0:100}/>	
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
						autoCapitalize='none'
						maxLength={32}
					/>
				</View>
				<View style={styles.icoContainer}>
						{showDeleteIco
							?	<Icon style={[styles.ico,styles.color]} name='close-circle-outline' onPress={()=>onDeleteIngredient(id)} />
							: 	null
						}
				</View>
			</View>
		</Animated.View>
		);
}
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
		flex:0.7,
		borderWidth:2,
		alignItems:'center',
		justifyContent:'center',
		borderRadius:10,
		marginLeft:10,
		marginRight:10,	
		borderColor:'#feaa52'			//BUTTON BACKGROUND
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
	ico:{
		fontSize:25
	},
	h3Text:{
		fontSize:20,
		color:'black'			//TEXT INPUT
	},
	color:{
		color:'black' 				//ICO COLOR
	},
	pickerFontSize:{
		fontSize:18
	}
})



/*
<View style={styles.units}>
					<Picker style={styles.picker}
							mode='dropdown'
							selectedValue={units}
							onValueChange={(val)=>setUnit(val)}
							>
						{pickerUnit}	
					</Picker>
				</View>
*/