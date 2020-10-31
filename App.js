import React, { useEffect , useState , useCallback} from 'react';
import { ImageBackground , StyleSheet , View , Text , TouchableOpacity , TextInput ,
        Dimensions } from 'react-native';
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import { Item , Input , Label , Icon , Button} from 'native-base';

const imageUri = require('./img/background.jpg')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  background:{
    flex:1,
    justifyContent:'center',
    width:windowWidth,
    height:windowHeight,
    alignItems:'center'
  },
  textInput:{
    borderWidth:1,
    borderRadius:30,
    borderColor: 'rgb(153, 255, 223)',
    backgroundColor:'rgb(230, 255, 247)',  
  },
  button:{
    borderWidth:1,
    borderRadius:30,
    backgroundColor:'rgb(0, 230, 157)',
    width:125,
    height:35,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5
  },
  text:{
    fontFamily:'sans-serif-light',
    color:'rgb(0, 51, 33)',
    fontSize:20,
  }
})

export default function App(){
  const [sharedText,setSharedText] = useState(null); //text obtained throw the system share with action
  const [inputBox,setInputBox] = useState(null); //main search box input
  const [ingredients,setIngredients] = useState([]); //list of ingredients fetched or pasted or shared

/*****************Shared data management***********************/

const shareHandler=useCallback((sharedItem)=>{
    if(!sharedItem) return

    const {mimeType,data} = sharedItem;
    if(mimeType === 'text/plain')
      setInputBox(data);
    else
      console.log('share type no good')
  },[])

  useEffect(()=>{
    ShareMenu.getInitialShare(shareHandler)
  },[])

  useEffect(()=>{
    const sharedListener = ShareMenu.addNewShareListener(shareHandler)
    return ()=>sharedListener.remove()
  },[])

/*****************************************************************/
  const textInputHandler=(text)=>{
    //check valid input instructions
    setInputBox(text);
  }
  const resetInputBox=()=>{
    const emptyString = '';
    setInputBox(emptyString)
  }

  return(
    <View style={styles.container}>
      <ImageBackground source={imageUri} style={styles.background}>
          <Item rounded>
            <Input  placeholder="Incolla qui il link ricetta o l'ingredienti"
                    onChange = {(t)=>textInputHandler(t)} value={inputBox} />
            <Icon active name='md-close-outline'
                  onPress={resetInputBox} />
          </Item>
          <Button transparent>
            <Text>Leggi ricetta</Text>
          </Button>
      </ImageBackground>
    </View>
    );
}
