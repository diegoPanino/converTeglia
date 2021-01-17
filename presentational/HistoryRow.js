import React,{useState,useRef} from 'react';
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
	const {title,url,navigate,date} = props
	const animationScale = useRef(new Animated.Value(1)).current
	const animationOpacity = useRef(new Animated.Value(1)).current
	const animationPosition = useRef(new Animated.ValueXY(0,0)).current
	let favIco = 'heart-outline'
	if(props.hasOwnProperty('favourite'))
		if(props.favourite)
			favIco = 'heart-sharp'

	function showRecipe(){
		props.searchLinkAction(props)
		navigate();
	}
	function removeHistoryElement(){
		Animated.parallel([
			Animated.timing(animationPosition,{
				toValue:{x:250,y:0},
				duration:500,
				useNativeDriver:false
			}),
			Animated.timing(animationScale,{
				toValue:4,
				duration:500,
				useNativeDriver:false
			}),
			Animated.timing(animationOpacity,{
				toValue:0,
				duration:500,
				useNativeDriver:false
			})]).start(()=>{
				props.deleteSearchedLinkAction(date);	
			})
			setShowDelModal(false);

	}
	function toggleFavourite(){
		props.bookmarkSearchAction(date)

	}
	function getAnimationStyle(){
		return {
			...animationPosition.getLayout(),
			scaleX:animationScale,
			scaleY:animationScale,
			opacity:animationOpacity}
	}
	return(
		<Animated.View style={getAnimationStyle()}>	
			<View style={styles.row}>
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