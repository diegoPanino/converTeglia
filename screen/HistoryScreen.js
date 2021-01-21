import React from 'react';
import {View,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import HistoryList from '../presentational/HistoryList';
import MyText from '../presentational/MyText';
import TutorialBox from '../presentational/tutorial/TutorialBox.js';

const styles=StyleSheet.create({
	mainView:{
		flex:1,
		backgroundColor:'#feebc4',
		
	},
	errMsgContainer:{
		flex:1,
		justifyContent:'center',
		backgroundColor:'#fef1d8'
	},
	errMsg:{
		textAlign:'center',
		color:'black',
	}
})

function HistoryScreen({history,navigation,tutorial}){
	
	return (
		<View style={styles.mainView}>
		{(history.length > 0) 
			? <HistoryList list = {history} navigation = {navigation}/>
			: <View style={styles.errMsgContainer}><MyText myStyle={styles.errMsg}>Nessuna ricetta salvata!</MyText></View>
		}
		{tutorial && <TutorialBox navigation={navigation} type='history' next='MyTrayScreen'/>}
		</View>
	)
}
const mapStateToProps=(state)=>({
	history:state.history,
	tutorial:state.settings.tutorial
})
export default connect(mapStateToProps)(HistoryScreen)