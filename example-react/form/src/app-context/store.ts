import React, { createContext, useContext, useReducer } from 'react';

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

export const initialState: RootState = {
    firstname: null,
    lastname: null
};

export const FormContext = createContext<{
    state: RootState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

//export const useFormContext = () => useContext(FormContext);


export const reducer = (state: RootState, action: Action): RootState => {
    switch (action.type) {
        case "ACTION_SET_FIRST_NAME":
            return {
                ...state,
                firstname: action.firstname !== state.firstname ? action.firstname : state.firstname
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