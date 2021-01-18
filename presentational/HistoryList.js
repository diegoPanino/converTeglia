import React from 'react';
import {View,SectionList,StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {Tooltip} from 'react-native-elements';
import moment from 'moment';
import MyText from './MyText';
import HistoryRow from './HistoryRow';

const styles = StyleSheet.create({
	sectionHeader:{
		textAlign:'center',
		backgroundColor:'#FFDCBA',					//PRIMARY
		borderColor:'#e8871e',   					//BUTTON BORDER
		borderTopWidth:2,
		borderRightWidth:2,
		borderLeftWidth:2,
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		margin:5,
		fontSize:18,
		fontWeight:'bold',
	},
	sectionList:{
		marginRight:'2.5%',
		marginLeft:'2.5%',
		backgroundColor:'#fef1d8',
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		borderRadius:20,
		elevation:2,
	}
})

export default function HistoryList(props){
	const {list,navigation} = props
	const navigate = () =>{
		navigation.navigate('ResultScreen')
	}
	const historyByDate = list.reduce((obj,recipe)=>{
		const date = moment(recipe.date).format('DD MMM')
		return {
			...obj,
			[date]:[...(obj[date]|| []),recipe]
		}
	},{})
	const sections = Object.keys(historyByDate)
		.reverse()
		.map((date,i)=>{
			historyByDate[date].reverse()
			return{
				data:historyByDate[date],
				title:date,
				key:i
			}	
		})
	return (
		<SectionList style={styles.sectionList}
			sections = {sections}
			renderItem = { ( {item,index} ) =>{return <HistoryRow {...item} index={index} navigate={navigate} />} }
			renderSectionHeader = {({section})=><MyText myStyle={styles.sectionHeader} key={section.key}>{section.title}</MyText>}
		/>
		);
}