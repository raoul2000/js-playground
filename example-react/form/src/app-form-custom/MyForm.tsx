import React, { useEffect, useReducer, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import 'primeflex/primeflex.css';


type Inputs = {
    firstname1?: string
    lastname1?: string
    birthday?: Date
    city?: {
        code: string
        name: string
    };
};
type ValidationError = {
    firstname1?: string
    lastname1?: string
    birthday?: string
    city?: string;
};

type FieldTouched = {
    firstname1?: boolean
    lastname1?: boolean
    birthday?: boolean
    city?: boolean;
};
type OnChangeEvent = {
    name: string
    value: any
}
type PrimeReactEvent = {
    originalEvent: Event
    value: any
    checked: boolean
    target: {
        name: string
        id: string
        value: any
    }
}
const now: Date = new Date();
const initialValues: Inputs = {
    firstname1: 'hello',
    birthday: now
}
const validate = (values: Inputs): ValidationError => {
    const errors: ValidationError = {};
    if( values.city?.code === 'LDN') {
        errors.city = 'london is too cold';
    }
    if (!values.firstname1) {
        errors.firstname1 = 'firstname is required';
    }
    if (!values.lastname1) {
        errors.lastname1 = 'lastname is required';
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
const formReducer = (state: Inputs, event: OnChangeEvent) => {
    return {
        ...state,
        [event.name]: event.value
    }
}
console.log('my form');
const MyForm = () => {
    const [formData, setFormData] = useReducer(formReducer, initialValues);
    const [errors, setErrors] = useState<ValidationError>({});
    const [touched, setTouched] = useState<FieldTouched>({});

    useEffect(() => {
        setErrors(validate(formData));
    }, [formData]);

    const markFieldAsTouched = (name: string) => {
        if (touched[name as keyof FieldTouched] !== true) {
            setTouched({
                ...touched,
                [name]: true
            });
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        console.log(touched);
    }
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        markFieldAsTouched(name);
        setFormData({
            name: event.currentTarget.name,
            value: event.currentTarget.value,
        });
    }
    const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
        const name: string = event.currentTarget.name;
        markFieldAsTouched(name);
    }

    const handleComponentChange = (e: PrimeReactEvent): void => {
        setFormData({
            name: e.target.name,
            value: e.value
        })
    }
    const handleComponentBlur = (name: string) => {
        markFieldAsTouched(name);
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
                            value={formData.firstname1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.firstname1 && errors.firstname1
                            && <div>{errors.firstname1}</div>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="lastname1">Lastname</label>
                        <InputText
                            id="lastname1"
                            name="lastname1"
                            type="text"
                            autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.lastname1 && errors.lastname1
                            && <div>{errors.lastname1}</div>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="city">City</label>
                        <Dropdown
                            id="city"
                            name="city"
                            options={cities}
                            optionLabel="name"
                            placeholder="Select a City"
                            onChange={handleComponentChange}
                            onBlur={() => handleComponentBlur('city')}
                            value={formData.city}
                        />
                        {touched.city && errors.city
                            && <div>{errors.city}</div>}                        
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="basic">Basic</label>
                        <Calendar
                            id="birthday"
                            name="birthday"
                            onChange={handleComponentChange}
                            onBlur={() => handleComponentBlur('birthday')}
                            value={formData.birthday}
                        />
                        {touched.birthday && errors.birthday
                            && <div>{errors.birthday}</div>}                          
                    </div>
                </div>
                <Button label="Submit" type="Submit" />
            </div>
        </form>
    )
}

export default MyForm;