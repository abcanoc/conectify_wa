import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import channelsReducer from './ChannelsDuck';
import authReducer from './AuthDuck';
import messagesReducer from './MessagesDuck';

const rootReducer = combineReducers({
    messages: messagesReducer,
    channels: channelsReducer,
    auth: authReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}