import React,{useState,useEffect} from 'react';
import {Modal,View,Text,StyleSheet} from 'react-native';
import {Icon,Button} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';
import {setNumDaysAction,showTutorialAction} from '../redux/actions';
const styles = StyleSheet.create({
	modalStyle:{
		backgroundColor:'gray',
		position:'absolute',
		bottom:0,
		height:'25%',
		width:'100%',
		borderRadius:15,
	},
	settingsBtnIcon:{
		position:'absolute',
		right:0,
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
	},
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
				<Button rounded block light small onPress={()=>saveAndexit()}>
					<Text>Impostazioni avanzate</Text>
					<Icon style={styles.settingsBtnIcon} name='add-outline' />
				</Button>
				<View style={styles.settings}>
					<View style={styles.settLine}>
						<Text style={styles.settText}>Per quanti giorni salvo le tue ricette ricercate?</Text>
						<View style={styles.pickerContainer}>
							<Picker style={styles.picker} mode='dropdown'
									selectedValue={numberOfDays}
									onValueChange={(value)=>setNODays(value)}>
								{PickerItems}
							</Picker>
						</View>
					</View>
					<View style={styles.settLine}>
						<Text style={styles.settText}>Mostra tutorial all'avvio </Text>
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