
import { FormDocAction, FormDocState, UPDATE_FORM_DOC } from './types'

export const initialState: FormDocState = {
    deadlines: {
        master: new Date()
    }
}

export function formDocReducer(
    state = initialState,
    action: FormDocAction
): FormDocState {
    switch (action.type) {
        case UPDATE_FORM_DOC:
            return {
                ...state,
                ...action.payload.formData
            };
        default:
            return state;
    }
}

