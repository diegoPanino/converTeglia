import React,{useState,useEffect,useRef} from 'react'
import {View,StyleSheet,TouchableOpacity,Animated,useWindowDimensions} from 'react-native';
import {connect} from 'react-redux';
import MyText from '../MyText.js';
import {showTutorialAction} from '../../redux/actions.js';
import TutorialBox from './TutorialBox.js';

function TutorialWelcome({showTutorialAction,showModal}){
	const {height,width} = useWindowDimensions();
	const [showSearchScreenTutorial,setShowSearchScreenTutorial] = useState(false)
	const scale = useRef(new Animated.Value(0)).current

	useEffect(()=>{
		Animated.timing(scale,{
			toValue:1,
			duration:600,
			useNativeDriver:true
		}).start()
	},[])

	const showingOff=setStateFlag=>{
		Animated.timing(scale,{
			toValue:0,
			duration:600,
			useNativeDriver:true
		}).start(()=>{
			setShowSearchScreenTutorial(setStateFlag)
			setStateFlag ? null : showTutorialAction(false)
		})
	}

	const onContinuePress=()=>{
		showingOff(true);
	}
	const onRefusePress=()=>{
		showingOff(false);
	}
	return (
		<View style={[styles.mainView,{height:height*0.82,width:width}]}>
		{showSearchScreenTutorial && <TutorialBox type='search' next={showModal} hide={()=>setShowSearchScreenTutorial(false)}/>}
		  <Animated.View style={{transform: [{ scale }]}} >
				<View style={styles.contentView}>
					<View style={styles.titleView}>
						<MyText myStyle={styles.h1Title}>Benvenuto in ConverTeglia!</MyText>
					</View>
					<View style={styles.textView}>
						<MyText myStyle={styles.h4Text}>Grazie per voler provare la mia app! Ti rubo solo due minuti con questo breve tutorial!</MyText>
					</View>
					<View style={styles.buttonView}>
						<TouchableOpacity style={[styles.buttonContainer,styles.leftBtn]} onPress={()=>onRefusePress()}>
							<MyText myStyle={styles.h2Button}>No, grazie</MyText>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.buttonContainer,styles.rightBtn]} onPress={()=>onContinuePress()}>
							<MyText myStyle={styles.h2Button}>COMINCIAMO</MyText>
						</TouchableOpacity>
					</View>
			 	</View>
		 	</Animated.View>			
		</View>
		
		);
}
export default connect(null,{showTutorialAction})(TutorialWelcome)


const styles = StyleSheet.create({
	mainView:{
		flex:1,
		justifyContent:'center',
		position:'absolute',
		left:0,
		top:0,
		zIndex:10,
		backgroundColor:'transparent',
	},
	contentView:{
		backgroundColor:'#fef1d8',
		borderWidth:1,
		borderRadius:20,
		borderColor:'#feaa52',
		padding:20,
		marginRight:'1%',
		marginLeft:'1%',
		marginTop:'-10%',
	},
	titleView:{
		borderBottomWidth:1,
		borderColor:'#feaa52',
	},
	h1Title:{

	},
	textView:{
		marginTop:10,
		marginBottom:10,
	},
	h4Text:{
		marginRight:5,
		marginLeft:5,
		textAlign:'center',
		fontSize:18,
	},
	buttonView:{
		flexDirection:'row',
		justifyContent:'space-around',
		marginTop:10,
	},
	buttonContainer:{
		backgroundColor:'#feea52', //BUTTON BACKGROUND
		borderWidth:2,
		borderColor:'#E8871E', 		//BUTTON BORDER
		borderRadius:20,
		padding:5,
		elevation:5,
	},
	leftBtn:{
		alignSelf:'flex-start'
	},
	rightBtn:{
		alignSelf:'flex-end'
	},
	h2Button:{
		fontSize:22,
		textAlign:'center',
		color:'#e8871e',
	},
})