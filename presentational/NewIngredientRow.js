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
		borderColor:'#780116'
	},
	units:{
		flex:0.5,
		borderWidth:2,
		borderRadius:10,
		marginLeft:10,
		marginRight:10,	
		borderColor:'#780116'	
	},
	picker:{
		backgroundColor:'transparent',
		width:78,
		color:'#780116'
	},
	names:{
		flex:3,
		borderWidth:2,
		borderRadius:10,
		borderColor:'#780116'
	},
	icoContainer:{
		flex:0.5,
		alignSelf:'center',
		alignItems:'flex-end',
		marginRight:-3
	},
	h3Text:{
		fontSize:20,
		color:'#780116'
	},
	color:{
		color:'#780116'
	}
})

export default function NewIngredientRow({form=false,...props}){
	const [amounts,setAmount] = useState(props.amounts)
	const [units,setUnit] = useState(props.units)
	const [names,setName] = useState(props.names)
	const [id,setId] = useState(props.id)
	const [showDeleteIco,setShowDeleteIco] = useState(false)
	const {newIngredient,deleteIngredient,index} = props
	const animationScale = useRef(new Animated.Value(0)).current

	const unitss = [' ','g','kg','ml','dl','l','CT','ct','tz']
	const pickerUnit = unitss.map(el=>{
		return <Picker.Item style={styles.pickerItem} label={`${el}`} value={el} key={el}/>
	})

	useEffect(()=>{
		Animated.timing(animationScale,{
			toValue:1,
			duration:600,
			useNativeDriver:false
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
						placeholderTextColor='#780116'
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
						style={styles.h3Text}
						autofocus={false}
						placeholder='burro'
						placeholderTextColor='#780116'
						textAlign='center'
						value={names}
						onChangeText={(text)=>onNameChange(text)}
						onSubmitEditing={()=>onSubmitHandler()}
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