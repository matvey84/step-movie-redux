import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { allAlertRedusers } from './redusers/allAlertRedusers';
import {fetchRedusers} from './redusers/fetchRedusers'
import { loadReduser } from './redusers/loadReduser';
import { paginatorReduser } from './redusers/paginatorReduser';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReduser = combineReducers({
	allAlertRedusers,
	fetchRedusers,
	loadReduser,
	paginatorReduser,

})

const persistedReducer = persistReducer(persistConfig, rootReduser)


export const store = createStore(persistedReducer/*rootReduser*/, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)