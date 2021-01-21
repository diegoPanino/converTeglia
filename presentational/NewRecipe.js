import React,{useState,useEffect,useRef} from 'react';
import {View,TextInput,StyleSheet,ScrollView,TouchableOpacity,Alert} from 'react-native';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import { v4 as idGen} from 'uuid';
import NewIngredientRow from './NewIngredientRow';
import {toggleBlurAction,searchLinkAction,saveSearchedLinkAction} from '../redux/actions';
import TutorialBox from './tutorial/TutorialBox.js'
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
		backgroundColor: '#fef1d8',   					 //SURFACE
		padding:10,
		paddingBottom:15,
		borderRadius:25,
		borderRightWidth:4,
		borderBottomWidth:4,
		borderColor:'#feaa52'   //surface border     //BUTTON BORDER
	},
	titleContainer:{
		borderColor:'#feaa52',						//BUTTON BORDER
		borderTopWidth:1,
		borderBottomWidth:1,
		marginBottom:15,
	},
	titleInput:{
		fontSize:20,
		color:'black'							//TEXT
	},
	ScrollView:{
		height:'45%',
		borderBottomWidth:1,
		marginBottom:15,
		borderColor:'#feaa52',					//BUTTON BORDER
	},
	ingredientRow:{
		
	},
	btnRow:{
		flexDirection:'row',
		justifyContent:'space-around',
	},
	btn:{
		backgroundColor:'#feea52', 				//BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 
		borderRadius:20,
		padding:5,
		elevation:5,
		margin:10,
	},
	btnText:{
		color:'#e8871e',
		//fontWeight:'bold'							//BUTTON TEXT
	}
})

function MakeNewRecipe(props){
	const [title,setTitle] = useState()
	const [invalidForm,setInvalidForm] = useState(false)
	const [ingredientRow,setIngredientRow]=useState(props.recipe||[])
	const {read} = props
	const {hide,navigation,tutorial} = props
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
		if(!tutorial){
			if(!(title)){
			Alert.alert('Attenzione','Dai un nome alle tua ricetta!')
			return
			}
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
		{tutorial && <TutorialBox  type='newRecipe' 
					navigation={navigation} next='ResultScreen' 
					exampleFunction={(ingr)=>setIngredientRow(ingr)}
					titleFunction={(text)=>setTitle(text)}
					reduxFunction={()=>onConvertPress()} />}
			<View style={styles.contentView}>
				<View style={styles.titleContainer}>
					<TextInput style={styles.titleInput}
						placeholder='Dai un nome alla tua ricetta!'
						placeholderTextColor='black'
						textAlign='center'
						autoFocus={false}
						onChangeText={(text)=>setTitle(text)}
					/>
				</View>
				<ScrollView style={styles.ScrollView}>	
					{ingredientRow.map((el,i)=>{
						return (
								<NewIngredientRow style={styles.ingredientRow} key={el.id}
									newIngredient={ingredient=>addIngredient(ingredient)}
									deleteIngredient={id=>onDeleteIngredient(id)}
									amounts={el.amounts} units={el.units} names={el.names} id={el.id} delay={i}
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
					<TouchableOpacity style={styles.btn} onPress={()=>hide()}>
						<MyText myStyle={styles.btnText}>INDIETRO</MyText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={()=>onConvertPress()} >
						<MyText myStyle={styles.btnText}>CONVERTI</MyText>
					</TouchableOpacity>
				</View>
			</View>
		</View>
		);
}
export default connect(null,{toggleBlurAction,searchLinkAction,saveSearchedLinkAction})(MakeNewRecipe)