import React, {useEffect,useState} from 'react';
import {ScrollView,StyleSheet} from 'react-native';
import {convertByKAction,convertByIAction} from '../redux/actions';
import {connect} from 'react-redux';
import MyText from './MyText';
import IngredientRow from './IngredientRow';

function ResultList(props){
	const {convertByKAction,convertByIAction} = props
	const {ingredients} = props.list.recipe
	const {convertedRecipe} = props.list
	const {k} = props
	const [showAllLocks,setShowAllLocks] = useState(true)

	useEffect(()=>{														//inside a scrollView render with map ingredientRow
		convertByKAction(k)												//when the k factor changed, run the convertion on redux
	},[k])

	const onConvertByIHandler=(i)=>{									//when the inputs end on the ingredientRow textInput of the ingredient vale
		convertByIAction(i)												//receive the i factor and run the convertion on redux
	}
	return (
		<ScrollView style={styles.scrollView}>
		{
			ingredients.map((ingredient,index)=>{
				return <IngredientRow key={index}
							index={index}
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
		<MyText myStyle={styles.h4Center}>Ho moltiplicato ogni ingrediente per {k.toFixed(2)}</MyText>
		</ScrollView>
	)
}
export default connect(null,{convertByKAction,convertByIAction})(ResultList)
const styles = StyleSheet.create({
	h4Center:{
		marginTop:30,
		textAlign:'center',
		fontSize:18
	},
	scrollView:{
		marginRight:'2.5%',
		marginLeft:'2.5%',
		backgroundColor:'#fef1d8',     //SURFACE
		borderRadius:20,
	}
})