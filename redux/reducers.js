import {CLEAN_STORE,
		SEARCH_LINK,searchLinkAction,
		SAVE_SEARCHED_LINK,saveSearchedLinkAction,
		BOOKMARK_SEARCH,bookmarkSearchAction,
		DELETE_SEARCHED_LINK, deleteSearchedLinkAction,
		SET_MY_TRAY,setMyTrayAction,
		TOGGLE_BLUR,toggleBlurAction,
		ADD_TRAY,addTrayAction,
		DELETE_TRAY,deleteTrayAction,
		SET_NUMBER_OF_DAY,setNumDaysAction,
		SHOW_TUTORIAL,showTutorialAction,
		RESET_SETTINGS,resetSettingsAction,
		FAST_CONVERTION,fastConvertionAction,
		CONVERT,convertAction,
} from './actions'; 
import {stdTrays} from '../api/standardTrays';

const day = 86400000

export const systemReducer = (state = {...state,blur:false,fastConv:false,convert:false},action) =>{
	switch(action.type){
		case TOGGLE_BLUR: return {...state,blur:!state.blur} 
		case FAST_CONVERTION: return {...state,fastConv:!state.fastConv}
		case CONVERT: return {...state,convert:true}
		case SEARCH_LINK: return {...state,convert:false}
		default: return state;
	}
}

export const linkReducer = (state = {} ,action) =>{
	switch(action.type){
		case SEARCH_LINK: return {...state,...action.payload}
		default: return state;
	}
}
export const historyReducer = (state = [] ,action) =>{
	switch(action.type){
		case SAVE_SEARCHED_LINK: return [...state,{...action.payload,favourite:false,date:Date.now(),key:Date.now()}]
		case DELETE_SEARCHED_LINK: return state.filter(el=> el.date !== action.payload)
		case BOOKMARK_SEARCH: {
			const index = state.findIndex(el => el.date === action.payload)
			const newState = [...state]
			const checkFav = newState[index].hasOwnProperty('favourite')
			let toggleFav;
			checkFav ? toggleFav = !newState[index].favourite : toggleFav = true
			newState[index] = {...newState[index],favourite:toggleFav}
			return newState
		}

		default: return state;
	}
}
export const settingsReducer = (state = stdTrays,action) =>{
	switch(action.type){
		case RESET_SETTINGS: return stdTrays;
		case SET_MY_TRAY: {
			const traysTypes = Object.keys(state.trays)
			const trayIndex = Math.trunc(action.payload)
			let newState = Object.assign({},state)
			traysTypes.map(type => {
				newState.trays[type].map(tray=>{
					if(tray.selected === true)
						tray.selected = false
					if(tray.key === action.payload){
						tray.selected = true
						newState = {...state,selection:tray}
					}
				})
				newState.customTrays[type].map(tray=>{
					if(tray.selected === true)
						tray.selected = false
					if(tray.key === action.payload){
						tray.selected = true
						newState = {...state,selection:tray}
					}
				})
			})
			return newState;
		}
		case ADD_TRAY:{
			const {type,name,dim,servs,key} = action.payload
			const tray = {name,dim,servs,selected:false,key}
			let newState = {...state}
			const ctKeyArr = Object.keys(state.customTrays)
			newState.customTrays[type].push(tray) 
			return newState;
		}
		case DELETE_TRAY: {
			const type = Object.keys(state.customTrays)
			const array = state.customTrays[type[Math.trunc(action.payload)]]
			const newState = {...state}
			newState.customTrays[type[Math.trunc(action.payload)]] = array.filter(el=>el.key !== action.payload)
			return newState;
		}
		case SET_NUMBER_OF_DAY: return {...state,day:action.payload}
		case SHOW_TUTORIAL: return {...state,tutorial:action.payload}
		default: return state
	}
}
