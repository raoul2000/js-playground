import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { formReducer } from './form/reducers'
import { formAttrReducer } from './form-attr/reducers'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    form: formReducer,
    formAttr: formAttrReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));