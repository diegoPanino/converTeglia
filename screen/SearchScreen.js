import React,{useEffect,useState,useCallback} from 'react';
import {View,StyleSheet, TextInput,Keyboard, Modal} from 'react-native';
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import {AdMobBanner,AdMobInterstitial,PublisherBanner} from 'react-native-admob'
import { Item , Input , Label , Icon , Button, Container, Footer, Content, Text	} from 'native-base';
import {connect} from 'react-redux';
import { v4 as idGen} from 'uuid';
import {searchLinkAction,cleanStoreAction,saveSearchedLinkAction} from '../redux/actions';
import {getIngredients} from '../api/fetch';
import MakeNewRecipe from '../presentational/NewRecipe';

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		marginTop:-50,
	}
})

function SearchScreen({navigation,searchLinkAction,cleanStoreAction,saveSearchedLinkAction}){
	const [inputBox, setInputBox] = useState('')
	const [newRecipe,setNewRecipe] = useState(false)
	const [copiedRecipe,setCopiedRecipe] = useState('')
	//const [enableConfirmForm,setEnableConfirmForm] = useState(false)

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
				if(!result.hasOwnProperty('err'))
					saveSearchedLinkAction(result)
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
					<Input 	placeholder='Qui va il link ricetta o lista ingredienti'
							value={inputBox}
							onChangeText = {inputHandler}
						  	onSubmitEditing={confirmInput}/>
					<Icon active name='close' onPress={resetInputBox}/>
				</Item>	
				<Button rounded block transparent large onPress={confirmInput} >
					<Text >Leggi ricetta</Text>
				</Button>
				<Button rounded block transparent large onPress={()=>{setNewRecipe(true);setCopiedRecipe([])}}>
					<Text >Crea la tua ricetta</Text>
				</Button>
			</Content>
			<Footer></Footer>
		</Container>
		);
}
export default connect(null,{searchLinkAction,cleanStoreAction,saveSearchedLinkAction})(SearchScreen)