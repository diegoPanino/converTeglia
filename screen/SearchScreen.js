import React,{useEffect,useState,useCallback,useRef} from 'react';
import {View,StyleSheet, TextInput,Keyboard, Modal, TouchableOpacity, Animated, InteractionManager} from 'react-native';
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import { v4 as idGen} from 'uuid';
import MyText from '../presentational/MyText';
import {searchLinkAction,cleanStoreAction,saveSearchedLinkAction} from '../redux/actions';
import {getIngredients} from '../api/fetch';
import MakeNewRecipe from '../presentational/NewRecipe';
import TutorialWelcome from '../presentational/tutorial/TutorialWelcome.js';
import MySplashScreen from './SplashScreen.js';

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
		marginTop:-50,
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

function SearchScreen({navigation,searchLinkAction,cleanStoreAction,saveSearchedLinkAction,tutorial}){
	const [inputBox, setInputBox] = useState('')
	const [newRecipe,setNewRecipe] = useState(false)
	const [copiedRecipe,setCopiedRecipe] = useState('')
	const [isLoaded,setIsLoaded] = useState(false)
	const searchBtn = useRef(new Animated.Value(1)).current


	const shareTextHandler = useCallback((sharedItem)=>{
	if(!sharedItem) return

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

//qui verra chiamata la api e ricevera recipe, che verra salvata nello store (al posti di link e basta) per poi essere
//recuperata da resultScreen. Cosi da gestire anche loadgingPage
	const confirmInput=()=>{

		if(inputBox === undefined || inputBox === null ||inputBox.length <= 0)
			return ;
		setCopiedRecipe([])
		Keyboard.dismiss();
		getIngredients(inputBox)
			.then(result=>{
				if(!result.hasOwnProperty('err')){
					if(result.hasOwnProperty('personal')){
					const recipe = result.ingredients.map(ingr=>{
						return {amounts:ingr.amounts.toString(),
								units:ingr.units,
								names:ingr.names,
								id:idGen()
								}
					})
					setCopiedRecipe(recipe)
					setNewRecipe(true)
					return 
					}else
						saveSearchedLinkAction(result)
				}
				searchLinkAction(result);
				navigation.navigate('ResultScreen');
			})
			.catch(err=>console.log(err))
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
					<Icon style={[styles.icon,styles.color]} active name='close' onPress={resetInputBox}/>
				</View>	
				<TouchableOpacity style={styles.btn} onPress={()=>confirmInput()} >
					<MyText myStyle={styles.btnText}>LEGGI RICETTA</MyText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={()=>{setNewRecipe(true);setCopiedRecipe([])}}>
					<MyText myStyle={styles.btnText}>CREA LA TUA RICETTA</MyText>
				</TouchableOpacity>
			</View>
		</View>
		);}
}	
const mapStateToProps=state=>({
	tutorial:state.settings.tutorial
})

export default connect(mapStateToProps,{searchLinkAction,cleanStoreAction,saveSearchedLinkAction})(SearchScreen)


/*
	return (
		<Container>
		{tutorial && <TutorialWelcome showModal={()=>setNewRecipe(true)} />}
			<Modal animationType='slide' transparent={true} visible={newRecipe}>
				<MakeNewRecipe hide={()=>setNewRecipe(false)} navigation={navigation} recipe={copiedRecipe} tutorial={tutorial}/>		
			</Modal>
			<Content contentContainerStyle={styles.view}>
				<Item rounded style={styles.inputStyle}>
					<Input style={[styles.color]}
						placeholder='Qui va il link ricetta o lista ingredienti'
						placeholderTextColor='black'
						value={inputBox}
						onChangeText = {inputHandler}
					  	onSubmitEditing={confirmInput}/>
					<Icon style={styles.color} active name='close' onPress={resetInputBox}/>
				</Item>	
				<TouchableOpacity style={styles.btn} onPress={()=>confirmInput()} >
					<MyText myStyle={styles.btnText}>LEGGI RICETTA</MyText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={()=>{setNewRecipe(true);setCopiedRecipe([])}}>
					<MyText myStyle={styles.btnText}>CREA LA TUA RICETTA</MyText>
				</TouchableOpacity>
			</Content>
		</Container>
		);}
*/