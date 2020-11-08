import { Action } from 'redux';

export const UPDATE_FORM = "@form/UPDATE";

export interface FormState {
    name?:string
    age?:number
}

interface UpdateFormAction extends Action {
    type: typeof UPDATE_FORM,
    payload: {
        formData: FormState
    }
}

export type FormAction = UpdateFormAction
