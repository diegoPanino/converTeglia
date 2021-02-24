import React,{useState,useEffect,useRef} from 'react';
import {View,TextInput,StyleSheet,ScrollView,TouchableOpacity,Alert,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import { v4 as idGen} from 'uuid';
import NewIngredientRow from './NewIngredientRow';
import {toggleBlurAction,searchLinkAction,saveSearchedLinkAction} from '../redux/actions';
import TutorialBox from './tutorial/TutorialBox.js'
import MyText from './MyText';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function MakeNewRecipe(props){
	const [title,setTitle] = useState()
	const [invalidForm,setInvalidForm] = useState(false)
	const [ingredientRow,setIngredientRow]=useState(props.recipe||[])
	const [dropMenu,setDropMenu] = useState(true)
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

		if(!(ingredient.id))					//if ingredient doesn't have id, so it's new, create one
			ingredient.id = idGen()
		
		const existId = ingredientRow.some((el)=>{				//check if the ingredient id is already present into the list
				return el.id === ingredient.id
		})

		if(existId){
			const editIng = ingredientRow.find((el,i)=>{			//if already present into the list, edit the existing ingredient
				if(el.id === ingredient.id){
					const copy = [...ingredientRow]
					copy[i] = {...ingredient}
					setIngredientRow(copy)
					return false;
				}
			})
		}//id exist so edit
		else{																//if id doesn't exist, check if it is a duplicate
			const isDuplicate = ingredientRow.some((el)=>{				
				const elValue = el.amounts+el.units+el.names				//if it's duplicate don't change and discard the line
				const newIngr = amounts+units+names
				return elValue === newIngr
			})
			if(!isDuplicate){
				const newIngredient = [...ingredientRow,ingredient]			//if it's not duplicate, make a new ingredient line
				setIngredientRow(newIngredient)	
				return false;	
			}
			else
				return true;
		}
	}

	const onDeleteIngredient=id=>{
		const ingredient = ingredientRow.find((el)=>{			//on delete ingredient, find the id and remove from the array list of ingredients
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
		if(!tutorial){																		//on convert press, check if there is a name, otherwise
			if(!(title)){															//show an alert
			Alert.alert('Attenzione','Dai un nome alle tua ricetta!')
			return
			}
		}
		if(ingredientRow.length <= 0){													//check if there are ingredients into the list otherwise
			Alert.alert('Attenzione','Aggiungi ingredienti alla tua ricetta!')
			return 																		//show alert
		}
		const ingredients = ingredientRow.map((el,i)=>{
			delete el.id  														//for each ingredient, remove the id property and add instead key
			return {...el,key:i}
		})
		const recipe = {
			url:'Ricetta personale',											//complete the recipe obj
			src:'immagine personale',
			title:title,
			trayRad:22,
			ingredients:ingredients
		}
		saveSearchedLinkAction(recipe)										//save the recipe into redux, and go to the result page
		searchLinkAction(recipe)
		hide()
		navigation.navigate('ResultScreen');
	}

//inside the scrollview always rendere an ingredient row, empty that is gonna be used to add new ingredient. 
//map on ingredientRow (array of ingredients), and for each one render a ingredientRow, passing delay for animation based on the index and unique id
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
						maxLength={32}
						onChangeText={(text)=>setTitle(text)}
					/>
				</View>
				<ScrollView style={styles.scrollView}>	
					{ingredientRow.map((el,i)=>{
						return (
								<NewIngredientRow key={el.id}
									newIngredient={ingredient=>addIngredient(ingredient)}
									deleteIngredient={id=>onDeleteIngredient(id)}
									amounts={el.amounts} units={el.units} names={el.names} id={el.id} delay={i}
									dropMenu={dropMenu}
								/>)
						})			
					}
					<NewIngredientRow key={'0'}
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

const styles = StyleSheet.create({
	mainView:{
		position:'absolute',
		top:'20%',
		left:0,
		justifyContent:'center',
		height:HEIGHT * 0.76,
		width:WIDTH,
		backgroundColor:'transparent',
		zIndex:6,
	},
	contentView:{
		//top:'15%',
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
	scrollView:{
		height:'45%',
		borderBottomWidth:1,
		marginBottom:15,
		borderColor:'#feaa52',					//BUTTON BORDER
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
		color:'#e8871e',						//BUTTON TEXT
	}
})