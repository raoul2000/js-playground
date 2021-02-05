import { Action } from 'redux';

export const UPDATE_FORM_DOC = "@form-doc/UPDATE";

export interface Deadlines {
    master: Date,
    [key: string]: Date
};

export interface FormDocState {
    name?:string
    birthday?:Date
    meetingDate?:Date
    deadline?:Date
    deadlines: Deadlines
}

interface UpdateFormDocAction extends Action {
    type: typeof UPDATE_FORM_DOC,
    payload: {
        formData: FormDocState
    }
}

export type FormDocAction = UpdateFormDocAction
