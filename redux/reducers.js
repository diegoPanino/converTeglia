import {CLEAN_STORE,
		SEARCH_LINK,searchLinkAction,
		SAVE_SEARCHED_LINK,saveSearchedLinkAction,
		BOOKMARK_SEARCH,bookmarkSearchAction,
		DELETE_SEARCHED_LINK, deleteSearchedLinkAction
} from './actions'; 

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
