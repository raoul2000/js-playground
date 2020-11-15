import React, { useEffect, useState,useContext } from 'react';
import FormContext from '../FormContext';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import TextField from './TextField';



// Component definition --------------------- 
type Props = {
    onSubmit: () => void
}
const FormAttribute: React.FC<Props> = ({onSubmit}):JSX.Element=> {
    const { state, dispatch } = useContext(FormContext);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(state.formAttr);
        onSubmit();
    }
    const handleChange = (fieldName: string, value: any) => {
        dispatch({
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
                initialValue={state.formAttr.firstname || ''}
                onBlur={handleChange}
            />
            <TextField 
                name="lastname"
                initialValue={state.formAttr.lastname || ''}
                onBlur={handleChange}
            />
            <Button>Save</Button>
        </form>
    )
}

export default FormAttribute;
