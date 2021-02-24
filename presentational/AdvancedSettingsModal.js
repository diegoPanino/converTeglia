import React,{useState,useEffect} from 'react';
import {Modal,View,StyleSheet,TouchableOpacity,Switch} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import {setNumDaysAction,showTutorialAction} from '../redux/actions';
import MyText from './MyText';
import MyPicker from './MyPicker.js';

function AdvancedSettingsModal({hide,setNumDaysAction,showTutorialAction,settings,navigation}){
		
	const [showTutorial,setShowTutorial] = useState(settings.tutorial)
	const [numberOfDays,setNODays] = useState(settings.day)

	let nums=[];
	for(let i = 1;i<=90;i++){
		nums.push(i)
	}

	useEffect(()=>{
		if(showTutorial){
			navigation.navigate('SearchScreen')
			showTutorialAction(showTutorial)
			hide();
		}
		else
			showTutorialAction(showTutorial);
	},[showTutorial])
	useEffect(()=>{
		setNumDaysAction(numberOfDays);
	},[numberOfDays])


	const saveAndexit = () =>{
		hide();
	}

	return(
		<View style={styles.modalStyle}>
			<TouchableOpacity style={styles.btn} onPress={()=>saveAndexit()}>
				<MyText myStyle={styles.btnStyle}>Impostazioni avanzate</MyText>
				<Icon style={styles.settingsBtnIcon} name='chevron-down' />
			</TouchableOpacity>
			<View style={styles.settings}>
				<View style={styles.settLine}>
					<MyText myStyle={styles.settText}>Per quanti giorni salvo le ricette cercate?</MyText>
					<View style={styles.pickerContainer}>
						<MyPicker values={nums} onValueChange={(value)=>setNODays(value)} selectValue={numberOfDays}/>
					</View>
				</View>
				<View style={styles.settLine}>
					<MyText myStyle={styles.settText}>Guarda tutorial iniziale </MyText>
					<View style={styles.pickerContainer}>
						<Switch onValueChange={(value)=>setShowTutorial(value)} value={showTutorial}
						        trackColor={{ false: "#767577", true: "#feea52" }}
    							thumbColor={showTutorial ? "#E8871E" : "#f4f3f4"}/>
					</View>
				</View>
			</View>		
		</View>
		);
}
const mapStateToProps = state =>({
	settings:state.settings
})
export default connect(mapStateToProps,{setNumDaysAction,showTutorialAction})(AdvancedSettingsModal)

const styles = StyleSheet.create({
	modalStyle:{
		backgroundColor:'#feebc4',
		position:'absolute',
		bottom:0,
		height:'35%',
		width:'100%',
		borderTopLeftRadius:15,
		borderTopRightRadius:15,
		borderTopWidth:2,
		borderLeftWidth:1,
		borderRightWidth:1,
		borderColor:'#e8871e'
	},
	btn:{
		left:-1,
		marginRight:-3,
		backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderLeftWidth:2,
		borderRightWidth:3,
		borderBottomWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		elevation:5,
	},
	btnStyle:{
		textAlign:'center',
		fontSize:22,
		color:'#e8871e'
	},
	settingsBtnIcon:{
		position:'absolute',
		right:10,
		marginTop:2,
		color:'#e8871e',
		fontSize:25
	},
	settings:{
		paddingTop:30,
		padding:10,
	},
	settLine:{
		flexDirection:'row',
		justifyContent:'center',
		marginLeft:'2.5%',
		marginRight:'2.5%',
		alignItems:'center',
	},
	settText:{
		flex:1,
		marginLeft:'2.5%',
		marginRight:'2.5%',
		fontSize:18,
	},
	pickerContainer:{
		flex:0.5,
		alignItems:'center',
		width:'25%',
		marginLeft:'5%',
	},
})