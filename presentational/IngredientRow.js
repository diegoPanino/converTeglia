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
			useNativeDriver:false
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
	useEffect(()=>{
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

	useEffect(()=>{
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
			setLocked(!locked)
			textInputRef.current.focus()
	}
	const onChangeTextHandler=t=>{
		validateInput(t)
	}
	const onSubmitEditingHandler=()=>{
		const I = amountInput/amount
		if(validInput){
			convertByI(I)
			zoomIn();
		}
		else
			setAmountInput(amount)
	}
	const validateInput=(t)=>{
		const onlyNums = t.search(/\D/g)
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
				{((showAllLocks || locked) && amountInput) 
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
		//margin:5,
		padding:3,
		borderBottomWidth:0.5,
		borderColor:'#feaa52'
		//backgroundColor:'orange',
		// borderRadius:40,
		// marginTop:5,
		// marginBottom:5
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
	h3Text:{
		fontSize:20
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
	}
})