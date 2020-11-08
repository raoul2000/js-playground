
import { FormAction, FormState, UPDATE_FORM } from './types'

export const initialState: FormState = {}

export function formReducer(
    state = initialState,
    action: FormAction
): FormState {
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

