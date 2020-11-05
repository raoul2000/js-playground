import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

type Inputs = {
    firstname: string
    lastname: string
    country: string
    birthday: string
    meetingDate: Date
};
const now: Date = new Date();

type OnChangeType = { originalEvent: Event, value: Date | Date[], target: { name: string, id: string, value: Date | Date[] } };
const FormPrimeReact1 = () => {
    const { register, control, handleSubmit, setValue, errors } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => console.log(data);


    const handleDateChange = (e: OnChangeType) => {
        const d: Date = Array.isArray(e.value) ? e.value[0] : e.value;
        if (d) {
            setValue('birthday', d.toUTCString());
        }
    }
    const handleInputTextChange = (e:React.FormEvent<HTMLInputElement>) => {
        const  {name, value} = e.currentTarget;
        setValue(name,value);
    }
    React.useEffect(() => {
        register('birthday', {required: true});
        register('country', {required: true});
    }, [register])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="firstname1">Firstname</label>
                    <Controller
                        as={InputText}
                        name="firstname"
                        control={control}
                        defaultValue=""
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="lastname1">Lastname</label>
                    <Controller
                        name="lastname"
                        control={control}
                        defaultValue=""
                        rules={{
                            pattern: {
                                value: /^[A-Z0-9._%+-]$/i,
                                message: "invalid email address"
                            }
                        }}                        
                        render={props =>
                            <InputText
                                name="lastname"
                                placeholder="enter lastname"
                                onBlur={ () => props.onBlur()}
                            />}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="country">Country</label>
                    <InputText 
                        name="country" 
                        onChange={handleInputTextChange}
                        />
                    {errors.country
                        && <small id="username2-help" className="p-invalid p-d-block">country  is required</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="birthday">Date</label>
                    <Calendar id="basic" name="birthday"  onChange={handleDateChange} />
                    {errors.birthday
                        && <small id="username2-help" className="p-invalid p-d-block">birthday  is required</small>}                    
                </div>

                <div className="p-field">
                    <label htmlFor="meetingDate">Meeting Date</label>
                    <Controller
                        name="meetingDate"
                        control={control}
                        rules={{ required: true }}
                        defaultValue=""
                        render={props =>
                            <Calendar
                                placeholder="enter date ..."
                                showTime
                                hourFormat="12"
                                dateFormat="dd/mm/yy"
                                onChange={e => props.onChange(e.target.value)}
                                value={props.value}
                            />
                        } // props contains: onChange, onBlur and value
                    />
                    {errors.meetingDate
                        && <small id="username2-help" className="p-invalid p-d-block">meeting date  is required</small>}
                </div>
                <Button label="Submit" type="submit" />
            </div>
        </form>
    )
}

export default FormPrimeReact1;