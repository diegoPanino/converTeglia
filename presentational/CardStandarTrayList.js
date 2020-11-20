import React from 'react';
import {FlatList,View,Text,StyleSheet} from 'react-native';
import {stdTrays} from '../api/standardTrays';
import StdTrayRow from './StdTrayRow';

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

export default function CardTrayList({type}){
	const typeText = ['rect','circle','square']
	return (
			<View>
				<FlatList
					data={stdTrays[typeText[type]]}
					renderItem={({item})=>{return <StdTrayRow dim={item.dim} servs={item.servs} selected={item?.selected} />}}
					ListHeaderComponent={()=>{
						return(
							<View style={styles.row}>
								<Text style={styles.rowEl}>Dimensioni</Text>
								<Text style={styles.rowEl}>Persone</Text>
								<Text style={styles.rowEl}>Scelta</Text>								
							</View>
							)
					}}
					stickyHeaderIndices={[0]}
				/>
			</View>
		);
}