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
		CONVERT_BY_K,convertByKAction,
		CONVERT_BY_I,convertByIAction,
		TOGGLE_ICO,toggleChangedIcoAction,
		PLUS_FAV,plusFavAction,
		SUB_FAV,subFavAction,
		INCREASE_LIMIT_FAV_RECIPE,increaseLimitFavRecipeAction,
} from './actions'; 
import {stdTrays} from '../api/standardTrays';

const day = 86400000

export const systemReducer = (state = {...state,blur:false,fastConv:false,convert:false,changedIco:false},action) =>{
	switch(action.type){
		case TOGGLE_BLUR: return {...state,blur:!state.blur} 
		case FAST_CONVERTION: return {...state,fastConv:!state.fastConv}
		case CONVERT: return {...state,convert:true}
		case SEARCH_LINK: return {...state,convert:false}
		case SET_MY_TRAY: return {...state,changedIco:true}
		case TOGGLE_ICO: return {...state,changedIco:false}
		default: return state;
	}
}

export const linkReducer = (state = {recipe:{},convertedRecipe:{}} ,action) =>{
	switch(action.type){
		case SEARCH_LINK: return {...state,...action.payload}
		case CONVERT_BY_K: {
				const newIngredients = [...state.recipe.ingredients]
				const converted = newIngredients.map((ing,i) =>{
						return (ing.amounts * action.payload).toFixed()
				})
				return {...state,convertedRecipe:converted}
			}
		case CONVERT_BY_I:{
			const newIngredients = [...state.convertedRecipe]
			const converted = newIngredients.map(ing=>{
				return (ing * action.payload).toFixed()
			})
			return {...state,convertedRecipe:converted};
		}
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
export const adReducer = (state = {changedTray:0,favoriteRecipe:0,maxFavRecipe:5,createdTray:0,searchedRecipe:0},action)=>{
	switch(action.type){
		case SET_MY_TRAY: return {...state,changedTray:state.changedTray + 1}
		case SAVE_SEARCHED_LINK: return {...state,searchedRecipe: state.searchedRecipe + 1}
		case PLUS_FAV: return {...state,favoriteRecipe: state.favoriteRecipe + 1}
		case SUB_FAV: return {...state,favoriteRecipe: state.favoriteRecipe - 1}
		case INCREASE_LIMIT_FAV_RECIPE: return {...state, maxFavRecipe:state.maxFavRecipe + 1}
		case ADD_TRAY: return {...state,createdTray:state.createdTray + 1}
		case DELETE_TRAY: return {...state,createdTray:state.createdTray - 1}

		default: return state
	}
}
