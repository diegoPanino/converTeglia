//ACTION TYPE
export const SEARCH_LINK = 'SEARCH_LINK'; //SENDING A LINK TO BE FETCHED
export const CLEAN_STORE = 'CLEAN_STORE';
export const BOOKMARK_SEARCH = 'BOOKMARK_SEARCH'; //SAVE A SEARCH TO BE STORE LIKE A FAVOURITE
export const SAVE_SEARCHED_LINK = 'SAVE_SEARCHED_LINK'; //KEEP TRACK OF THE SEARCHES

//ACTION MAKER

export const searchLinkAction= recipe =>({
	type:SEARCH_LINK,
	payload:{recipe:recipe,date:Date.now()},
})
export const cleanStoreAction=()=>({
	type:CLEAN_STORE,
})
export const bookmarkSearchAction = recipe =>({
	type:BOOKMARK_SEARCH,
	payload: recipe
})
export const saveSearchedLinkAction = recipe =>({
	type:SAVE_SEARCHED_LINK,
	payload: recipe
})