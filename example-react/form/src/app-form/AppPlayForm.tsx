import React from 'react';
import { useForm } from "react-hook-form";
import FormPrimeReact1 from './FormPrimeReact1';


type Inputs = {
    example: string,
    exampleRequired: string,
};

function AppPlayForm() {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => console.log(data);
    console.log(watch("example"))
    return (
        <div className="App">
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input name="example" defaultValue="test" ref={register} />

                {/* include validation with required or other standard HTML validation rules */}
                <input name="exampleRequired" ref={register({ required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form>
            <div>
                <h2>Prime React Form</h2>
                <hr/>
                <FormPrimeReact1 />
            </div>
        </div>
    );
}

export default AppPlayForm;