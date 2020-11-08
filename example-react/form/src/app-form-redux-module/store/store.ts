import { createStore, combineReducers } from 'redux'

// attempt to implement https://medium.com/@shanebdavis/modular-redux-a-design-pattern-for-mastering-scalable-shared-state-82d4abc0d7b3
// in typescript

let reducers:{[key: string] : ( attr:AttributesState, val:any) => AttributesState} = {};

export const store = createStore(s => s);

store.injectReducer = (key:string, reducer:any) => {
    reducers[key] = reducer;
    store.replaceReducer(combineReducers(reducers));
  };