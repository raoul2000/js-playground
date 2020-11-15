import React, { useEffect, useState,useContext } from 'react';
import FormContext from '../FormContext';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


// Component definition --------------------- 
type Props = {
    onSubmit: () => void
}
const FormAttribute: React.FC<Props> = ({onSubmit}):JSX.Element=> {
    const { state, dispatch } = useContext(FormContext);
    const [firstname, setFirstname] = useState<string>(state.formAttr.firstname || '');

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(state.formAttr);
        onSubmit();
    }
    //const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    const handleChange = () => {
        dispatch({
            type:"ACTION_UPDATE_FORM_ATTR", 
            payload: { ...state.formAttr, firstname}}
        );
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="p-fluid">
                <div className="p-field p-grid">
                    <label htmlFor="firstname" className="p-col-fixed" style={{ minWidth: '100px' }}>First Name:</label>
                    <div className="p-col">
                        <InputText 
                            id="firstname" 
                            name="firstname"
                            value={firstname}
                            type="text" 
                            autoComplete="off"
                            onChange={(e) => setFirstname(e.currentTarget.value)}
                            onBlur={() => handleChange()}
                        />
                    </div>
                </div>
            </div>
            <Button>Save</Button>
        </form>
    )
}

export default FormAttribute;
