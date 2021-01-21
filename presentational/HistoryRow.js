import React,{useState,useRef,useEffect} from 'react';
import {View,StyleSheet,TouchableOpacity,Text,useWindowDimensions,Animated} from 'react-native';
import {Tooltip} from 'react-native-elements';
import {Icon} from 'native-base';
import {searchLinkAction,deleteSearchedLinkAction,bookmarkSearchAction} from '../redux/actions';
import {connect} from 'react-redux';
import ModalMessage from './ModalMessage';
import MyText from './MyText';

const styles = StyleSheet.create({
	row:{
		flex:1,
		flexDirection:'row',
		margin:5,
		alignItems:'center',
		zIndex:1,
	},
	border:{
		borderBottomWidth:0.3,
		borderColor:'#feaa51'
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
		flex:1,
		marginLeft:-10,
		textAlign:'center',
	},
	text:{
		fontSize:18
	}
})

function HistoryRow(props){

	const [showDelModal,setShowDelModal] = useState(false);
	const {title,url,navigate,date,index} = props
	const scale = useRef(new Animated.Value(0)).current 
	let favIco = 'heart-outline'
	if(props.hasOwnProperty('favourite'))
		if(props.favourite)
			favIco = 'heart-sharp'

	useEffect(()=>{
		Animated.timing(scale,{
			toValue:1,
			duration:600,
			delay:index ? index*150 : 0,
			useNativeDriver:true
		}).start()
	},[title])

	function showRecipe(){
		props.searchLinkAction(props)
		navigate();
	}
	function removeHistoryElement(){
		Animated.timing(scale,{
			toValue:0,
			duration:600,
			useNativeDriver:true
		}).start(()=>{
			props.deleteSearchedLinkAction(date);	
		})
			setShowDelModal(false);
	}
	function toggleFavourite(){
		props.bookmarkSearchAction(date)

	}
	return(
		<Animated.View style={{scaleX:scale,scaleY:scale}}>	
			<View style={[styles.row,styles.border]}>
				<ModalMessage showModal={showDelModal}
							  message='Sei sicura di volerlo eliminare dalla cronologia?'
							  extraData={title}
							  confirm={removeHistoryElement}
							  close={()=>setShowDelModal(false)} />
				<TouchableOpacity style={styles.textRow} onPress={showRecipe}>
					<MyText myStyle = {styles.text}>{title}</MyText>
				</TouchableOpacity>
				<View style={[styles.row,styles.icons]}>
					<Tooltip width={useWindowDimensions().width}
							closeOnlyOnBackdropPress={true}
							containerStyle={styles.tooltip}
							skipAndroidStatusBar={true}
							popover= {<Text style={styles.text} selectable={true}>{url}</Text>} >
							<Icon style={styles.icon} name='md-planet-outline'/>
					</Tooltip>
					<Icon style={styles.icon} name='trash-outline' onPress={()=>setShowDelModal(true)}/>
					<Icon style={[styles.icon,styles.fav]} name={favIco} onPress={toggleFavourite}/>
				</View>
			</View>
		</Animated.View>
		);
}
const mapDispatchToProps={
	searchLinkAction,
	deleteSearchedLinkAction,
	bookmarkSearchAction
}	
export default connect(null,mapDispatchToProps)(HistoryRow)