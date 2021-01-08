import React,{useState,useEffect} from 'react';
import {View,Text,TextInput,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import NewIngredientRow from './NewIngredientRow';
import {toggleBlurAction} from '../redux/actions';

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
		backgroundColor: 'white',
		padding:10,
		paddingBottom:15,
		borderRadius:25,
		borderRightWidth:4,
		borderBottomWidth:4,
	},
	titleContainer:{
		borderTopWidth:1,
		borderBottomWidth:1,
		marginBottom:15,
	},
	titleInput:{

	},
	ScrollView:{
		height:'45%',
		borderBottomWidth:1,
		marginBottom:15
	},
	ingredientRow:{
		
	},
	btnRow:{
		flexDirection:'row',
		justifyContent:'space-around',
	},
})

function MakeNewRecipe(props){
	const [title,setTitle] = useState()
	const [invalidForm,setInvalidForm] = useState(false)
	const [ingredientRow,setIngredientRow]=useState([{amount:0,unit:'',name:'',id:''}])
	const {hide} = props
	const {toggleBlurAction} = props

	useEffect(()=>{
		toggleBlurAction()
		return ()=>toggleBlurAction()
	},[])

	const addIngredient=ingredient=>{
		const {amount,unit,name} = ingredient
		const id = amount+unit+name
		const isDuplicate = ingredientRow.some((el)=>{
			const ingId = el.amount+el.unit+el.name
			 return ingId===id
		})
		if(!isDuplicate){
			const newIngredient = [...ingredientRow,ingredient]
			setIngredientRow(newIngredient)
			return true;
		}
		else
			return false;
	}	

	return(
		<View style={styles.mainView}>
			<View style={styles.contentView}>
				<View style={styles.titleContainer}>
					<TextInput style={styles.titleInput}
						placeholder='Dai un nome alla tua ricetta!'
						placeholderTextColor='black'
						textAlign='center'
						autoFocus={true}
						onChangeText={(text)=>setTitle(text)}
					/>
				</View>
				<ScrollView style={styles.ScrollView}>
					{ingredientRow.map((el,i)=>{
						return <NewIngredientRow key={i} id={ingredientRow.id} style={styles.ingredientRow}
									newIngredient={ingredient=>addIngredient(ingredient)}
									/>
						})
					}
				</ScrollView>
				<View style={styles.btnRow}>
					<TouchableOpacity large transparent onPress={()=>console.log('ingr: ',ingredientRow)} >
						<Text>CONVERTI</Text>
					</TouchableOpacity>
					<TouchableOpacity  large transparent onPress={()=>hide()}>
						<Text>INDIETRO</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
		);
}
export default connect(null,{toggleBlurAction})(MakeNewRecipe)