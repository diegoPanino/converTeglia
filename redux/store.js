import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore,persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {linkReducer,historyReducer} from './reducers.js';
import {CLEAN_STORE} from './actions.js';
import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig ={
	key:'root',
	storage:AsyncStorage,
	timeout:null,
	whitelist:['history'],
}
const reducers = combineReducers({
	result: linkReducer,
	history: historyReducer
})
const rootReducer = (state={},action)=>{
	if(action.type === CLEAN_STORE){
		state.result = undefined
	}
	return reducers(state,action)
}

const persistedReducer = persistReducer(persistConfig,rootReducer);
export const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);