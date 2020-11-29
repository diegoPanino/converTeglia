import React from 'react';
import {FlatList,View,Text,StyleSheet} from 'react-native';
import StdTrayRow from './StdTrayRow';
import CustomTrayRow from './CustomTrayRow.js'
import {connect} from 'react-redux';
import {deleteTrayAction,setMyTrayAction} from '../redux/actions';

const styles = StyleSheet.create({
	row:{
		flexDirection:'row',
		backgroundColor:'white',
	},
	rowEl:{
		flex:1,
		textAlign:'center'
	},
})

function CardTrayList({type,stdTrays,setMyTrayAction,deleteTrayAction}){
	const typeText = ['rect','circle','square']
	return (
		<View>
			<View>
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
									<View>
										<View style={styles.row}>
											<Text style={styles.rowEl}>Teglie personali</Text>
										</View>
										<View style={styles.row}>
											<Text style={styles.rowEl}>Nome</Text>
											<Text style={styles.rowEl}>Dimensioni</Text>
											<Text style={styles.rowEl}>Persone</Text>
											<Text style={styles.rowEl}>Scelta</Text>								
										</View>
									</View>
									)
								}
							}
						/>
						: <Text style={{textAlign:'center'}}>Nessuna teglia personale salvata!</Text>
				}
				</View>
				<View>
					<FlatList
						data={stdTrays.trays[typeText[type]]}
						renderItem={({item})=>{
							return <StdTrayRow tray={item} onSelect={(key)=>setMyTrayAction(key)} />}}
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