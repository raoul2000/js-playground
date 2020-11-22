import React, { createContext, Context, useReducer } from 'react'
import { connect, ConnectedProps, useSelector, useDispatch } from 'react-redux'
import { FormAttrState, FormAttrAction } from './store/form-attr/types';
import { FormDocState, FormDocAction } from './store/form-doc/types';
import { RootState } from './store';
import { updateAttrForm } from './store/form-attr/actions';
import { updateDocForm } from './store/form-doc/actions';
import FormContext, {FormContextType, contextReducer} from './FormContext';

import { TabView, TabPanel } from 'primereact/tabview';
import FormAttribute from './panels/FormAttribute';
import FormDocumentWithWidget from './panels/FormDocumentWithWidget';
//import FormDocument from './panels/FormDocument';

// redux store connection --------------------- 

const mapState = (state: RootState) => ({
    formAttrState: state.formAttr,
    formDocState: state.formDoc
})
const mapDispatch = {
    updateAttrForm,
    updateDocForm
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

// Component ------------------------------------

const FormWrapper: React.FC<Props> = ({ formAttrState, formDocState, updateAttrForm, updateDocForm }: Props) => {
    // set redux context 
    const initialContext:FormContextType = {
        formAttr: formAttrState,
        formDoc: formDocState
    };
    const [context, dispatchContext] = useReducer(contextReducer, initialContext);
    const handleSubmitFormAttr = () => {
        updateAttrForm(context.formAttr);
    }
    const handleSubmitFormDoc = () => {
        updateDocForm(context.formDoc);
    }
    return (
        <FormContext.Provider value={{context, dispatchContext}}>
            <TabView>
                <TabPanel header="Attributes" leftIcon="pi pi-calendar">
                    <FormAttribute onSaveForm={() => handleSubmitFormAttr()}/>
                </TabPanel>
                <TabPanel header=" Document " leftIcon="pi pi-file">
                    <FormDocumentWithWidget  onSaveForm={() => handleSubmitFormDoc()}/>
                </TabPanel>
            </TabView>
        </FormContext.Provider>
    )
}

export default connector(FormWrapper);