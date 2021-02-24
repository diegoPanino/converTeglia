import React,{useEffect,useState,useCallback,useRef} from 'react';
import {View,StyleSheet, TextInput,Keyboard, Modal, TouchableOpacity, Animated, InteractionManager} from 'react-native';
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { v4 as idGen} from 'uuid';
import {connect} from 'react-redux';
import MyText from '../presentational/MyText';
import {searchLinkAction,saveSearchedLinkAction,fetchIngredient} from '../redux/actions';
import {getIngredients} from '../api/fetch';
import MakeNewRecipe from '../presentational/NewRecipe';
import TutorialWelcome from '../presentational/tutorial/TutorialWelcome.js';
import MySplashScreen from './SplashScreen.js';


function SearchScreen({navigation,searchLinkAction,saveSearchedLinkAction,tutorial,fetchIngredient,result}){
	const [inputBox, setInputBox] = useState('')
	const [newRecipe,setNewRecipe] = useState(false)
	const [copiedRecipe,setCopiedRecipe] = useState('')
	const [isLoaded,setIsLoaded] = useState(false)
	const [searching,setSearching] = useState(false)
	const searchBtn = useRef(new Animated.Value(1)).current

	useEffect(()=>{
		console.log('effect')
		if(!result.fetching && searching){
			console.log('fetching: ',result.fetching,' searching: ',searching)
			if(result.recipe.hasOwnProperty('personal')){
				console.log('personal')
				const recipe = result.recipe.ingredients.map(ingr=>{
					return {amounts:ingr.amounts.toString(),
							units:ingr.units,
							names:ingr.names,
							id:idGen()
							}
					})
				setCopiedRecipe(recipe)
				setNewRecipe(true)
				return;
			}
			else if(result.length > 0)
				navigation.navigate('ResultScreen')
		}
	},[result])

	const shareTextHandler = useCallback((sharedItem)=>{			//if detect a share item, check if is text/plain, clean the string removing
	if(!sharedItem) return											//everything that is not url, get that value, update the input box 
																	//and on unmounting clean the listener for the shareitems
    const {mimeType,data} = sharedItem;
	    if(mimeType === 'text/plain'){
    	  const cleanedString = data.split('http')
    	  setInputBox('http'+cleanedString[1]);
	    }
  	  	else
  		    console.log('share type no good')
  	},[])

  	useEffect(()=>{
  		 ShareMenu.getInitialShare(shareTextHandler)
  	},[])
  	useEffect(()=>{
  		const shareListener = ShareMenu.addNewShareListener(shareTextHandler)
  		return ()=>{
  			shareListener.remove()
  		}
  	},[])

  	useEffect(()=>{
		InteractionManager.runAfterInteractions(()=>{
			setIsLoaded(true)
		})	
	})
	
	const resetInputBox=()=>{
		setInputBox(null)
	}
	const inputHandler=t=>{
		setInputBox(t)
	}

//when clicking on readRecipe, close the keyboard, check if there is something inside the input box, if so run the fetch. If detect is a list
//ingredients, create the array with unique key, set the copied recipe and show the modal to make new recipe
	const confirmInput=()=>{

		if(inputBox === undefined || inputBox === null ||inputBox.length <= 0)
			return ;
		setSearching(true)
		setCopiedRecipe([])
		Keyboard.dismiss();
		fetchIngredient(inputBox)
	}

	if(!isLoaded)
		return <MySplashScreen />
	else{
	return (
		<View style={styles.mainView}>
		{tutorial && <TutorialWelcome showModal={()=>setNewRecipe(true)} />}
			<Modal animationType='slide' transparent={true} visible={newRecipe}>
				<MakeNewRecipe hide={()=>setNewRecipe(false)} navigation={navigation} recipe={copiedRecipe} tutorial={tutorial}/>		
			</Modal>
			<View style={styles.contentView}>
				<View style={styles.inputStyle}>
					<TextInput style={[styles.textInput,styles.color]}
						placeholder='Qui va il link ricetta o lista ingredienti'
						placeholderTextColor='black'
						value={inputBox}
						onChangeText = {inputHandler}
					  	onSubmitEditing={confirmInput}/>
					<Icon style={[styles.icon,styles.color]} name='close' onPress={resetInputBox}/>
				</View>	
				<TouchableOpacity style={styles.btn} onPress={()=>confirmInput()} >
					<MyText myStyle={styles.btnText}>LEGGI RICETTA</MyText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={()=>{setNewRecipe(true);setCopiedRecipe([])}}>
					<MyText myStyle={styles.btnText}>CREA LA TUA RICETTA</MyText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('test')}>
					<MyText myStyle={styles.btnText}>TEST</MyText>
				</TouchableOpacity>
			</View>
		</View>
		);}
}	
const mapStateToProps=state=>({
	tutorial:state.settings.tutorial,
	result:state.result,
})

export default connect(mapStateToProps,{searchLinkAction,saveSearchedLinkAction,fetchIngredient})(SearchScreen)

const styles=StyleSheet.create({
	mainView:{
		flex:1,
		justifyContent:'center',
		backgroundColor:'#feebc4',  //BACKGROUND
	},
	contentView:{
		marginRight:'2.5%',
		marginLeft:'2.5%',
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		zIndex:1,
		marginTop:'-10%',
	},
	textInput:{
		flex:1,
		fontSize:16,
	},
	icon:{
		padding:10,
		alignSelf:'center',
		fontSize:25,
	},
	btn:{
		maxWidth:600,
		width:'100%',
		backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		padding:5,
		elevation:5,
		margin:5,
	},
	btnText:{
		textAlign:'center',
		color:'#e8871e',			//BUTTON TEXT
	},
	color:{
		color:'black'
	},
	inputStyle:{
		width:'100%',
		flexDirection:'row',
		borderWidth:1,
		borderRadius:20,
		borderColor:'#e8871e',			//BUTTON TEXT
		marginBottom:10,
	}
})
