import React,{useState,useEffect,useRef} from 'react'
import {View,StyleSheet,TouchableOpacity,Animated,Dimensions} from 'react-native';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import MyText from '../MyText.js';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const styles= StyleSheet.create({
	mainView:{
		flex:1,
		justifyContent:'flex-start',
		position:'absolute',
		left:0,
		top:0,
		zIndex:10,
		backgroundColor:'transparent',
		height:HEIGHT,
		width:WIDTH,
	},
	contentView:{
		backgroundColor:'#fef1d8',
		borderWidth:3,
		borderRadius:20,
		borderColor:'#feaa52',
		padding:20,
		marginRight:'1%',
		marginLeft:'1%',
		marginTop:'45%',
	},
	headerContent:{
		flexDirection:'row'
	},
	icoView:{
		flex:1,
		marginLeft:-15,
		marginTop:-10,
	},
	ico:{
		color:'#feaa52'
	},
	textView:{
		flex:10,
		marginTop:-15,
		marginBottom:10,
	},
	h4Text:{
		marginRight:5,
		marginLeft:5,
		textAlign:'center',
		fontSize:18,
	},
	buttonView:{
		justifyContent:'flex-end',
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
	buttonText:{
		fontSize:22,
		textAlign:'center',
		color:'#e8871e',		
	}
})

export default function TutorialBox(props){
	const {type,next,navigation=null,hide=()=>{},exampleFunction,reduxFunction} = props
	const [index,setIndex] = useState(0)
	const scale = useRef( new Animated.Value(0)).current
	const screen = {
		search:[
			{
			message:'Trova la ricetta che più ti piace su internet, copia e incolla l\'indirizzo della pagina in questa barra',
			positioning:{marginTop:'60%'},
			},
			{
			message:'Puoi anche condividere direttamente la pagina internet dal tuo browser (Chrome,Safari,...) con la app ConverTeglia',
			positioning:{marginTop:'60%'},
			},
			{
			message:'Oppure scrivi o incolla una lista di ingredienti e \n CREA LA TUA RICETTA personale, nella prossima schermata!',
			positioning:{marginTop:'95%'},
			},
		],
		newRecipe:[
			{
			message:'Qui potrai modificare gli ingredienti inseriti manualmente, e dare un nome alla tua ricetta personale, che verrá salvata',
			positioning:{marginTop:'100%'},
			},
			{
			message:'Una volta finito con gli ingredienti... CONVERTI!',
			positioning:{marginTop:'120%'},
			exampleData:[	{amounts:'100',units:'g',names:'albumi',id:'firstExample'},
							{amounts:'200',units:'g',names:'zucchero',id:'secondExample'}
						]
			},
		],
		modalOriginal:[
			{
			message:'In questa schermata toccando sui numeri potrai cambiare le dimensioni o le porzioni della ricetta di partenza.\nProvaci!',
			positioning:{marginTop:'130%'}
			},
			{
			message:'ConverTeglia è in grado di leggere le dimensioni dalle ricette online, non è però infallibile!\nControlla sempre per evitare risultati inaspettati!',
			positioning:{marginTop:'130%'}
			},
		],
		selectedTray:[
			{
			message:'Qui potrai cambiare o confermare la tua teglia, quella per la quale vuoi convertire la ricetta',
			positioning:{marginTop:'130%'}
			},
			{
			message:'Ti mostrerò dopo come gestire le tue teglie personali, ora è tempo di matematica da cucina!',
			positioning:{marginTop:'130%'}
			},
		],
		result:[
			{
			message:'Eccoci qua! Le quantitá degli ingredienti vengono convertite considerando le aree delle due teglie.',
			positioning:{marginTop:'50%'}
			},
			{
			message:'Hai notato troppo tardi che sei a corto di uno degli ingredienti?\nNessun problema, tocca il lucchetto e cambia la quantitá di quell\'ingrediente!',
			positioning:{marginTop:'50%'}
			},
			{
			message:'Hai solo 100g di burro, ma la ricetta ne vuole 250?\nChiudi il lucchetto con un tocco e inserisci 100 nella linea dell\'ingrediente del quale sei a corto e ConverTeglia ricalcolerá per te tutti gli ingredienti, senza cambiare le proporzioni',
			positioning:{marginTop:'50%'}
			},
			{
			message:'Questa icona nell\'angolo a destra,con l\'immagine della teglia, ti aiuterá a tenere a mente la tua teglia selezionata (quella che metti in forno!)',
			positioning:{marginTop:0}
			},
			{
			message:'L\'icona accanto è invece il tuo ricettario! Tutte le ricette convertite, prese da internet o create da te, verranno salvate qui dentro!\nComodo no?',
			positioning:{marginTop:0}
			},
		],
		myTray:{
			message:'',
		},
		history:{
			message:'',
		},
		advancedSettings:{
			message:'',
		},
	}
	useEffect(()=>{
		showingUp();
		return ()=>showingOff()
	},[])

	useEffect(()=>{
		if(screen[type][index].hasOwnProperty('exampleData'))
			exampleFunction(screen[type][index].exampleData)
	},[index])

	const animation=(flag)=>{
		Animated.sequence([
			Animated.timing(scale,{
			toValue:0,
			duration:600,
			useNativeDriver:true
		}),
		Animated.timing(scale,{
			toValue:1,
			duration:600,
			useNativeDriver:true
		})
		]).start()
	}

	const showingUp=(funct)=>{
		Animated.timing(scale,{
			toValue:1,
			duration:600,
			useNativeDriver:true
		}).start()
	}
	const showingOff=(flag)=>{
		Animated.timing(scale,{
			toValue:0,
			duration:600,
			useNativeDriver:true
		}).start(()=>{
			if(flag)
				setIndex(prevIndex=>prevIndex + 1)
			else
				setIndex(prevIndex=>prevIndex - 1)

				showingUp()
		})
	}

	const onNextPress=()=>{
		if(index < (screen[type].length - 1)){
			showingOff(true);
		}
		else if( typeof next === 'function' ){
			Animated.timing(scale,{
				toValue:0,
				duration:600,
				useNativeDriver:true
			}).start(()=>{
				//hide()
				next(true)
			})
		}
		else if(reduxFunction)
			reduxFunction()
		else{
			navigation.navigate(next)
			hide()
		}
	}
	const onPrevPress=()=>{
		showingOff(false)
	}

	return(
		<View style={styles.mainView}>
			<Animated.View style={{transform:[{scale}]}} >
				<View style={[styles.contentView,screen[type][index].positioning]}>
					<View style={styles.headerContent}>
						<View style={styles.icoView}>
							{(index !== 0) && <TouchableOpacity onPress={()=>onPrevPress()}>
								<Icon style={styles.ico} name='arrow-back' />
							</TouchableOpacity>}
						</View>
						<View style={styles.textView}>
							<MyText myStyle={styles.h4Text}>{screen[type][index].message}</MyText>
						</View>
					</View>
					<View style={styles.bottonView} >
						<TouchableOpacity style={styles.buttonContainer} onPress={()=>onNextPress()} >
							<MyText myStyle={styles.buttonText}>PROSSIMO</MyText>
						</TouchableOpacity>
					</View>
				</View>
			</Animated.View>
		</View>
		);
}

/*<View style={[styles.contentView,screen[type].positioning]}>
				
			</View>*/