import React,{useEffect,useState,useCallback} from 'react';
import {View,StyleSheet, TextInput,Keyboard} from 'react-native';
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import { Item , Input , Label , Icon , Button, Container, Footer, Content, Text	} from 'native-base';
import {connect} from 'react-redux';
import {searchLinkAction,cleanStoreAction,saveSearchedLinkAction} from '../redux/actions';
import {getIngredients} from '../api/fetch';

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
  			cleanStoreAction();
  		}
  	},[])

	const resetInputBox=()=>{
		setInputBox(null)
	}
	const inputHandler=t=>{
		//validation input
		//setEnableConfirmForm(true);
		setInputBox(t)
	}

//qui verra chiamata la api e ricevera recipe, che verra salvata nello store (al posti di link e basta) per poi essere
//recuperata da resultScreen. Cosi da gestire anche loadgingPage
	const confirmInput=()=>{	
	//validation input, un po qui un po in fetch.js
		cleanStoreAction();
		Keyboard.dismiss();
		getIngredients(inputBox)
			.then(result=>{
				cleanStoreAction();
				if(!result.hasOwnProperty('err'))
					saveSearchedLinkAction(result)

				searchLinkAction(result);
				navigation.navigate('ResultScreen');
			})
			.catch(err=>console.log(err))
	}
	return (
		<Container>
			<Content contentContainerStyle={styles.view}>
				<Item rounded>
					<Input placeholder='Qui va link ricetta o lista ingredienti' value={inputBox} onChangeText = {inputHandler}
						  onSubmitEditing={confirmInput}/>
					<Icon active name='close' onPress={resetInputBox}/>
				</Item>	
				<Button rounded block transparent large onPress={confirmInput} >
					<Text >Leggi ricetta</Text>
				</Button>
				<Button rounded block transparent large onPress={()=>{navigation.navigate('ResultScreen')}}>
					<Text >Result Screen</Text>
				</Button>
			</Content>
			<Footer></Footer>
		</Container>
		);
}
export default connect(null,{searchLinkAction,cleanStoreAction,saveSearchedLinkAction})(SearchScreen)