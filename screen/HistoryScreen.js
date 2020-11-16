import React from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import HistoryList from '../presentational/HistoryList';

const styles=StyleSheet.create({
	view:{
		flex:1,
		flexDirection:'column-reverse'
	}
})

function HistoryScreen({history,navigation}){
	return (
		<View>
			<HistoryList list = {history} navigation = {navigation}/>
		</View>
	)
}
const mapStateToProps=(state)=>({
	history:state.history
})
export default connect(mapStateToProps)(HistoryScreen)