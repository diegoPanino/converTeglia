import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore,persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {linkReducer,historyReducer,settingsReducer,systemReducer,adReducer} from './reducers.js';
import {CLEAN_STORE} from './actions.js';
//import {composeWithDevTools} from 'redux-devtools-extension';
import filterHistory from '../api/oldHistorySelection';

const persistConfig ={
	key:'root',
	storage:AsyncStorage,
	timeout:null,
	whitelist:['history','settings','ad'],
}
const reducers = combineReducers({
	result: linkReducer,
	history: historyReducer,
	settings: settingsReducer,
	system: systemReducer,
	ad:adReducer,
})
const rootReducer = (state={},action)=>{
	if(action.type === CLEAN_STORE){
		state.result = undefined
	}
	return reducers(state,action)
}

const onEndRehydrationHandler=()=>{
	const state = store.getState()
	const {day} = state.settings
	const oldHistory = filterHistory(state.history,day)
	if(oldHistory.length > 0){
		oldHistory.map(el=>{
			store.dispatch({
				type:'DELETE_SEARCHED_LINK',
				payload:el.date
			})
		})
	}
	else return;
}
const persistedReducer = persistReducer(persistConfig,rootReducer);
export const store = createStore(persistedReducer,applyMiddleware(thunk));
export const persistor = persistStore(store,{},onEndRehydrationHandler);


