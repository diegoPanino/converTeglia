import React from 'react';
import {FlatList,View,Text} from 'react-native';
import {stdTrays} from '../api/standardTrays';
import StdTrayRow from './StdTrayRow';
import Fade from 'react-native-fade'

export default function CardTrayList({type}){
	const typeText = ['rect','circle','square']
	return (
			<View>

				<FlatList
					data={stdTrays[typeText[type]]}
					renderItem={({item})=>{return <StdTrayRow dim={item.dim} servs={item.servs} />}}
				/>
			</View>
		);
}