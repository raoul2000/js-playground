import { Action } from 'redux';
import { Person} from '../../types';
export const UPDATE_FORM = "@form-attr/UPDATE";

export interface FormAttrState {
    firstname?:string
    lastname?:string
    person?: Person
}

interface UpdateFormAttrAction extends Action {
    type: typeof UPDATE_FORM,
    payload: {
        formData: FormAttrState
    }
}


export type FormAttrAction = UpdateFormAttrAction
