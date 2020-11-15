import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { formDocReducer } from './form-doc/reducers'
import { formAttrReducer } from './form-attr/reducers'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    formDoc: formDocReducer,
    formAttr: formAttrReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));