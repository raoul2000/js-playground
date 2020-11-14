import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  ModalAddItem  from './ModalAddItem';

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
    const [newOption, setNewOption] = useState<Person>({ name: '', email: '' });

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
    /**
     * User has confirmed item creation
     * @param item the new item 
     */
    const handleItemSubmit = (item:Person) => {
        addPerson(item);
        setModalVisible(false);
    }
    /**
     * User canceled the new item creation 
     */
    const handleCancelItem = () => {
        setModalVisible(false);
        setSelectedOption(undefined);
    }


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
                    <Button label="Add" type="button" icon="pi pi-check" onClick={() => selectedOption && addPerson(selectedOption)} disabled={!selectedOption} />
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
            <ModalAddItem 
                visible={modalVisible}
                onSubmit={ (item) => handleItemSubmit(item)}
                onCancel={() => handleCancelItem()}
                item={newOption}
            />
        </>
    )
}

export default ManagedListAutoComplete