import React, { useRef, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import ModalAddItem from './ModalAddItem';

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
const allowCreateItem = true;

const ManagedListAutoComplete: React.FC<{}> = () => {
    const toast = useRef<Toast>(null);
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

    const showSuccess = () => {
        if (toast.current !== null) {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
        }
    }
    const showWarn = (detail:string) => {
        if (toast.current !== null) {
            toast.current.show({ severity: 'warn', detail , life: 3000 });
        }
    }
    const addPerson = (data: Person | string) => {
        // TODO: avoid duplicate
        console.log(data);

        if (!data) {
            return;
        }
        if (typeof data === 'object') {
            if (values.find(v => v.name === data.name)) {
                showWarn(`${data.name} is already in the list`);
            } else {
                setValues([data, ...values])
            }
            setSelectedOption(undefined)
        } else if (typeof data === 'string' && allowCreateItem) {
            // user is about to create a new option and add it to the value list
            setNewOption({
                name: data,
                email: ''
            });
            setModalVisible(true);
        }
    }
    const searchOption = (event: { originalEvent: Event, query: string }) => {
        setTimeout(() => {
            let filteredOptions;
            if (!event.query.trim().length) {
                filteredOptions = [...allPersons];
            } else {
                filteredOptions = allPersons.filter((person) =>
                    person.name.toLowerCase().includes(
                        event.query.toLocaleLowerCase()
                    )
                );
            }
            setFilteredOptions(filteredOptions);
        }, 100);
    }

    const removeItemFromList = (e: React.MouseEvent, rowData: Person) => {
        e.stopPropagation();
        setValues(
            values.filter(item => item.name !== rowData.name)
        );
    }
    const isAddButtonDisabled = () => {
        if ((typeof selectedOption === 'string' && allowCreateItem)
            || (typeof selectedOption === 'object')) {
            return false;
        }
        return true;
    }

    /**
     * User has confirmed item creation
     * @param item the new item 
     */
    const handleItemSubmit = (item: Person) => {
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

    const renderListItem = (value: Person) => (
        <div className="p-field p-grid list-item" key={value.name}>
            <div className="p-col-10" >
                <div className="item-title">
                    {value.name}
                </div>
                <div className="item-info-line">
                    {value.email}
                </div>
            </div>
            <div className="p-col-2" >
                <Button
                    icon="pi pi-trash"
                    type="button"
                    className="p-button-rounded p-button-outlined p-button-secondary"
                    onClick={(e) => removeItemFromList(e, value)}
                />
            </div>
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
                    <Button label="Add" type="button" icon="pi pi-check" onClick={() => selectedOption && addPerson(selectedOption)} disabled={isAddButtonDisabled()} />
                </div>
            </div>
            <div className="list-item-wrapper">
                {values.length !== 0
                    ? values.map((value) => renderListItem(value))
                    : <div>no item selected</div>
                }
            </div>

            {
                allowCreateItem &&
                <ModalAddItem
                    visible={modalVisible}
                    onSubmit={(item) => handleItemSubmit(item)}
                    onCancel={() => handleCancelItem()}
                    item={newOption}
                />
            }
            <Toast ref={toast} />
        </>
    )
}

export default ManagedListAutoComplete