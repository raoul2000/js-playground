import React, { useEffect, useState, useContext } from 'react';
import FormContext from '../FormContext';

import { Button } from 'primereact/button';
import TextField from './components/TextField';
import DateField from './components/DateField';

// Component definition --------------------- 
type Props = {
    onSaveForm: () => void
}

const FormDocument: React.FC<Props> = ({ onSaveForm }): JSX.Element => {
    const { context, dispatchContext } = useContext(FormContext);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const handleSave = () => {
        console.log(context.formDoc);
        onSaveForm();
    }
    const handleChange = (fieldName: string, value: any) => {
        dispatchContext({
            type: "ACTION_UPDATE_FORM_DOC_FIELD",
            payload: {
                fieldName,
                value
            }
        });
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
                name="name"
                label="Name"
                initialValue={context.formDoc.name || ''}
                onBlur={handleChange}
            />
            <DateField 
                name="birthday"
                label="Birthday"
                initialValue={context.formDoc.birthday || new Date()}
                onBlur={handleChange}            
            />
            <Button type="button" onClick={handleSave}>Save</Button>
        </form>
    )
}

export default FormDocument;