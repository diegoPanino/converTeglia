import {getIngredients} from '../api/fetch';

//ACTION TYPE
export const SEARCH_LINK = 'SEARCH_LINK'; //SENDING A LINK TO BE FETCHED
export const CLEAN_STORE = 'CLEAN_STORE';
export const BOOKMARK_SEARCH = 'BOOKMARK_SEARCH'; //SAVE A SEARCH TO BE STORE LIKE A FAVOURITE
export const SAVE_SEARCHED_LINK = 'SAVE_SEARCHED_LINK'; //KEEP TRACK OF THE SEARCHES
export const DELETE_SEARCHED_LINK = 'DELETE_SEARCHED_LINK'; //DELETE A RESEARCH FROM THE NORMAL HISTORY
export const SET_MY_TRAY = 'SET_MY_TRAY'; // SELECT THE DESTINATION TRAY FOR CONVERSIONS
export const TOGGLE_BLUR = 'TOGGLE_BLUR'; //SYSTEM TOGGLE BLUR
export const TOGGLE_ICO = 'TOGGLE_ICO'; // SET TO FALSE THE FLAG FOR ANIMATION ICO IN THE HEADER
export const ADD_TRAY = 'ADD_TRAY'; //CREATE A NEW PERSONAL TRAY
export const DELETE_TRAY = 'DELETE_TRAY'; //ERASE CUSTOM TRAY
export const SET_NUMBER_OF_DAY = 'SET_NUMBER_OF_DAY'; // SET THE TIME NEED TO PASS BEFORE AUTOMATICALLY ERASE HISTORY
export const SHOW_TUTORIAL = 'SHOW_TUTORIAL'; //FLAG FOR THE INITIAL TUTORIAL TO BE SHOW
export const RESET_SETTINGS = 'RESET_SETTINGS';
export const FAST_CONVERTION = 'FAST_CONVERTION'; // FLAG TO SHOW FAST CONVERTION BUTTON
export const CONVERT = 'CONVERT'; //TRIGGER THE FLAG TO CONVERT
export const CONVERT_BY_K = 'CONVERT_BY_K'; // MULTIPLE ALL INGREDIENTS BY K costant (TRAY)
export const CONVERT_BY_I = 'CONVERT_BY_I'; // MULTIPLE ALL INGREDIENTS BY I costant (INGREDIENTS)
export const PLUS_FAV = 'PLUS_FAV'; //ADD 1 TO THE FAVOURITE COUNTER FOR AD
export const SUB_FAV = 'SUB_FAV'; // SUBTRACT 1 TO THE FAV COUNTER FOR AD
export const INCREASE_LIMIT_FAV_RECIPE = 'INCREASE_LIMIT_FAV_RECIPE'; // INRCEASE BY 1 THE LIMIT OF THE TOTAL NUMBERS OF FAVOURITE RECIPES
export const RESET_CHANGED_TRAY = 'RESET_CHANGED_TRAY' // MOVE BACK THE COUNTER FOR THE TRAY CHANGING TO ZERO
export const FETCH_SENT = 'FETCH_SENT' //ASYNC ACTION SENDED FETCH REQUEST
export const FETCH_SUCCESS = 'FETCH_SUCCESS' //ASYNC ACTION FETCH SUCCESS
export const FETCH_FAIL = 'FETCH_FAIL' //ASYNC ACTION FETCH FAILED
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
export const toggleChangedIcoAction = () =>({
	type:TOGGLE_ICO
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
export const fastConvertionAction = () =>({
	type: FAST_CONVERTION,
})
export const convertAction = () =>({
	type:CONVERT
})
export const convertByKAction = k =>({
	type:CONVERT_BY_K,
	payload: k
})
export const convertByIAction = i =>({
	type:CONVERT_BY_I,
	payload: i,
})	
export const plusFavAction = () =>({
	type:PLUS_FAV
})
export const subFavAction = () =>({
	type:SUB_FAV
})
export const increaseLimitFavRecipeAction = () =>({
	type:INCREASE_LIMIT_FAV_RECIPE
})
export const resetChangedTrayAction = () =>({
	type:RESET_CHANGED_TRAY
})
export const fetchUrlSentAction = () => ({
	type:FETCH_SENT
})
export const fetchUrlSuccessAction = () =>({
	type:FETCH_SUCCESS
})
export const fetchUrlFailedAction = () =>({
	type:FETCH_FAIL
})
export const fetchIngredient=url=>{
	return function(dispatch){
		dispatch(fetchUrlSentAction())
		getIngredients(url).then(result => {
			if(!result.hasOwnProperty('err')){
				dispatch(fetchUrlSuccessAction())
				dispatch(saveSearchedLinkAction(result))
				dispatch(searchLinkAction(result))
			}
			else{
				dispatch(fetchUrlFailedAction())
				dispatch(searchLinkAction(result))
			}
			
		})
	}
}