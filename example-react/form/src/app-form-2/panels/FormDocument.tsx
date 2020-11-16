import React, { useEffect, useState, useContext } from 'react';
import FormContext from '../FormContext';

import { Button } from 'primereact/button';
import TextField from './components/TextField';
import DateField from './components/DateField';
import { FormDocState } from '../store/form-doc/types';

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
        
        if( fieldName === 'birthday') {
            // this is not working ! 
            // the value of the calendar is modified but the input text that displays the date is
            // not updated (only the calendar layer is updated)
            const dateFieldNames:Array<keyof FormDocState> = [ 'meetingDate', 'deadline'];
            dateFieldNames.forEach( (dateFieldName) => {
                if( (context.formDoc[dateFieldName] as Date) == context.formDoc.birthday) {
                    dispatchContext({
                        type: "ACTION_UPDATE_FORM_DOC_FIELD",
                        payload: {
                            fieldName: dateFieldName,
                            value
                        }
                    });        
                }
            });
            dispatchContext({
                type: "ACTION_UPDATE_FORM_DOC_FIELD",
                payload: {
                    fieldName,
                    value
                }
            });
        } else {
            dispatchContext({
                type: "ACTION_UPDATE_FORM_DOC_FIELD",
                payload: {
                    fieldName,
                    value
                }
            });
        }
    }
    console.log(context.formDoc);
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
                value={context.formDoc.birthday}
                onChange={handleChange}            
            />
            <DateField 
                name="meetingDate"
                label="Meeting Date"
                value={context.formDoc.meetingDate}
                onChange={handleChange}            
            />
            <DateField 
                name="deadline"
                label="Deadline"
                value={context.formDoc.deadline}
                onChange={handleChange}            
            />
            <Button type="button" onClick={handleSave}>Save</Button>
        </form>
    )
}

export default FormDocument;