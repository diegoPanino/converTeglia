import React,{useState,useEffect,useRef} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ResultList from '../presentational/ResultList';
import InfoTray from '../presentational/InfoTray';
import ModalInfoTray from '../presentational/ModalInfoTray';
import OriginalTrayInfoModal from '../presentational/OriginalTrayInfoModal';
import { BlurView } from "@react-native-community/blur";
import {toggleBlurAction,fastConvertionAction} from '../redux/actions';
import * as KitchenMath from '../api/kitchenMath';

const styles=StyleSheet.create({
	mainContainer:{
		flex:1,
		margin:'2.5%',
	},
	titleBox:{
		flex:1,
		alignItems:'center',
	},
	recipe:{
		flex:8,
	},
	title:{
		flex:1,
	},
	infoTray:{
		flex:1,
		paddingLeft:'2.5%',
		borderRadius:25,
		borderTopWidth:1,
		borderLeftWidth:1,
		borderBottomWidth:3,
		borderRightWidth:3,
	},
	blur:{
		zIndex:5,
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
	}
})

function ResultScreen(props){
	const {toggleBlurAction,fastConvertionAction} = props
	const {selectedTray,result} = props
	const {navigation} = props
	const {dim,key} = selectedTray
	const [showModal,setShowModal] = useState(false)
	const [modalOriginalTray, setModalOriginalTray] = useState(true)
	const [areaSource,setAreaSource] = useState()
	const [areaTarget,setAreaTarget] = useState()
	const [k,setK] = useState() //not in use
	const [convertedRecipe,setConverted] = useState()
	const prevAreaTarget = usePrevState(areaTarget)
	const prevK = usePrevState(k)
	const prevTray = usePrevState(selectedTray.dim)

	function usePrevState(value){
		const ref = useRef()
		useEffect(()=>{
			ref.current = value
		})
		return ref.current
	}

	useEffect(()=>{
		if(modalOriginalTray)
			toggleBlurAction();
	},[])

	useEffect(()=>{
		if(selectedTray.dim !== prevTray && prevTray !== undefined){
			const myTray = KitchenMath.getAreaByType(dim,key)
			setAreaTarget(myTray.area)
		}
	},[selectedTray])

	useEffect(()=>{
		if(props.convert){
			const {area} = KitchenMath.getAreaByType(dim,key)
			setAreaTarget(area)
		}
	},[props.convert])

	useEffect(()=>{
		if(prevAreaTarget !== areaTarget)
			setK(KitchenMath.getKfromArea(areaSource,areaTarget))
	},[areaTarget])

	const onContinueOriginalTray=(area)=>{
		setAreaSource(area)
		setModalOriginalTray(false);
		setShowModal(true);
	}

	const onConfirmTray=(area)=>{
		toggleBlurAction();
		setAreaTarget(area)
		setShowModal(false)
	}

	const changeTray=()=>{
		toggleBlurAction();
		fastConvertionAction();
		setShowModal(false)
		navigation.navigate('MyTrayScreen')
	}

	if(result.hasOwnProperty('recipe')){
		if(result.recipe.hasOwnProperty('err'))
			return (<Text>{result.recipe.msg}</Text>)
		else{
			return (
				<View style={styles.mainContainer}>
				{(showModal || modalOriginalTray) && 
					<BlurView
		 	    	  style={styles.blur}
		 		      blurType="dark"
	 		          blurAmount={1}
	 		        />}
	 		        <OriginalTrayInfoModal 
	 		        				confirm={(area)=>onContinueOriginalTray(area)}
	 		        				showModal={modalOriginalTray}
	 		        				tray={result.recipe.trayRad}
	 		        />
					<ModalInfoTray 	close={()=>changeTray()}
									confirm={(area)=>onConfirmTray(area)}
									showModal={showModal}
									selectedTray={selectedTray}/>
					<View style={styles.titleBox}>
						<Text style={styles.title}>{result.recipe.title}</Text>
					</View>
					<View style={styles.recipe}>
						<ResultList list={result.recipe} k = {k}/>
					</View>
				</View>
			);
		}	
	}
	else{
		return (<Text>C'è stato un problema nel leggere la ricetta</Text>)
	}	
}
	

const mapStateToProps=(state)=>({
	result:state.result,
	selectedTray:state.settings.selection,
	convert:state.system.convert
})
export default connect(mapStateToProps,{toggleBlurAction,fastConvertionAction})(ResultScreen);