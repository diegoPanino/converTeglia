import React,{useState,useEffect,useRef} from 'react';
import {View,TextInput,StyleSheet,ScrollView,TouchableOpacity,Alert} from 'react-native';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import { v4 as idGen} from 'uuid';
import NewIngredientRow from './NewIngredientRow';
import {toggleBlurAction,searchLinkAction,saveSearchedLinkAction} from '../redux/actions';
import MyText from './MyText';

const styles = StyleSheet.create({
	mainView:{
		position:'absolute',
		top:'-2%',
		height:'100%',
		width:'100%',
		backgroundColor:'transparent',
		zIndex:6,
	},
	contentView:{
		position:'relative',
		top:'25%',
		backgroundColor: '#f5f3bb',
		padding:10,
		paddingBottom:15,
		borderRadius:25,
		borderRightWidth:4,
		borderBottomWidth:4,
		borderColor:'#780116'
	},
	titleContainer:{
		borderColor:'#780116',
		borderTopWidth:1,
		borderBottomWidth:1,
		marginBottom:15,
	},
	titleInput:{
		fontSize:20,
		color:'#780116'
	},
	ScrollView:{
		height:'45%',
		borderBottomWidth:1,
		marginBottom:15,
		borderColor:'#780116',
	},
	ingredientRow:{
		
	},
	btnRow:{
		flexDirection:'row',
		justifyContent:'space-around',
	},
	btn:{
		backgroundColor:'#ffd300', //secondary
		color:'#780116',
		fontWeight:'bold',
		borderWidth:2,
		borderColor:'#780116', 
		borderRadius:20,
		padding:5,
		elevation:5,
		margin:10,
	}
})

function MakeNewRecipe(props){
	const [title,setTitle] = useState()
	const [invalidForm,setInvalidForm] = useState(false)
	const [ingredientRow,setIngredientRow]=useState(props.recipe||[])
	const {read} = props
	const {hide,navigation} = props
	const {toggleBlurAction,searchLinkAction,saveSearchedLinkAction} = props

	useEffect(()=>{
		toggleBlurAction()
		return ()=>{
			toggleBlurAction()
			setIngredientRow([])
			}
	},[])

	const addIngredient=ingredient=>{
		const {amounts,units,names} = ingredient

		if(!(ingredient.id))
			ingredient.id = idGen()
		
		const existId = ingredientRow.some((el)=>{
				return el.id === ingredient.id
		})

		if(existId){
			const editIng = ingredientRow.find((el,i)=>{
				if(el.id === ingredient.id){
					const copy = [...ingredientRow]
					copy[i] = {...ingredient}
					setIngredientRow(copy)
					return false;
				}
			})
		}//id exist so edit
		else{
			const isDuplicate = ingredientRow.some((el)=>{
				const elValue = el.amounts+el.units+el.names
				const newIngr = amounts+units+names
				return elValue === newIngr
			})
			if(!isDuplicate){
				const newIngredient = [...ingredientRow,ingredient]
				setIngredientRow(newIngredient)	
				return false;	
			}
			else
				return true;
		}
	}

	const onDeleteIngredient=id=>{
		const ingredient = ingredientRow.find((el)=>{
			if(id === el.id){
				const copyIngredient=[...ingredientRow]
				const index = copyIngredient.indexOf(el)
				copyIngredient.splice(index,1)
				setIngredientRow(copyIngredient)
				return true
			}
		})
	}	

	const onConvertPress=()=>{
		if(!(title)){
			Alert.alert('Attenzione','Dai un nome alle tua ricetta!')
			return
		}
		if(ingredientRow.length <= 0){
			Alert.alert('Attenzione','Aggiungi ingredienti alla tua ricetta!')
			return 
		}
		const ingredients = ingredientRow.map((el,i)=>{
			delete el.id
			return {...el,key:i}
		})
		const recipe = {
			url:'Ricetta personale',
			src:'immagine personale',
			title:title,
			trayRad:22,
			ingredients:ingredients
		}
		saveSearchedLinkAction(recipe)
		searchLinkAction(recipe)
		hide()
		navigation.navigate('ResultScreen');
	}

	return(
		<View style={styles.mainView}>
			<View style={styles.contentView}>
				<View style={styles.titleContainer}>
					<TextInput style={styles.titleInput}
						placeholder='Dai un nome alla tua ricetta!'
						placeholderTextColor='#780116'
						textAlign='center'
						autoFocus={true}
						onChangeText={(text)=>setTitle(text)}
					/>
				</View>
				<ScrollView style={styles.ScrollView}>	
					{ingredientRow.map((el,i)=>{
						return (
								<NewIngredientRow style={styles.ingredientRow} key={el.id}
									newIngredient={ingredient=>addIngredient(ingredient)}
									deleteIngredient={id=>onDeleteIngredient(id)}
									amounts={el.amounts} units={el.units} names={el.names} id={el.id}
								/>)
						})			
					}
					<NewIngredientRow key={'0'} style={styles.ingredientRow}
									newIngredient={ingredient=>addIngredient(ingredient)}
									deleteIngredient={id=>onDeleteIngredient(id)}
									form={true}
									/>
				</ScrollView>
				<View style={styles.btnRow}>
					<TouchableOpacity style={styles.btn} onPress={()=>onConvertPress()} >
						<MyText>CONVERTI</MyText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={()=>hide()}>
						<MyText>INDIETRO</MyText>
					</TouchableOpacity>
				</View>
			</View>
		</View>
		);
}
export default connect(null,{toggleBlurAction,searchLinkAction,saveSearchedLinkAction})(MakeNewRecipe)