import React from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native';
import {connect} from 'react-redux';

const styles=StyleSheet.create({
	view:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
})

function HistoryScreen({history}){
	console.log('History: ',history)
	return <Text>HistoryScreen</Text>
	/*return (
		<ScrollView style={styles.view}>
			{history}
		</ScrollView>
		);*/
}
const mapStateToProps=(state)=>({
	history:state.history
})
export default connect(mapStateToProps)(HistoryScreen)