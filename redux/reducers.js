import {CLEAN_STORE,
		SEARCH_LINK,searchLinkAction,
		SAVE_SEARCHED_LINK,saveSearchedLinkAction,
		BOOKMARK_SEARCH,bookmarkSearchAction,
		DELETE_SEARCHED_LINK, deleteSearchedLinkAction,
		SET_MY_TRAY,setMyTrayAction,
} from './actions'; 
import {stdTrays} from '../api/standardTrays';

const day = 86400000

export const linkReducer = (state = {} ,action) =>{
	switch(action.type){
		case SEARCH_LINK: return {...state,...action.payload}
		default: return state;
	}
}
export const historyReducer = (state= [] ,action) =>{
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
		case SET_MY_TRAY: {
			const traysTypes = Object.keys(state.trays)
			const trayIndex = Math.trunc(action.payload)
			let newState = {...state}
			traysTypes.map(type => {
				newState.trays[type].map(tray=>{
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
		default: return state
	}
}
