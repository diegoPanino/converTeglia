import {SEARCH_LINK,searchLinkAction} from './actions';

export const linkReducer = (state = [] ,action) =>{
	switch(action.type){
		case SEARCH_LINK: {console.log(state); return [...state,action.payload]}
		default: return state;
	}
}

