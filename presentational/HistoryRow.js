import React,{useState} from 'react';
import {View,StyleSheet,TouchableOpacity,Text,useWindowDimensions} from 'react-native';
import {Tooltip} from 'react-native-elements';
import {Icon} from 'native-base';
import {searchLinkAction,deleteSearchedLinkAction,bookmarkSearchAction} from '../redux/actions';
import {connect} from 'react-redux';
import ModalMessage from './ModalMessage';

const styles = StyleSheet.create({
	row:{
		flex:1,
		flexDirection:'row',
		margin:5,
		alignItems:'center'
	},
	textRow:{
		flex:3,
	},
	icons:{
		flex:1,
		justifyContent:'flex-end',
	},
	icon:{
		fontSize:25,
		marginLeft:3,
		marginRight:3,
	},
	fav:{
		color:'red'
	},
	tooltip:{
		marginLeft:10
	},
	text:{
		//width:250
	}
})

function HistoryRow(props){

	const [showDelModal,setShowDelModal] = useState(false);
	const {title,url,navigate,date} = props
	let favIco = 'heart-outline'
	if(props.hasOwnProperty('favourite'))
		if(props.favourite)
			favIco = 'heart-sharp'

	function showRecipe(){
		props.searchLinkAction(props)
		navigate();
	}
	function removeHistoryElement(){
		setShowDelModal(false);
		props.deleteSearchedLinkAction(date)
	}
	function toggleFavourite(){
		props.bookmarkSearchAction(date)

	}
	return(
		<View style={styles.row}>
			<ModalMessage showModal={showDelModal}
						  message='Sei sicura di volerlo eliminare dalla cronologia?'
						  extraData={title}
						  confirm={removeHistoryElement}
						  close={()=>setShowDelModal(false)} />
			<TouchableOpacity style={styles.textRow} onPress={showRecipe}>
				<Text style = {styles.text}>{title}</Text>
			</TouchableOpacity>
			<View style={[styles.row,styles.icons]}>
				<Tooltip width={useWindowDimensions().width}
						closeOnlyOnBackdropPress={true}
						containerStyle={styles.tooltip}
						skipAndroidStatusBar={true}
						popover= {<Text selectable={true}>{url}</Text>} >
						<Icon style={styles.icon} name='md-planet-outline'/>
				</Tooltip>
				<Icon style={styles.icon} name='trash-outline' onPress={()=>setShowDelModal(true)}/>
				<Icon style={[styles.icon,styles.fav]} name={favIco} onPress={toggleFavourite}/>
			</View>
		</View>
		);
}
const mapDispatchToProps={
	searchLinkAction,
	deleteSearchedLinkAction,
	bookmarkSearchAction
}	
export default connect(null,mapDispatchToProps)(HistoryRow)