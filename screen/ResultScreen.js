import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ResultList from '../presentational/ResultList';
import InfoTray from '../presentational/InfoTray';
import ModalInfoTray from '../presentational/ModalInfoTray';
import { BlurView } from "@react-native-community/blur";
import {toggleBlurAction,fastConvertionAction} from '../redux/actions';

const styles=StyleSheet.create({
	mainContainer:{
		flex:1,
		margin:'2.5%',
	},
	titleBox:{
		flex:1,
		alignItems:'center',
	},
	recipe:{
		flex:8,
	},
	title:{
		flex:1,
	},
	infoTray:{
		flex:1,
		paddingLeft:'2.5%',
		borderRadius:25,
		borderTopWidth:1,
		borderLeftWidth:1,
		borderBottomWidth:3,
		borderRightWidth:3,
	},
	blur:{
		zIndex:5,
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
	}
})

function ResultScreen({result,navigation,toggleBlurAction,fastConvertionAction,selectedTray}){
	const [showModal,setShowModal] = useState(true)
	
	useEffect(()=>{
		if(showModal){
			toggleBlurAction();
		}
	})

	const changeTray=()=>{
		toggleBlurAction();
		fastConvertionAction();
		setShowModal(false)
		navigation.navigate('MyTrayScreen')
	}
	const confirmTray=()=>{
		toggleBlurAction();
		setShowModal(false)
	}

	if(result.hasOwnProperty('recipe')){
		if(result.recipe.hasOwnProperty('err'))
			return (<Text>{result.recipe.msg}</Text>)
		else{
			return (
				<View style={styles.mainContainer}>
				{showModal && <BlurView
			 		    	  style={styles.blur}
			 		          blurType="dark"
			 		          blurAmount={1}
			 		        />}
					<ModalInfoTray 	close={()=>changeTray()}
									confirm={()=>confirmTray()}
									showModal={showModal}
									selectedTray={selectedTray}/>
					<View style={styles.titleBox}>
						<Text style={styles.title}>{result.recipe.title}</Text>
					</View>
					<View style={styles.infoTray}>
						<InfoTray rad={result.recipe.trayRad} />
					</View>
					<View style={styles.recipe}>
						<ResultList list={result.recipe}/>
					</View>
				</View>
			);
		}	
	}
	else{
		return (<Text>C'è stato un problema nel leggere la ricetta</Text>)
	}	
}
	

const mapStateToProps=(state)=>({
	result:state.result,
	selectedTray:state.settings.selection
})
export default connect(mapStateToProps,{toggleBlurAction,fastConvertionAction})(ResultScreen);