import React, { useEffect, useState,useContext } from 'react';
import FormContext from '../FormContext';

import { Button } from 'primereact/button';
import TextField from './components/TextField';



// Component definition --------------------- 
type Props = {
    onSaveForm: () => void
}
const FormAttribute: React.FC<Props> = ({onSaveForm}):JSX.Element=> {
    const { context, dispatchContext } = useContext(FormContext);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const handleSave = () => {
        console.log(context.formAttr);
        onSaveForm();
    }
    const handleChange = (fieldName: string, value: any) => {
        dispatchContext({
            type:"ACTION_UPDATE_FORM_ATTR_FIELD", 
            payload: { 
                fieldName,
                value
            }}
        );
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField 
                name="firstname"
                label="First Name"
                initialValue={context.formAttr.firstname || ''}
                onBlur={handleChange}
                />
            <TextField 
                name="lastname"
                label="Last Name"
                initialValue={context.formAttr.lastname || ''}
                onBlur={handleChange}
            />
            <Button type="button" onClick={handleSave}>Save</Button>
        </form>
    )
}

export default FormAttribute;
