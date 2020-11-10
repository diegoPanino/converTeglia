import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ResultList from '../presentational/ResultList';

const styles=StyleSheet.create({
	view:{
		flex:1,
		backgroundColor:'pink'
	},
	center:{
		alignItems:'center'
	},
	title:{
		margin:30,
		fontSize:25,
	}
})

function ResultScreen({result}){
	if(result.recipe.err)
		return (<Text>{result.recipe.msg}</Text>)
	else{
		return (
		<View style={styles.view}>
			<View style={styles.center}>
				<Text style={styles.title}>{result.recipe.title}</Text>
			</View>
			<ResultList list={result.recipe}/>
		</View>
		);
	}
}
const mapStateToProps=(state)=>({
	result:state.result
})
export default connect(mapStateToProps)(ResultScreen);