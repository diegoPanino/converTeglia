import React,{useEffect} from 'react';
import {FlatList,View,StyleSheet} from 'react-native';
import StdTrayRow from './StdTrayRow';
import CustomTrayRow from './CustomTrayRow.js'
import {connect} from 'react-redux';
import {deleteTrayAction,setMyTrayAction,resetChangedTrayAction} from '../redux/actions';
import MyText from './MyText';
import {AdMobInterstitial} from 'react-native-admob';

function CardTrayList({type,stdTrays,setMyTrayAction,deleteTrayAction,resetChangedTrayAction,ad}){
	const typeText = ['rect','circle','square']
	const {changedTray} = ad

	useEffect(()=>{
		AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId])
		AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')//<--TEST | MINE -->'ca-app-pub-7517699325717425/5502047427')
		
		AdMobInterstitial.addEventListener('adClosed',()=>{
			AdMobInterstitial.requestAd().catch(err=>{})
		})
		AdMobInterstitial.isReady(ready=>{
			if(!ready)
				AdMobInterstitial.requestAd().catch(err=>{})	
		})	
		return ()=>AdMobInterstitial.removeAllListeners()
	},[])
	useEffect(()=>{
		if((changedTray % 5 === 0) && (changedTray !== 0) ){
			AdMobInterstitial.showAd().catch(err=>{})
			resetChangedTrayAction();
		}
	},[changedTray])

	//render a simple text if no custom trays, or the list, and in the second flatlist render the standard tray. Custom tray will push down till 50% height
	//the standard tray, its view will as small as 50%
	return (
		<View style={styles.mainContainer}>
			<View style={styles.flatCSTListContainer}>
				{stdTrays.customTrays[typeText[type]].length > 0 ? 
						<FlatList 
							data={stdTrays.customTrays[typeText[type]]}
							renderItem = {({item})=>{
								return(
									<CustomTrayRow tray={item}
									 	onErase={(key)=>deleteTrayAction(key)}
									 	onSelect={(key)=>setMyTrayAction(key)} />)
								}
							}
							ListHeaderComponent={()=>{
								return(
										<View style={styles.row}>
											<MyText myStyle={styles.rowEl}>Teglie personali</MyText>
										</View>
									)
								}
							}
							stickyHeaderIndices={[0]}
						/>
						: <MyText myStyle={styles.h4Center}>Nessuna teglia personale salvata!</MyText>
				}
				</View>
				<View style={styles.flatSTDListContainer}>
					<FlatList
						data={stdTrays.trays[typeText[type]]}
						renderItem={({item})=>{
							return (
								<StdTrayRow tray={item}
									onSelect={(key)=>setMyTrayAction(key)} />)}}
						ListHeaderComponent={()=>{
							return(
								<View>
									<View style={styles.row}>
										<MyText myStyle={styles.rowEl}>Teglie standard</MyText>								
									</View>
								</View>
								)
						}}
						stickyHeaderIndices={[0]}
					/>
				</View>
			</View>
		);
}
mapStateToProps= state =>({
	stdTrays : state.settings,
	ad: state.ad
})
export default connect(mapStateToProps,{deleteTrayAction,setMyTrayAction,resetChangedTrayAction})(CardTrayList)

const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		marginRight:'5%',
		marginLeft:'5%',
		borderRadius:20,
		backgroundColor:'#fef1d8'
	},
	flatCSTListContainer:{
		maxHeight:'50%',
	},
	row:{
		height:35,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#FFDCBA',//primary
		borderColor:'#e8871e',
		borderTopWidth:2,
		borderRightWidth:2,
		borderLeftWidth:2,
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		elevation:2,
		zIndex:5,
	},
	rowEl:{
		flex:1,
		textAlign:'center',
		fontSize:18,
		fontWeight:'bold',
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
	},
	
	flatSTDListContainer:{
		maxHeight:'100%',
		flex:1,
	},
	h4Center:{
		textAlign:'center',
		fontSize:18
	}
})