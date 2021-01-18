import React,{useState,useEffect} from 'react';
import {Modal,View,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';
import {setNumDaysAction,showTutorialAction} from '../redux/actions';
import MyText from './MyText';

const styles = StyleSheet.create({
	modalStyle:{
		backgroundColor:'#feebc4',
		position:'absolute',
		bottom:0,
		height:'25%',
		width:'100%',
		borderTopLeftRadius:15,
		borderTopRightRadius:15,
		borderTopWidth:2,
		borderLeftWidth:1,
		borderRightWidth:1,
		borderColor:'#e8871e'
	},
	settingsBtnIcon:{
		position:'absolute',
		right:0,
		color:'#e8871e',
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
	pickerContainer:{
		width:'25%',
		marginLeft:'5%',
	},
	picker:{
		transform: [
      		{ scaleX: 1 }, 
      		{ scaleY: 1 },
  		],
	},
	settText:{
		flex:1,
		marginLeft:'2.5%',
		marginRight:'2.5%',
		fontSize:18,
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
	}
})
	

function AdvancedSettingsModal({hide,setNumDaysAction,showTutorialAction,settings}){
		
	const [showTutorial,setShowTutorial] = useState(settings.tutorial)
	const [numberOfDays,setNODays] = useState(settings.day)

	let nums=[];
	for(let i = 1;i<=90;i++){
		nums.push(i)
	}
	const PickerItems = nums.map(i=>{
		return <Picker.Item style={styles.pickerItem} label={`${i}`} value={i} key={i}/>
	})

	useEffect(()=>{
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
							<Picker style={styles.picker} mode='dropdown'
									selectedValue={numberOfDays}
									onValueChange={(value)=>setNODays(value)}>
								{PickerItems}
							</Picker>
						</View>
					</View>
					<View style={styles.settLine}>
						<MyText myStyle={styles.settText}>Mostra tutorial all'avvio </MyText>
						<View style={styles.pickerContainer}>
							<Picker style={styles.picker} mode='dropdown'
									selectedValue={showTutorial}
									onValueChange={(value)=>setShowTutorial(value)}>
								<Picker.Item label='NO' value={false} key='NO'/>
								<Picker.Item label='SI' value={true} key='SI'/>
							</Picker>
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