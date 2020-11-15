
import { FormAttrAction, FormAttrState, UPDATE_FORM } from './types'

export const initialState: FormAttrState = {}

export function formAttrReducer(
    state = initialState,
    action: FormAttrAction
): FormAttrState {
    switch (action.type) {
        case UPDATE_FORM:
            return {
                ...action.payload.formData
            };
        default:
            return initialState;
            // TODO: better to throw exception here
            //throw new Error('invalid action');
    }
}

