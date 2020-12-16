import React, {useEffect,useState} from 'react';
import {ScrollView,Text,StyleSheet,View,TextInput,TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

const styles = StyleSheet.create({
	viewList:{
		flex:1,
		flexDirection:'row',
		margin:5,
		padding:3,
	},
	amount:{
		flex:0.5,
		alignItems:'center',
	},
	unit:{
		flex:1,
		alignItems:'flex-start',
	},
	name:{
		flex:3,
		alignItems:'flex-start',
	},
	lock:{
		flex:0.5,
	},
	lockIco:{
		fontSize:20,
	}
})

export default function ResultList(props){
	const {k=1} = props
	const [ingredients,setIngredients] = useState(props.list.ingredients)

	const Row = ingredients.map((ingredient,i)=>{
				const amount = (ingredient.amounts * k).toFixed()
				return(
					<View style={styles.viewList} key={i}>
						<View style={styles.amount}>
							<TextInput>{amount}</TextInput>
						</View>
						<View style={styles.unit}>
							<Text>{ingredient.units}</Text>
						</View>
						<View style={styles.name}>
							<Text>{ingredient.names}</Text>
						</View>
						<TouchableOpacity style={[styles.lock]}>
							<Icon style={styles.lockIco} name='lock-open' />
						</TouchableOpacity>
					</View>
					)
		})
	return (
		<ScrollView>
			{Row}
		</ScrollView>
	)
}