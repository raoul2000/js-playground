import { FormAttrState, FormAttrAction, UPDATE_FORM } from './types'

export function updateAttrForm(formData: FormAttrState): FormAttrAction {
    return {
        type: UPDATE_FORM,
        payload: {
            formData
        }
    }
}