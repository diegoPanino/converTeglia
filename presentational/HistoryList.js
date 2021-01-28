import React from 'react';
import {SectionList,StyleSheet} from 'react-native';
import moment from 'moment';
import MyText from './MyText';
import HistoryRow from './HistoryRow';

const locale = moment.updateLocale('it',{
	monthsShort:'Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dec'.split('_')    //translate the months of moment
})

export default function HistoryList(props){
	const {list,navigation} = props
	const navigate = () =>{
		navigation.navigate('ResultScreen')
	}
	const historyByDate = list.reduce((obj,recipe)=>{
		const date = moment(recipe.date).format('DD MMM YYYY')				
		return {										
			...obj,
			[date]:[...(obj[date]|| []),recipe]							//get all the date, select by the format, and reorganize the list with
		}
	},{})																//to have the section with the data
	const sections = Object.keys(historyByDate)
		.reverse()
		.map((date,i)=>{												//and be from the most recent to the oldest
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
		marginBottom:'0%',
		margin:'2.5%',
		backgroundColor:'#fef1d8',
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		borderRadius:20,
		elevation:2,
		zIndex:1,
	}
})