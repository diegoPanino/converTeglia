import React, {useEffect,useState} from 'react';
import {ScrollView,Text,StyleSheet,View} from 'react-native';


const styles = StyleSheet.create({
	viewList:{
		flex:1,
		flexDirection:'row',
		margin:10,
		padding:3,
		backgroundColor:'grey'
	},
	amount:{
		flex:1,
		alignItems:'center',
	},
	unit:{
		flex:1,
		alignItems:'flex-start',
	},
	name:{
		flex:3,
		alignItems:'flex-start'
	},
})

export default function ResultList(props){
	const {amounts,units,name} = props.list.ingredients
	
	const Row = props.list.ingredients.map((ingredient,i)=>{
				return(
					<View style={styles.viewList} key={i}>
						<View style={styles.amount}><Text>{ingredient.amounts}</Text></View>
						<View style={styles.unit}><Text>{ingredient.units}</Text></View>
						<View style={styles.name}><Text>{ingredient.names}</Text></View>
					</View>
					)
		})
	return (
		<ScrollView>
			{Row}
		</ScrollView>
	)
}