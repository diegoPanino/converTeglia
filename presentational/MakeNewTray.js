import React,{useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Icon,Button,Item,Input,Form,Label} from 'native-base';

const styles = StyleSheet.create({
	modalView:{
		position:'absolute',
		top:'20%',
		width:'100%',
		height:'80%',
		backgroundColor: 'white',
	},
	btnRow:{
		flexDirection:'row',
		justifyContent:'space-around'
	}
})

export default function NewTrayModal(props){
	const {hide} = props

	const onSave=()=>{
		console.log('save')
		hide();
	}
	const onCancel=()=>{
		console.log('cancel')
		hide();
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