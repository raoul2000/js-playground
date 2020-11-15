import { FormAttrState, FormAttrAction, UPDATE_FORM_ATTR } from './types'

export function updateAttrForm(formData: FormAttrState): FormAttrAction {
    return {
        type: UPDATE_FORM_ATTR,
        payload: {
            formData
        }
    }
}