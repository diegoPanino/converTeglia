import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
})

function ResultScreen({link}){
	const currentLink = link[link.length-1].link
	return (
		<View style={styles.view}><Text>{currentLink}</Text></View>
		);
}
const mapStateToProps=(state)=>({
	link:state.searchEntries
})
export default connect(mapStateToProps)(ResultScreen);