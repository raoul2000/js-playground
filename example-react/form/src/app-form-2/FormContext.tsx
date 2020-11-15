import  { createContext, Context } from 'react'
import { FormAttrState } from './store/form-attr/types';
import { FormDocState } from './store/form-doc/types';

export enum ActionType {
    ACTION_UPDATE_FORM_ATTR = 'ACTION_UPDATE_FORM_ATTR',
    ACTION_UPDATE_FORM_DOC = 'ACTION_UPDATE_FORM_DOC'
}
// Discriminated unions Type for Actions
type Action =
    | { type: 'ACTION_UPDATE_FORM_ATTR', payload: FormAttrState }
    | { type: 'ACTION_UPDATE_FORM_DOC', payload: FormDocState };


export type FormContextType = {
    formAttr: FormAttrState
    formDoc: FormDocState
}
const initialState:FormContextType = {
    formAttr: {},
    formDoc: {}
};

//const FormContext: Context<FormContextType> = createContext<FormContextType>({ formAttr: {}, formDoc: {} });
const FormContext = createContext<{
    state: FormContextType;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export const reducer = (state: FormContextType, action: Action): FormContextType => {
    switch (action.type) {
        case "ACTION_UPDATE_FORM_ATTR":
            return {
                ...state,
                formAttr: {...action.payload}
            }
        case 'ACTION_UPDATE_FORM_DOC':
            return {
                ...state,
                formDoc: {...action.payload}
            }
        default:
            throw new Error('invalid action');
    }
}

export default FormContext;
