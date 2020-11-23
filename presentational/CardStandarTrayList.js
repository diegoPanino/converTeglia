import React from 'react';
import {FlatList,View,Text,StyleSheet} from 'react-native';
import StdTrayRow from './StdTrayRow';
import {connect} from 'react-redux';

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

function CardTrayList({type,stdTrays}){
	const typeText = ['rect','circle','square']
	return (
			<View>
				<FlatList
					data={stdTrays.trays[typeText[type]]}
					renderItem={({item})=>{
						return <StdTrayRow dim={item.dim} servs={item.servs} 
										   selected={item.selected} trayKey={item.key} />}}
					ListHeaderComponent={()=>{
						return(
							<View>
								<View style={styles.row}>
									<Text style={styles.rowEl}>Teglie standard</Text>								
								</View>
								<View style={styles.row}>
									<Text style={styles.rowEl}>Dimensioni</Text>
									<Text style={styles.rowEl}>Persone</Text>
									<Text style={styles.rowEl}>Scelta</Text>								
								</View>
							</View>
							)
					}}
					stickyHeaderIndices={[0]}
				/>
			</View>
		);
}
mapStateToProps= state =>({
	stdTrays : state.settings
})
export default connect(mapStateToProps)(CardTrayList)