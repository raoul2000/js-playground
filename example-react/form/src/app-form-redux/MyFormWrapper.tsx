import React from 'react'
import { Provider } from 'react-redux';
import { store } from './store';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Fieldset } from 'primereact/fieldset';
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import MyForm from './MyForm';

const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];

const MyFormWrapper: React.FC<{}> = () => {
    //const [activeIndex, setActiveIndex] = useState(1);

    return (
        <Provider store={store}>
            <TabView>
                <TabPanel header="Attributes" leftIcon="pi pi-calendar">
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
                                    <InputTextarea id="textarea" rows={3} autoResize />
                                    <label htmlFor="textarea">comment</label>
                                </span>
                            </div>
                        </div>

                        <Accordion multiple>
                            <AccordionTab  header={<React.Fragment><i className="pi pi-calendar"></i><span> Deadlines </span></React.Fragment>}>
                                <div className="p-field p-grid">
                                    <label htmlFor="deadline1" className="p-col-fixed" style={{ minWidth: '100px' }}>main:</label>
                                    <div className="p-col">
                                        <Calendar id="icon" showTime />
                                    </div>
                                </div>
                                <div className="p-field p-grid">
                                    <label htmlFor="deadline1" className="p-col-fixed" style={{ minWidth: '100px' }}>secondary:</label>
                                    <div className="p-col">
                                        <div className="p-inputgroup">
                                            <Calendar id="deadline2" showTime />
                                            <Button icon="pi pi-lock" className="p-button-success" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-field p-grid">
                                    <label htmlFor="deadline1" className="p-col-fixed" style={{ minWidth: '100px' }}>third:</label>
                                    <div className="p-col">
                                        <div className="p-inputgroup">
                                            <Calendar id="deadline3" showTime 
                                            tooltip="modified" tooltipOptions={{position: 'bottom'}}
                                            />
                                            <Button icon="pi pi-unlock" className="p-button-danger" />
                                        </div>
                                    </div>
                                </div>
                            </AccordionTab>
                            <AccordionTab header="Briefing">
                                <div className="p-fluid">
                                    <div className="p-field">
                                        <InputTextarea id="briefing" rows={3} autoResize placeholder="enter breifing ..." />
                                    </div>
                                </div>
                            </AccordionTab>
                            <AccordionTab header="Header III">
                                Content III
                    </AccordionTab>
                        </Accordion>


                        <Fieldset legend="Header" toggleable>
                            <div className="p-fluid">
                                <div className="p-field">
                                    <InputTextarea id="briefing" rows={3} autoResize placeholder="enter breifing ..." />
                                </div>
                            </div>
                        </Fieldset>
                    </form>

                </TabPanel>
                <TabPanel header=" Document " leftIcon="pi pi-file">

                </TabPanel>
            </TabView>

        </Provider>
    )
}
// <MyForm />
export default MyFormWrapper;
