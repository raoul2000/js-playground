import React from 'react'
import { Provider } from 'react-redux';
import { store } from './store';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import MyForm from './MyForm';

const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];

const MyFormWrapper: React.FC<{}> = () => {

    return (
        <Provider store={store}>
            <form style={{ minWidth: '400px' }}>
                <div className="p-fluid">
                    <div className="p-field p-grid">
                        <label htmlFor="firstname4" className="p-col-fixed" style={{ minWidth: '100px' }}>Firstname:</label>
                        <div className="p-col">
                            <InputText id="firstname4" type="text" />
                        </div>
                    </div>
                    <div className="p-field p-grid">
                        <label htmlFor="lastname4" className="p-col-fixed" style={{ minWidth: '100px' }}>Lastname:</label>
                        <div className="p-col">
                            <InputText id="lastname4" type="text" />
                        </div>
                    </div>
                    <div className="p-field p-grid">
                        <label htmlFor="city" className="p-col-fixed" style={{ minWidth: '100px' }}>City:</label>
                        <div className="p-col">
                            <Dropdown options={cities} optionLabel="name" placeholder="Select a City" />
                        </div>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputTextarea id="textarea" rows={3}  autoResize />
                            <label htmlFor="textarea">comment</label>
                        </span>
                    </div>
                </div>
            </form>

        </Provider>
    )
}
// <MyForm />
export default MyFormWrapper;
