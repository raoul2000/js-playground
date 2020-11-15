import { FormDocState, FormDocAction, UPDATE_FORM } from './types'

export function updateForm(formData: FormDocState): FormDocAction {
    return {
        type: UPDATE_FORM,
        payload: {
            formData
        }
    }
}