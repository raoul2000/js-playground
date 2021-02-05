import { createContext, Context } from 'react'
import { FormAttrState } from './store/form-attr/types';
import { FormDocState,Deadlines } from './store/form-doc/types';

export enum ActionType {
    ACTION_UPDATE_FORM_ATTR = 'ACTION_UPDATE_FORM_ATTR',
    ACTION_UPDATE_FORM_ATTR_FIELD = 'ACTION_UPDATE_FORM_ATTR_FIELD',
    ACTION_UPDATE_FORM_DOC = 'ACTION_UPDATE_FORM_DOC',
    ACTION_UPDATE_FORM_DOC_FIELD = 'ACTION_UPDATE_FORM_DOC_FIELD',
    ACTION_UPDATE_DEADLINES = 'ACTION_UPDATE_DEADLINES'
};

// Discriminated unions Type for Actions
type Action =
    | { type: 'ACTION_UPDATE_FORM_ATTR', payload: FormAttrState }
    | {
        type: 'ACTION_UPDATE_FORM_ATTR_FIELD', payload: {
            fieldName: string,
            value: any
        }
    }
    | { type: 'ACTION_UPDATE_FORM_DOC', payload: FormDocState }
    | {
        type: 'ACTION_UPDATE_FORM_DOC_FIELD', payload: {
            fieldName: string,
            value: any
        }
    }
    | { type: 'ACTION_UPDATE_DEADLINES', payload: Deadlines };


export type FormContextType = {
    formAttr: FormAttrState
    formDoc: FormDocState
}

const initialContext: FormContextType = {
    formAttr: {},
    formDoc: {
        deadlines: {
            master: new Date()
        }
    }
};

const FormContext = createContext<{
    context: FormContextType;
    dispatchContext: React.Dispatch<Action>;
}>({
    context: initialContext,
    dispatchContext: () => null
});

export const contextReducer = (state: FormContextType, action: Action): FormContextType => {
    let result: FormContextType;
    switch (action.type) {
        case "ACTION_UPDATE_FORM_ATTR":
            return {
                ...state,
                formAttr: { ...action.payload }
            }
        case 'ACTION_UPDATE_FORM_ATTR_FIELD':
            result = {
                formDoc: { ...state.formDoc },
                formAttr: {
                    ...state.formAttr,
                    [action.payload.fieldName]: action.payload.value
                }
            };
            return result;
        case 'ACTION_UPDATE_FORM_DOC_FIELD':
            result = {
                ...state,
                formDoc: {
                    ...state.formDoc,
                    [action.payload.fieldName]: action.payload.value
                }
            }
            return result;
        case 'ACTION_UPDATE_FORM_DOC':
            return {
                ...state,
                formDoc: { ...action.payload }
            }
            case 'ACTION_UPDATE_DEADLINES':
                return {
                    ...state,
                    formDoc: {
                        ...state.formDoc,
                        deadlines: {
                            ...action.payload
                        }
                    }
                }            
        default:
            throw new Error('invalid action');
    }
}

export default FormContext;
