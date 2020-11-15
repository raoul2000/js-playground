import { FormDocState, FormDocAction, UPDATE_FORM_DOC } from './types'


export function updateDocForm(formData: FormDocState): FormDocAction {
    return {
        type: UPDATE_FORM_DOC,
        payload: {
            formData
        }
    }
}