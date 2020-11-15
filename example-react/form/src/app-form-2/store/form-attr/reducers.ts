
import { FormAttrAction, FormAttrState, UPDATE_FORM_ATTR } from './types'

export const initialState: FormAttrState = {}

export function formAttrReducer(
    state = initialState,
    action: FormAttrAction
): FormAttrState {
    switch (action.type) {
        case UPDATE_FORM_ATTR:
            return {
                ...state,
                ...action.payload.formData
            };
        default:
            return state;
    }
}

