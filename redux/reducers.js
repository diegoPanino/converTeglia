import {SEARCH_LINK,searchLinkAction,
		SAVE_SEARCHED_LINK,saveSearchedLinkAction,
		BOOKMARK_SEARCH,bookmarkSearchAction
} from './actions'; 

export const linkReducer = (state = {} ,action) =>{
	switch(action.type){
		case SEARCH_LINK: return {...state,...action.payload}
		default: return state;
	}
}
export const historyReducer = (state=[],action) =>{
	switch(action.type){
		case BOOKMARK_SEARCH: return [...state,{...action.payload,favourite:true}]
		case SAVE_SEARCHED_LINK:{ console.log('historyReducers: ',action.payload); return [...state,action.payload]}
		default: return state;
	}
}
