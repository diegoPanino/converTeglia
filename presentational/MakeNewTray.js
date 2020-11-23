import React,{useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Icon,Button,Item,Input,Form,Label} from 'native-base';

const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		top:'25%',
		width:'100%',
		height:'50%',
		backgroundColor: 'rgba(144, 149, 153,0.5)',
	},
	btnRow:{
		flexDirection:'row',
		justifyContent:'space-around'
	}
})

export default function NewTrayModal(props){
	const {hide} = props

	const onSave=()=>{
		hide()
		console.log('save')
	}
	const onCancel=()=>{
		hide()
		console.log('cancel')
	}

	return (
		<View style={styles.modalView}>
			<Form>
				<Label>Forma:</Label>
				<Label>Misure:</Label>
				<View style={styles.btnRow}>
					<Button large transparent onPress={()=>onSave()}>
						<Text>SALVA TEGLIA</Text>
					</Button>
					<Button  large transparent onPress={()=>onCancel()}>
						<Text>TORNA INDIETRO</Text>
					</Button>
				</View>
			</Form>
		</View>
		
		);
}