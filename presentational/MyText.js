import React from 'react';
import {Text,StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	text:{
		fontSize: 25,
		color: 'black', //text
	}
})

export default function MyText(props){
	const {children,myStyle={}} = props
	return ( <Text style={[styles.text,myStyle]}>{children}</Text> )
}