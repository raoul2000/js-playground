import React, { useEffect, useState, useContext } from 'react';
import FormContext from '../FormContext';

import { Button } from 'primereact/button';
import TextField from './components/TextField';
import DeadlinesWidgets, { Deadlines } from './components/DeadlinesWidget';
import { FormDocState } from '../store/form-doc/types';

// Component definition --------------------- 
type Props = {
    onSaveForm: () => void
}

const FormDocumentWithWidget: React.FC<Props> = ({ onSaveForm }): JSX.Element => {
    const { context, dispatchContext } = useContext(FormContext);
    const deadlines:Deadlines = {
        date0: context.formDoc.birthday,
        date1: context.formDoc.deadline,
        date2: context.formDoc.meetingDate
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const handleSave = () => {
        console.log(context.formDoc);
        onSaveForm();
    }
    const handleDeadlinesChange = (v:Deadlines) => {
        console.log(v);

        if( v.date0?.getTime() !==  context.formDoc.birthday?.getTime()){
            dispatchContext({
                type: "ACTION_UPDATE_FORM_DOC_FIELD",
                payload: {
                    fieldName: 'birthday',
                    value: v.date0
                }
            });
        }
        if( v.date1?.getTime() !==  context.formDoc.deadline?.getTime()){
            dispatchContext({
                type: "ACTION_UPDATE_FORM_DOC_FIELD",
                payload: {
                    fieldName: 'deadline',
                    value: v.date1
                }
            });
        }
        if( v.date2?.getTime() !==  context.formDoc.meetingDate?.getTime()){
            dispatchContext({
                type: "ACTION_UPDATE_FORM_DOC_FIELD",
                payload: {
                    fieldName: 'meetingDate',
                    value: v.date2
                }
            });
        }
    }
    const handleChange = (fieldName: string, value: any) => {
        if (fieldName === 'date0') {
            // this is not working ! 
            // the value of the calendar is modified but the input text that displays the date is
            // not updated (only the calendar layer is updated)
            // see https://forum.primefaces.org/viewtopic.php?f=57&t=63900
            const dateValue: Date = (value as Date);


            if (context.formDoc.meetingDate?.getTime() === context.formDoc.birthday?.getTime()) {
                console.log(`updating meetingDate to : ${dateValue}`)
                dispatchContext({
                    type: "ACTION_UPDATE_FORM_DOC_FIELD",
                    payload: {
                        fieldName: 'meetingDate',
                        value: new Date(dateValue)
                    }
                });
            }
            if (context.formDoc.deadline?.getTime() === context.formDoc.birthday?.getTime()) {
                console.log(`updating deadline to : ${dateValue}`)
                dispatchContext({
                    type: "ACTION_UPDATE_FORM_DOC_FIELD",
                    payload: {
                        fieldName: 'deadline',
                        value: new Date(dateValue)
                    }
                });
            }
            dispatchContext({
                type: "ACTION_UPDATE_FORM_DOC_FIELD",
                payload: {
                    fieldName,
                    value: new Date(dateValue)
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
            <DeadlinesWidgets
                values={deadlines}
                onChange={(v) => handleDeadlinesChange(v)}
            />
            <Button type="button" onClick={handleSave}>Save</Button>
        </form>
    )
}

export default FormDocumentWithWidget;