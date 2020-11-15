import React, { createContext, Context, useReducer } from 'react'
import { connect, ConnectedProps, useSelector, useDispatch } from 'react-redux'
import { FormAttrState, FormAttrAction } from './store/form-attr/types';
import { FormDocState, FormDocAction } from './store/form-doc/types';
import { RootState } from './store';
import { updateAttrForm } from './store/form-attr/actions';
import FormContext, {FormContextType, reducer} from './FormContext';

import { TabView, TabPanel } from 'primereact/tabview';
import FormAttribute from './panels/FormAttribute';
import FormDocument from './panels/FormDocument';

// redux store connection --------------------- 

const mapState = (state: RootState) => ({
    formAttrState: state.formAttr,
    formDocState: state.formDoc
})
const mapDispatch = {
    updateAttrForm
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

// Component ------------------------------------

const FormWrapper: React.FC<Props> = ({ formAttrState, formDocState, updateAttrForm }: Props) => {
    // set redux context 
    const initialContext:FormContextType = {
        formAttr: formAttrState,
        formDoc: formDocState
    };
    const [state, dispatch] = useReducer(reducer, initialContext);
    const handleSubmit = () => {
        updateAttrForm(state.formAttr);
    }
    return (
        <FormContext.Provider value={{state, dispatch}}>
            <TabView>
                <TabPanel header="Attributes" leftIcon="pi pi-calendar">
                    <FormAttribute onSubmit={() => handleSubmit()}/>
                </TabPanel>
                <TabPanel header=" Document " leftIcon="pi pi-file">
                    <FormDocument />
                </TabPanel>
            </TabView>
        </FormContext.Provider>
    )
}

export default connector(FormWrapper);