import React,{useEffect,useState,useCallback} from 'react';
import {View,StyleSheet, TextInput} from 'react-native';
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import { Item , Input , Label , Icon , Button, Container, Footer, Content, Text	} from 'native-base';
import {connect} from 'react-redux';
import {searchLinkAction} from '../redux/actions';

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		marginTop:-50,
	}
})

function SearchScreen({navigation,searchLinkAction}){
	const [inputBox, setInputBox] = useState('')

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
  		return ()=>shareListener.remove()
  	},[])

	const resetInputBox=()=>{
		setInputBox(null)
	}
	const inputHandler=t=>{
		//validation input
		setInputBox(t)
	}
	const confirmInput=()=>{
		searchLinkAction(inputBox)
		navigation.navigate('ResultScreen')
	}
	return (
		<Container>
			<Content contentContainerStyle={styles.view}>
				<Item rounded>
					<Input placeholder='Qui va link ricetta o lista ingredienti' value={inputBox} onChangeText = {inputHandler} />
					<Icon active name='md-close-outline' onPress={resetInputBox}/>
				</Item>	
				<Button rounded block transparent large onPress={confirmInput}>
					<Text >Leggi ricetta</Text>
				</Button>
			</Content>
			<Footer></Footer>
		</Container>
		);
}
export default connect(null,{searchLinkAction})(SearchScreen)