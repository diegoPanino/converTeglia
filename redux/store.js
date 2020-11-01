import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore,persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {addContactReducer,addUserReducer} from './reducers.js';
import {linkReducer} from './reducers.js'

const persistConfig ={
	key:'root',
	storage:AsyncStorage,
	timeout:null,
}
const reducers = combineReducers({
	searchEntries: linkReducer
})
const persistedReducer = persistReducer(persistConfig,reducers);
export const store = createStore(persistedReducer,applyMiddleware(thunk));
export const persistor = persistStore(store);