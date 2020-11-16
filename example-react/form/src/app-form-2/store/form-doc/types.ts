import { Action } from 'redux';

export const UPDATE_FORM_DOC = "@form-doc/UPDATE";

export interface FormDocState {
    name?:string
    birthday?:Date
    meetingDate?:Date
    deadline?:Date
}

interface UpdateFormDocAction extends Action {
    type: typeof UPDATE_FORM_DOC,
    payload: {
        formData: FormDocState
    }
}

export type FormDocAction = UpdateFormDocAction
