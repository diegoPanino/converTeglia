import React,{useState,useEffect,useRef} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default function MyPicker(props){
	const {values,label=false,onValueChange,selectValue,children} = props
	const {icon=true,iconStyle={},textStyle={},pickeItemStyle={},xOffset=0,yOffset=0,menuStyle={},dropMenuHeight=300} = props
	const [dropMenu,setDropMenu] = useState(false)
	const [selectedItem,setSelectedItem] = useState(selectValue)
	const [x,setX] = useState()
	const [y,setY] = useState()
	const [height,setHeight] = useState()
	const pickerBar = useRef(null)
	let MyPickerItems;

	useEffect(()=>{
		onValueChange(selectedItem)
	},[selectedItem])

	if(label){
		MyPickerItems = values.map((el,i)=>{
			return (
				<TouchableOpacity style={[styles.pickerItem,pickeItemStyle]} key={i} onPress={()=>selectItem(el)}>
					<Text style={textStyle}>{label[i]}</Text>						
				</TouchableOpacity>
			)
		})
	}
	else{
		MyPickerItems = values.map((el,i)=>{
			return (
				<TouchableOpacity style={[styles.pickerItem,pickeItemStyle]} key={i} onPress={()=>selectItem(el)}>
					<Text style={textStyle}>{el}</Text>						
				</TouchableOpacity>
			)
		})
	}
	const selectItem=el=>{
		setSelectedItem(el)
		setDropMenu(false)
	}
	const toggleDropMenu=()=>{
		setDropMenu(prevState=>!prevState)
	}
	const measureEl=event=>{
		const layout = event.nativeEvent.layout
		setTimeout(()=>pickerBar.current.measure((fx,fy,width,height,px,py) => {
			setX(px)
			setY(py)
			setHeight(height)
		}),500)
	}

	return (
		<View>
			<TouchableOpacity onPress={toggleDropMenu} style={[styles.pickerBar]} ref={pickerBar} onLayout={event=>measureEl(event)}>
				<View style={styles.textContainer}><Text style={[styles.text,textStyle]}>{selectedItem}</Text></View>
				{icon && <View style={styles.icoContainer}><Icon name='caret-down' style={[styles.icon,iconStyle]}/></View>}
			</TouchableOpacity>
			<Modal animationType="slide" transparent={true} visible={dropMenu} >
				<TouchableOpacity style={styles.mainContentModal} onPress={toggleDropMenu} />
					<View style={[styles.dropMenuContainer,menuStyle,{height:dropMenuHeight,left:x-xOffset,top:y-(dropMenuHeight/2) }]} >
						<ScrollView>
							{MyPickerItems}
						</ScrollView>
					</View>
			</Modal>
		</View>
		)
}

const styles=StyleSheet.create({
	mainContentModal:{
		flex:1,
		left:0,
		top:0,
		bottom:0,
		right:0,
		zIndex:1,
		elevation:1,
	},
	pickerBar:{
		flexDirection:'row',
		padding:5,
	},
	textContainer:{
		justifyContent:'center',
	},
	icoContainer:{
		justifyContent:'center',
	},
	dropMenuContainer:{
		position:'absolute',
		backgroundColor:'white',
		marginLeft:'2.5%',
		marginRight:'2.5%',
		borderWidth:1,
		borderRadius:10,
		padding:5,
		zIndex:5,
		elevation:5
	},
	pickerItem:{
		borderBottomWidth:1,
		padding:5,
		justifyContent:'center',
		alignItems:'center',
	},
	text:{
		alignSelf:'flex-end',
	},
})



/*

import React,{useState,useEffect,useRef} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default function MyPicker(props){
	const {values,onValueChange,selectValue} = props
	const {icon=true,iconStyle={},textStyle={},pickeItemStyle={},offset=2,menuStyle={},dropMenuHeight=300} = props
	const [dropMenu,setDropMenu] = useState(false)
	const [selectedItem,setSelectedItem] = useState(selectValue)
	const [x,setX] = useState()
	const [y,setY] = useState()
	const [height,setHeight] = useState()
	const pickerBar = useRef(null)

	useEffect(()=>{
		onValueChange(selectedItem)
	},[selectedItem])

	useEffect(()=>{
		setTimeout(()=>pickerBar.current.measure((fx, fy, width, height, px, py) => {
			setX(px)
			setY(py)
			setHeight(height)
		}),0)
		
	},[])

	const MyPickerItems = values.map((el,i)=>{
		return (
			<TouchableOpacity style={[styles.pickerItem,pickeItemStyle]} key={i} onPress={()=>selectItem(el)}>
				<Text style={textStyle}>{el}</Text>						
			</TouchableOpacity>
		)
	})
	const selectItem=el=>{
		setSelectedItem(el)
		setDropMenu(false)
	}
	const toggleDropMenu=()=>{
		setDropMenu(prevState=>!prevState)
	}

	return (
		<View>
			<TouchableOpacity onPress={toggleDropMenu} style={[styles.pickerBar]} ref={pickerBar}>
				<Text style={[styles.text,textStyle]}>{selectedItem}</Text>
				{icon && <View style={styles.icoContainer}><Icon name='caret-down' style={[styles.icon,iconStyle]}/></View>}
			</TouchableOpacity>
			<Modal animationType="slide" transparent={true} visible={dropMenu} >
				<TouchableOpacity style={styles.mainContentModal} onPress={toggleDropMenu} />
					<View style={[styles.dropMenuContainer,menuStyle,{height:dropMenuHeight,left:x,top:y }]} >
						<ScrollView>
							{MyPickerItems}
						</ScrollView>
					</View>
			</Modal>
		</View>
		)
}

const styles=StyleSheet.create({
	mainContentModal:{
		position:'absolute',
		flex:1,
		left:0,
		top:0,
		height:'100%',
		width:'100%',
		zIndex:1,
		elevation:1,
	},
	pickerBar:{
		flexDirection:'row',
		alignItems:'baseline',
		justifyContent:'center',
		alignContent:'center',
		padding:5,
	},
	icoContainer:{
		alignSelf:'flex-end'	
	},
	dropMenuContainer:{
		position:'absolute',
		backgroundColor:'white',
		borderWidth:1,
		borderRadius:10,
		padding:5,
		zIndex:5,
		elevation:5
	},
	pickerItem:{
		borderBottomWidth:1,
		padding:5,
		justifyContent:'center',
		alignItems:'center',
	},
	text:{
		alignSelf:'flex-end',
	},
})


*/