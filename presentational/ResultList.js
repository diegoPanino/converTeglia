import React, {useEffect,useState,useRef} from 'react';
import {ScrollView,Text,StyleSheet,View,TextInput,TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {convertByKAction,convertByIAction} from '../redux/actions';
import {connect} from 'react-redux';
import IngredientRow from './IngredientRow';

const styles = StyleSheet.create({
	viewList:{
		flex:1,
		flexDirection:'row',
		margin:5,
		padding:3,
	},
	amount:{
		flex:1,
	},
	amountInput:{
		color:'black',	
	},
	unit:{
		flex:0.5,
		alignItems:'flex-start',
		justifyContent:'center',
	},
	name:{
		flex:3,
		alignItems:'flex-start',
		justifyContent:'center',
	},
	lock:{
		flex:0.5,
		justifyContent:'center',
	},
	lockIco:{
		fontSize:20,
	}
})

function ResultList(props){
	const {convertByKAction,convertByIAction} = props
	const {ingredients} = props.list.recipe
	const {convertedRecipe} = props.list
	const {k} = props
	const [showAllLocks,setShowAllLocks] = useState(true)

	useEffect(()=>{
		convertByKAction(k)
	},[k])

	const onConvertByIHandler=(i)=>{
		convertByIAction(i)
	}
	return (
		<ScrollView>
		{
			ingredients.map((ingredient,index)=>{
				return <IngredientRow key={index} 
							hideLocks = {()=>setShowAllLocks(false)}
							showLocks = {()=>setShowAllLocks(true)}
							showAllLocks = {showAllLocks}
							amount={convertedRecipe[index]}
							unit={ingredient.units}
							name={ingredient.names}
							convertByI = {(i)=>onConvertByIHandler(i)} 
							
							/>
			})
		}
		<Text style={{textAlign:'center'}}>Ho moltiplicato ogni ingredienti per {k.toFixed(2)}</Text>
		</ScrollView>
	)
}
export default connect(null,{convertByKAction,convertByIAction})(ResultList)