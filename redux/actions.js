//ACTION TYPE
export const SEARCH_LINK = 'SEARCH_LINK'; //SENDING A LINK TO BE FETCHED
export const CLEAN_STORE = 'CLEAN_STORE';
export const BOOKMARK_SEARCH = 'BOOKMARK_SEARCH'; //SAVE A SEARCH TO BE STORE LIKE A FAVOURITE
export const SAVE_SEARCHED_LINK = 'SAVE_SEARCHED_LINK'; //KEEP TRACK OF THE SEARCHES
export const DELETE_SEARCHED_LINK = 'DELETE_SEARCHED_LINK'; //DELETE A RESEARCH FROM THE NORMAL HISTORY
export const SET_MY_TRAY = 'SET_MY_TRAY'; // SELECT THE DESTINATION TRAY FOR CONVERSIONS
export const TOGGLE_BLUR = 'TOGGLE_BLUR'; //SYSTEM TOGGLE BLUR
export const ADD_TRAY = 'ADD_TRAY'; //CREATE A NEW PERSONAL TRAY
export const DELETE_TRAY = 'DELETE_TRAY'; //ERASE CUSTOM TRAY
export const SET_NUMBER_OF_DAY = 'SET_NUMBER_OF_DAY'; // SET THE TIME NEED TO PASS BEFORE AUTOMATICALLY ERASE HISTORY
export const SHOW_TUTORIAL = 'SHOW_TUTORIAL'; //FLAG FOR THE INITIAL TUTORIAL TO BE SHOW
export const RESET_SETTINGS = 'RESET_SETTINGS';
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
export const deleteSearchedLinkAction = date =>({
	type:DELETE_SEARCHED_LINK,
	payload:date
})
export const setMyTrayAction = trayKey => ({
	type:SET_MY_TRAY,
	payload:trayKey
})
export const toggleBlurAction = () =>({
	type:TOGGLE_BLUR
})
export const addTrayAction = tray =>({
	type:ADD_TRAY,
	payload:tray
})
export const deleteTrayAction = trayKey =>({
	type:DELETE_TRAY,
	payload:trayKey
})
export const setNumDaysAction = days =>({
	type:SET_NUMBER_OF_DAY,
	payload: days
})
export const showTutorialAction = flag =>({
	type:SHOW_TUTORIAL,
	payload: flag
})
export const resetSettingsAction = () =>({
	type: RESET_SETTINGS,
})