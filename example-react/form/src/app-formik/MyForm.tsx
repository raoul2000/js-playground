import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import 'primeflex/primeflex.css';

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

const now: Date = new Date();
const validate = (values: Inputs): ValidationError => {
    const errors: ValidationError = {};
    if (!values.firstname1 && values.firstname1?.length === 0) {
        errors.firstname1 = 'firstname is required';
    }
    if (!values.birthday) {
        errors.birthday = 'birthday is required';
    } else if (values.birthday.getDay() === now.getDay()) {
        errors.birthday = 'today is not ok';
    } else if(values.city === 'LDN') {
        errors.city = 'london is too cold';
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
/**
 * The problem is that for Dropdown component, the Event fire onBlur does not
 * contain the name of the form field (here 'city') and formik is lost. The Validation on blur
 * doesn't work for this field (and probably others)
 */
const MyForm = () => {
    const initialValues: Inputs = {
        firstname1: '',
        birthday: now
    }
    const handleSubmit = (values: Inputs) => console.log(values);

    const formik = useFormik({
        initialValues: {
            firstname1: '',
            birthday: now,
            city: 'NY'
        },
        validate,
        onSubmit: values => {
            console.log(values);
        },
    });
    const handleBlur = (e:Event) => {
        console.log(e);
    }
    return (

        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid p-grid p-formgrid">
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="firstname1">Firstname</label>
                        <InputText
                            id="firstname1"
                            type="text"
                            {...formik.getFieldProps('firstname1')}
                            autoComplete="off"
                        />
                        {formik.touched.firstname1 && formik.errors.firstname1 ? <div>{formik.errors.firstname1}</div> : null}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                        />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="basic">Basic</label>
                        <Calendar
                            id="birthday"
                            name="birthday"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.birthday}
                        />
                        {formik.touched.birthday && formik.errors.birthday ? <div>{formik.errors.birthday}</div> : null}
                    </div>
                </div>
                <Button label="Submit" type="Submit" />
            </div>
        </form>

    )
}

export default MyForm;