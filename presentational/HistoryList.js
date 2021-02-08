import React,{useState,useEffect} from 'react';
import {View,SectionList,StyleSheet} from 'react-native';
import moment from 'moment';
import MyText from './MyText';
import HistoryRow from './HistoryRow';
import {AdMobRewarded} from 'react-native-admob';
import {connect} from 'react-redux';
import {increaseLimitFavRecipeAction} from '../redux/actions.js';
import ModalMessageAd from './ModalMessageAd.js';

const locale = moment.updateLocale('it',{
	monthsShort:'Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dec'.split('_')    //translate the months of moment
})

function HistoryList(props){
	const {list,navigation,increaseLimitFavRecipeAction} = props
	const [adRewardError,setAdRewardError] = useState(false)
	const [adRewardLoaded,setAdRewardLoaded] = useState(false)
	const [adRewardAttempt,setAdRewardAttempt] = useState(0)
	const [showAdModal,setShowAdModal] = useState(false)

	useEffect(()=>{
    AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
	AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')//<-TEST | MINE->'ca-app-pub-7517699325717425/8556915163');
	
   	AdMobRewarded.isReady(ready=>{
		setAdRewardLoaded(ready)
	})
	AdMobRewarded.addEventListener('adLoaded',()=>{
		setAdRewardError(false)
		setAdRewardLoaded(true)
	})
	AdMobRewarded.addEventListener('adFailedToLoad',err=>{
		setAdRewardAttempt(prevAttempt => prevAttempt + 1)
	})
	AdMobRewarded.addEventListener('rewarded',reward =>{
		increaseLimitFavRecipeAction()
	})
	AdMobRewarded.addEventListener('adClosed',()=>{
		setAdRewardLoaded(false)
		AdMobRewarded.requestAd().catch(err=>{})
	})
	return ()=>AdMobRewarded.removeAllListeners()							//useEffect managin rewarded ad after 3 tray creation
	},[])
	useEffect(()=>{
		if(adRewardAttempt <= 5 && setAdRewardAttempt !== 0){
			setTimeout(()=>{
				AdMobRewarded.requestAd().catch(err=>{}) 
			},5000)
		}
		else if(adRewardAttempt === 6 ){
			setAdRewardError(true)
		}
	},[adRewardAttempt])

	const showAd=()=>{
		 AdMobRewarded.showAd().catch(error => {});
	}
	const navigate = () =>{
		navigation.navigate('ResultScreen')
	}
	const onShowAdModal = (flag) =>{
		setShowAdModal(flag)
	}
	const onConfirmAdShow=()=>{
		setShowAdModal(false)
		showAd()
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
		<View>
			<SectionList style={styles.sectionList}
				sections = {sections}
				renderItem = { ( {item,index} ) =>{return <HistoryRow {...item} index={index} navigate={navigate}
																adCounter={props.adCounter} adShow={showAd} adLimit={props.adLimit}
																showAdModal={flag=>onShowAdModal(flag)}/>} }
				renderSectionHeader = {({section})=><MyText myStyle={styles.sectionHeader} key={section.key}>{section.title}</MyText>}
			/>
			{showAdModal && <ModalMessageAd showModal={showAdModal}
							message={'Sembra che tu abbia giá raggiunto il limite di ricette favorite! Guarda un video per aggiungerne un\'altra!'}
							confirm={onConfirmAdShow}
							close={()=>setShowAdModal(false)}
							ready={adRewardLoaded}
							error={adRewardError}
				/>}
		</View>
		);
}
export default connect(null,{increaseLimitFavRecipeAction})(HistoryList)

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