
import { FormDocAction, FormDocState, UPDATE_FORM } from './types'

export const initialState: FormDocState = {}

export function formDocReducer(
    state = initialState,
    action: FormDocAction
): FormDocState {
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

