import React, { Dispatch, useState } from 'react'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FormState, FormAction } from './store/form/types';
import { updateForm } from './store/form/actions';



const mapState = (state: FormState) => ({
    name: state.name,
    age: state.age
})
/* const mapDispatch = (dispatch:Dispatch<FormAction>) => ({
    updateForm : (data:FormState) => dispatch(updateForm(data))
}) */

const mapDispatch = {
    updateForm
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const MyForm: React.FC<Props> = (props: Props) => {

    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);

    
    const submitForm = () => {
        props.updateForm({
            name,
            age
        });
    }
    return (
        <div className="p-field p-grid">
            <label htmlFor="firstname" className="p-col-fixed" style={{ width: '100px' }}>name</label>
            <div className="p-col">
                <InputText
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
            </div>
            <label htmlFor="age" className="p-col-fixed" style={{ width: '100px' }}>age</label>
            <div className="p-col">
                <InputText
                    id="age"
                    type="text"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.currentTarget.value))}
                />
            </div>
            <Button label="Submit" type="buttom" onClick={submitForm} />
        </div>
    )
}

export default connector(MyForm);
