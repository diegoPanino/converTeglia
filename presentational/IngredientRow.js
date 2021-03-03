import React,{useState,useEffect,useRef} from 'react';
import {TextInput,View,StyleSheet,TouchableOpacity,Animated} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MyText from './MyText';

export default function IngredientRow(props){
	const {amount,unit,name,index} = props
	const {convertByI} = props
	const {hideLocks,showLocks} = props
	const {showAllLocks} = props
	const [locked,setLocked] = useState(false)
	const [nameIco,setNameIco] = useState('lock-open')
	const [amountInput,setAmountInput] = useState(amount)
	const [tempInput, setTempInput] = useState()
	const [validInput,setValidInput] = useState(true)
	const textInputRef = useRef(null)
	const zoom = useRef(new Animated.Value(1)).current
	const scale = useRef(new Animated.Value(0)).current

	const zoomIn=()=>{		
		Animated.timing(zoom,{
			toValue:1,
			duration:150,
			useNativeDriver:true
		}).start()
	}
	useEffect(()=>{
		Animated.timing(scale,{
			toValue:1,
			duration:600,
			delay:index ? index * 200 : 0,
			useNativeDriver:true
		}).start()
	})
	useEffect(()=>{								//when the props amount change set the input box to the new value with animation
		Animated.sequence([
			Animated.timing(zoom,{
				toValue:0,
				duration:300,
				useNativeDriver:true
			}),
			Animated.timing(zoom,{
				toValue:1,
				duration:300,
				useNativeDriver:true
			})
		]).start()
		if(amount > 0)
			setAmountInput(amount)	
		else
			setAmountInput()	
	},[amount])

	useEffect(()=>{								//show the correct lock icons depending if it select or not
		if(locked){
			setNameIco('lock-closed')
			hideLocks()
		}
		else{
			setNameIco('lock-open')
			showLocks()
		}
	},[locked])

	const onLockIngr=()=>{
			setLocked(!locked)						//when lock is press to block the value of ingredient
			textInputRef.current.focus()			//switch the locked state and focus on the text input
	}
	const onChangeTextHandler=t=>{
		validateInput(t)
	}
	const onSubmitEditingHandler=()=>{				//if the value of the ingredient locked is changed and valid
		const I = amountInput/amount 				//calculate the value of i factor and call the convertion and animation
		if(validInput){ 							//otherwise keep the value as before
			convertByI(I)
			zoomIn();
		}
		else
			setAmountInput(amount)
	}
	const validateInput=(t)=>{ 						//check for valid input, has to be only numbers
		const onlyNums = t.search(/\D/g) 			//has to be > 0 and cannot be empty
		if(onlyNums === -1)
			setAmountInput(t)
		if(t > 0 && t.length > 0){
			setValidInput(true)
		}
		else{
			setValidInput(false)
		}
	}
	const onEndEditingHandler=()=>{
		setAmountInput(amount)
	}
	return (
		<Animated.View style={[ {transform: [{scale}] } ]}>
			<View style={styles.viewList} >
				<View style={styles.amount}>
					<Animated.View style={[ {transform: [{ scale: zoom }] } ]}>
					<TextInput  style={styles.amountInput}
								keyboardType='numeric'
								returnKeyType='go'
								onChangeText={t=>onChangeTextHandler(t)}
								onSubmitEditing={()=>onSubmitEditingHandler()}
								onEndEditing = {()=>onEndEditingHandler()}
								editable={locked} 
								value={amountInput}
								placeholderTextColor='black'
								ref={textInputRef} />
					</Animated.View>
				</View>
				<View style={styles.unit}>
					<MyText myStyle={styles.h3Text}>{unit}</MyText>
				</View>
				<View style={styles.name}>
					<MyText myStyle={styles.h3Text}>{name}</MyText>
				</View>
				<View style={styles.lock}>
				{((showAllLocks || locked) && amountInput)    //show the lock only if the value is not 0 or empty and if there anything else locked
					?<TouchableOpacity  onPress={()=>onLockIngr()}>
						<Icon style={styles.lockIco} name={nameIco} />
					</TouchableOpacity>
					: null
				}
				</View>
			</View>
		</Animated.View>
		);
}
const styles = StyleSheet.create({
	viewList:{
		flex:1,
		flexDirection:'row',
		padding:3,
		borderBottomWidth:0.5,
		borderColor:'#feaa52'
	},
	amount:{
		flex:1,
		alignItems:'flex-start',
		justifyContent:'center',
	},
	amountInput:{
		color:'black',
		fontSize:20,
	},
	unit:{
		flex:0.5,
		alignItems:'flex-start',
		justifyContent:'center',
	},
	name:{
		flex:3,
		alignItems:'flex-start',
		justifyContent:'center',
	},
	lock:{
		flex:0.5,
		justifyContent:'center',
	},
	lockIco:{
		fontSize:18,
	},
	h3Text:{
		fontSize:20
	},
})