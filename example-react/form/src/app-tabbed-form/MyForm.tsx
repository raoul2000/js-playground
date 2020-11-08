import React, { useEffect, useReducer, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import TabInfo from './TabInfo';

import 'primeflex/primeflex.css';

type FormAttributeData = {
    firstname?: string
}
type FormAssignementData = {
    comment?: string
}
type FormData = {
    attribute?: FormAttributeData
    assignement?: FormAssignementData
    info: string
}
type Action =
    | { type: 'CHANGE_FIRSTNAME', firstname: string }
    | { type: 'CHANGE_COMMENT', comment: string }
    | { type: 'CHANGE_INFO', info: string };

export const reducer = (state: FormData, action: Action): FormData => {
    switch (action.type) {
        case "CHANGE_FIRSTNAME":
            return {
                ...state,
                attribute: {
                    ...state.attribute,
                    firstname: action.firstname
                }
            }
        case 'CHANGE_COMMENT':
            return {
                ...state,
                assignement: {
                    ...state.assignement,
                    comment: action.comment
                }
            }
        case 'CHANGE_INFO':
            return {
                ...state,
                info: action.info
            }
        default:
            throw new Error('invalid action');
    }
}
console.log('run');

const MyForm: React.FC<{}> = () => {
    const [formData, dispatch] = useReducer(reducer, {
        attribute: {
            firstname: ''
        },
        info: ''
    });

    const handleChangeFirstname = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: "CHANGE_FIRSTNAME", firstname: event.currentTarget.value });
    }
    const handleChangeInfo = (info:string) => {
        dispatch({ type: "CHANGE_INFO", info});
    }

    const handleChangeComment = (event: React.FormEvent<HTMLTextAreaElement>) => {
        dispatch({ type: "CHANGE_COMMENT", comment: event.currentTarget.value });
    }
    return (
        <div className="card">
            <TabView>
                <TabPanel header="Attributes">
                    <div className="p-field p-grid">
                        <label htmlFor="firstname" className="p-col-fixed" style={{ width: '100px' }}>Firstname</label>
                        <div className="p-col">
                            <InputText
                                id="firstname"
                                type="text"
                                value={formData.attribute?.firstname}
                                onChange={(e) => handleChangeFirstname(e)}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Assignement">
                    <div className="p-field p-grid" style={{ padding: '20px' }}>
                        <span className="p-float-label"  >
                            <InputTextarea
                                id="comment"
                                rows={3}
                                autoResize
                                value={formData.assignement?.comment}
                                onChange={(e) => handleChangeComment(e)}
                            />
                            <label htmlFor="comment">Your comment</label>
                        </span>
                    </div>
                </TabPanel>
                <TabPanel header="Info">
                    <TabInfo 
                        onChange={handleChangeInfo}
                        value={formData.info}
                    />
                </TabPanel>
            </TabView>
        </div>
    )
}
export default MyForm;