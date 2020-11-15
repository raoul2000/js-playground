import { Action } from 'redux';

export const UPDATE_FORM = "@form-doc/UPDATE";

export interface FormDocState {
    name?:string
    age?:number
}

interface UpdateFormDocAction extends Action {
    type: typeof UPDATE_FORM,
    payload: {
        formData: FormDocState
    }
}

export type FormDocAction = UpdateFormDocAction
