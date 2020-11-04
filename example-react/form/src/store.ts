import React, { createContext, useReducer } from 'react';

export const ACTION_SET_FIRST_NAME = 'SET_FIRST_NAME';
export const ACTION_SET_LAST_NAME = 'SET_LAST_NAME';

export enum ActionType {
    ACTION_SET_FIRST_NAME = 'SET_FIRST_NAME',
    ACTION_SET_LAST_NAME = 'SET_LAST_NAME'
}
export interface RootState {
    firstname: string | null;
    lastname: string | null;
};
// Discriminated unions Type for Actions
type Action =
    | { type: 'ACTION_SET_FIRST_NAME', firstname: string }
    | { type: 'ACTION_SET_LAST_NAME', lastname: string };

const initialState: RootState = {
    firstname: null,
    lastname: null
};

const store = createContext<RootState>(initialState);
const { Provider } = store;

const reducer = (state: RootState, action: Action): RootState => {
    switch (action.type) {
        case "ACTION_SET_FIRST_NAME":
            return {
                ...state,
                firstname: action.firstname
            }
        case 'ACTION_SET_LAST_NAME':
            return {
                ...state,
                lastname: action.lastname
            }
        default:
            throw new Error('invalid action');
    }
}

const StateProvider:React.FC<React.ReactElement> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //return (<Provider value={ { state, dispatch } }> { children } < /Provider>);
};