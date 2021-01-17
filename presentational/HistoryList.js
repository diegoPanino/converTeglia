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
		margin:5,
		borderBottomWidth:1,
		borderBottomColor:'black',
		fontSize:18,
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
		<SectionList
			sections = {sections}
			renderItem = { ( {item} ) =>{return <HistoryRow {...item} navigate={navigate} />} }
			renderSectionHeader = {({section})=><MyText myStyle={styles.sectionHeader} key={section.key}>{section.title}</MyText>}
		/>
		);
}