import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

type Person = {
    name: string
    email: string
}

const allPersons: Person[] = [
    { name: 'jean patrick Dubuisson', email: 'bob@email.com' },
    { name: 'alice Verrault-Perrot', email: 'alice@email.com' },
    { name: 'charles Martinaux', email: 'charles@email.com' },
    { name: 'David Peter Jackson', email: 'David@email.com' },
    { name: 'Bernardo Sourdimudo', email: 'David@email.com' },
    { name: 'Eric Lemaître', email: 'David@email.com' },
    { name: 'Louise Maris Franchouille', email: 'David@email.com' },
    { name: 'Tom Novembre', email: 'David@email.com' }
]

const ManagedListAutoComplete: React.FC<{}> = () => {

    // options for the dropdown 
    const [filteredOptions, setFilteredOptions] = useState<Person[]>(allPersons);
    // the current dropdown selected option
    const [selectedOption, setSelectedOption] = useState<Person>();
    // Data list values
    const [values, setValues] = useState<Person[]>([]);
    // modal state
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // new option creation
    const [newOption, setNewOption] = useState<Person>({name:'', email:''});

    const addPerson_old = () => {
        // TODO: avoid duplicate
        console.log(selectedOption);
        if (!selectedOption) {
            return;
        }
        if (typeof selectedOption === 'object') {
            setValues([selectedOption, ...values])
            setSelectedOption(undefined)
        } else if (typeof selectedOption === 'string') {
            // user is about to create a new option and add it to the value list
            setNewOption({
                name: selectedOption,
                email: ''
            });
            setModalVisible(true);
        }
    }
    const addPerson = (data: Person | string) => {
        // TODO: avoid duplicate
        console.log(data);
        if (!data) {
            return;
        }
        if (typeof data === 'object') {
            setValues([data, ...values])
            setSelectedOption(undefined)
        } else if (typeof data === 'string') {
            // user is about to create a new option and add it to the value list
            setNewOption({
                name: data,
                email: ''
            });
            setModalVisible(true);
        }
    }
    const removeItemFromList = (e: React.MouseEvent, rowData: Person) => {
        e.stopPropagation();
        setValues(
            values.filter(item => item.name !== rowData.name)
        );
    }
    const itemTemplate = (rowData: Person) => (
        <>
            {rowData.name} - {rowData.email}
        </>
    )

    const actionBodyTemplate = (rowData: Person) => (
        <Button
            icon="pi pi-trash"
            type="button"
            className="p-button-rounded p-button-outlined p-button-secondary"
            onClick={(e) => removeItemFromList(e, rowData)}
        />
    )
    const searchOption = (event: { originalEvent: Event, query: string }) => {
        setTimeout(() => {
            let filteredOptions;
            if (!event.query.trim().length) {
                filteredOptions = [...allPersons];
            }
            else {
                filteredOptions = allPersons.filter((person) => {
                    return person.name.toLowerCase().includes(
                        event.query.toLocaleLowerCase()
                    )
                    //return person.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredOptions(filteredOptions);
        }, 100);
    }
    const cancelAdd = () => {
        setModalVisible(false);
        setSelectedOption(undefined);
    }
    const submitNewOption = () => {
        // validation
        // TODO: validate form
        // save
        addPerson(newOption);
        setModalVisible(false)
    }
    const renderFooter = () => (
        <div>
            <Button label="Cancel" type="button" icon="pi pi-times" onClick={() => cancelAdd()} className="p-button-text" />
            <Button label="Save" type="button" icon="pi pi-check" onClick={() => submitNewOption() } autoFocus />
        </div>
    )
    return (
        <>
            <div className="p-field p-grid">
                <div className="p-col" style={{ minWidth: '250px' }}>
                    <AutoComplete
                        value={selectedOption}
                        suggestions={filteredOptions}
                        completeMethod={searchOption}
                        field="name"
                        dropdown
                        onChange={(e) => setSelectedOption(e.value)}
                        onKeyPress={(e: KeyboardEvent) => {
                            if (e.key === 'Enter' && selectedOption) {
                                addPerson(selectedOption);
                            }
                        }}
                    />
                </div>
                <div className="p-col-fixed" style={{ width: '100px' }}>
                    <Button label="Add" type="button" icon="pi pi-check" onClick={ () => selectedOption &&  addPerson(selectedOption)} disabled={!selectedOption} />
                </div>
            </div>
            <div className="p-field p-grid">
                <div className="p-col" >
                    <DataTable value={values} scrollable scrollHeight="200px">
                        <Column field="name" body={itemTemplate} header={`${values.length} person(s) selected`}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>

            <Dialog
                header="New Item"
                visible={modalVisible}
                style={{ width: '60vw' }}
                footer={renderFooter()}
                onHide={() => cancelAdd()}
                position="right"
            >
                <div className="p-fluid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputText id="name" 
                                disabled
                                type="text" value={newOption?.name}
                            />
                            <label htmlFor="inputgroup">name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputText 
                                id="email" 
                                type="text"  
                                value={newOption?.email}
                                onChange={ (e) => setNewOption({
                                    ...newOption,
                                    email: e.currentTarget.value
                                })}
                                autoComplete="off"
                            />
                            <label htmlFor="inputgroup">email</label>
                        </span>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ManagedListAutoComplete