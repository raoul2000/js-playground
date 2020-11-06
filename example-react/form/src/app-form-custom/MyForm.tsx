import React, { useReducer } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import 'primeflex/primeflex.css';
import { isParameter } from 'typescript';

type Inputs = {
    firstname1?: string
    lastname1?: string
    birthday?: Date
    city?: string;
};
type ValidationError = {
    firstname1?: string
    lastname1?: string
    birthday?: string
    city?: string;
};
type OnChangeEvent = {
    name:string
    value:any
}
const now: Date = new Date();
const initialValues: Inputs = {
    firstname1: '',
    birthday: now
}
const validate = (values: Inputs): ValidationError => {
    const errors: ValidationError = {};
    if (!values.firstname1 && values.firstname1?.length === 0) {
        errors.firstname1 = 'firstname is required';
    }
    if (!values.birthday) {
        errors.birthday = 'birthday is required';
    } else if (values.birthday.getDay() === now.getDay()) {
        errors.birthday = 'today is not ok';
    }
    return errors;
}
const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];
const formReducer = (state: Inputs, event:OnChangeEvent) => {
    return {
        ...state,
        [event.name]: event.value
    }
}
const MyForm = () => {
    const [formData, setFormData] = useReducer(formReducer, initialValues);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    }
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            name: event.currentTarget.name,
            value: event.currentTarget.value,
        });
    }
    const handleDropdownChange =  (e: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void => {
        setFormData({
            name: e.target.name,
            value:e.value
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-fluid p-grid p-formgrid">
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="firstname1">Firstname</label>
                        <InputText
                            id="firstname1"
                            name="firstname1"
                            type="text"
                            autoComplete="off"
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="lastname1">Lastname</label>
                        <InputText id="lastname1" type="text" autoComplete="off" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="city">City</label>
                        <Dropdown
                            id="city"
                            name="city"
                            options={cities}
                            optionLabel="name"
                            placeholder="Select a City"
                            onChange={handleDropdownChange}
                            value={formData.city}
                            
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="basic">Basic</label>
                        <Calendar
                            id="birthday"
                            name="birthday"
                            onChange={handleDropdownChange}
                            value={formData.birthday}
                        />
                    </div>
                </div>
                <Button label="Submit" type="Submit" />
            </div>
        </form>
    )
}

export default MyForm;