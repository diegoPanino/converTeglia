import React,{useEffect,useState,useCallback} from 'react';
import {View,StyleSheet, TextInput,Keyboard, Modal} from 'react-native';
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import { Item , Input , Label , Icon , Button, Container, Footer, Content} from 'native-base';
import {connect} from 'react-redux';
import { v4 as idGen} from 'uuid';
import MyText from '../presentational/MyText';
import {searchLinkAction,cleanStoreAction,saveSearchedLinkAction} from '../redux/actions';
import {getIngredients} from '../api/fetch';
import MakeNewRecipe from '../presentational/NewRecipe';

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		marginTop:-50,
		backgroundColor:'#fffacd',
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
	},
	btnText:{
		fontWeight:'bold'
	},
	color:{
		color:'#780116'
	}
})

function SearchScreen({navigation,searchLinkAction,cleanStoreAction,saveSearchedLinkAction}){
	const [inputBox, setInputBox] = useState('')
	const [newRecipe,setNewRecipe] = useState(false)
	const [copiedRecipe,setCopiedRecipe] = useState('')

	const shareTextHandler = useCallback((sharedItem)=>{
	if(!sharedItem) return

    const {mimeType,data} = sharedItem;
	    if(mimeType === 'text/plain')
    	  setInputBox(data);
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

	return (
		<Container>
			<Modal animationType='slide' transparent={true} visible={newRecipe}>
				<MakeNewRecipe hide={()=>setNewRecipe(false)} navigation={navigation} recipe={copiedRecipe}/>		
			</Modal>
			<Content contentContainerStyle={styles.view}>
				<Item rounded>
					<Input style={styles.color}
						placeholder='Qui va il link ricetta o lista ingredienti'
						placeholderTextColor='#780116'
						value={inputBox}
						onChangeText = {inputHandler}
					  	onSubmitEditing={confirmInput}/>
					<Icon style={styles.color} active name='close' onPress={resetInputBox}/>
				</Item>	
				<Button style={styles.btn}  block  onPress={confirmInput} >
					<MyText myStyle={styles.btnText}>LEGGI RICETTA</MyText>
				</Button>
				<Button style={styles.btn}  block  onPress={()=>{setNewRecipe(true);setCopiedRecipe([])}}>
					<MyText myStyle={styles.btnText}>CREA LA TUA RICETTA</MyText>
				</Button>
			</Content>
		</Container>
		);
}
export default connect(null,{searchLinkAction,cleanStoreAction,saveSearchedLinkAction})(SearchScreen)