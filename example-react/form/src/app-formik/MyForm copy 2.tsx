import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import 'primeflex/primeflex.css';

type Inputs = {
    firstname1?: string
    lastname1?: string
    birthday?: Date
};
type ValidationError = {
    firstname1?: string
    lastname1?: string
    birthday?: string
};
const now: Date = new Date();
const validate = (values: Inputs): ValidationError => {
    const errors: ValidationError = {};
    //console.log(values, now);
    if (!values.firstname1 && values.firstname1?.length === 0) {
        errors.firstname1 = 'firstname is required';
    }
    if (!values.birthday) {
        errors.birthday = 'birthday is required';
    } else if (values.birthday.getDay()  === now.getDay()) {
        errors.birthday = 'today is not ok';
    }
    console.log(errors);
    return errors;
}

const MyForm = () => {
    const formik = useFormik({
        initialValues: {
            firstname1: '',
            birthday: now
        },
        validate,
        onSubmit: values => {
            console.log(values);
        },
    });
    console.log(formik.touched);
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid p-grid p-formgrid">
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="firstname1">Firstname</label>
                        <InputText
                            id="firstname1"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstname1}
                            autoComplete="off"
                        />
                        {formik.touched.firstname1 && formik.errors.firstname1 ? <div>{formik.errors.firstname1}</div> : null}
                    </div>
                    <div className="p-field">
                        <label htmlFor="lastname1">Lastname</label>
                        <InputText id="lastname1" type="text" autoComplete="off"/>
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