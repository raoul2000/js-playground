import { Action } from 'redux';
import { Person} from '../../types';
export const UPDATE_FORM_ATTR = "@form-attr/UPDATE";

export interface FormAttrState {
    firstname?:string
    lastname?:string
    person?: Person
}

interface UpdateFormAttrAction extends Action {
    type: typeof UPDATE_FORM_ATTR,
    payload: {
        formData: FormAttrState
    }
}


export type FormAttrAction = UpdateFormAttrAction
