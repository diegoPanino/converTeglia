import React from 'react';
import {FlatList,View,Text,StyleSheet} from 'react-native';
import StdTrayRow from './StdTrayRow';
import CustomTrayRow from './CustomTrayRow.js'
import {connect} from 'react-redux';
import {deleteTrayAction,setMyTrayAction} from '../redux/actions';

const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		marginRight:'5%',
		marginLeft:'5%',
	},
	row:{
		flexDirection:'row',
		backgroundColor:'white',
	},
	rowEl:{
		flex:1,
		textAlign:'center'
	},
	flatCSTListContainer:{
		maxHeight:'50%',
	},
	flatSTDListContainer:{
		maxHeight:'100%',
		flex:1,
	},
})

function CardTrayList({type,stdTrays,setMyTrayAction,deleteTrayAction}){
	const typeText = ['rect','circle','square']
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
											<Text style={styles.rowEl}>Teglie personali</Text>
										</View>
									)
								}
							}
							stickyHeaderIndices={[0]}
						/>
						: <Text style={{textAlign:'center'}}>Nessuna teglia personale salvata!</Text>
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
										<Text style={styles.rowEl}>Teglie standard</Text>								
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
	stdTrays : state.settings
})
export default connect(mapStateToProps,{deleteTrayAction,setMyTrayAction})(CardTrayList)