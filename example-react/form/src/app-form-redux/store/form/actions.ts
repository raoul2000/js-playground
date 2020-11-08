import { FormState, FormAction, UPDATE_FORM } from './types'

export function updateForm(formData: FormState): FormAction {
    return {
        type: UPDATE_FORM,
        payload: {
            formData
        }
    }
}