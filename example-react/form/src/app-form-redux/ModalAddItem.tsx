import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

type Person = {
    name: string
    email: string
}

type Props = {
    visible: boolean,
    item: Person,
    onSubmit: (item: Person) => void,
    onCancel: () => void
}

const ModalAddItem: React.FC<Props> = ({ visible, item, onSubmit, onCancel }) => {

    console.log(item);
    // new option creation
    const [newOption, setNewOption] = useState<Person>(item);

    // update local state only when props change
    useEffect(() => {
        console.log('updating state');
        setNewOption({
            name: item.name,
            email: ''
        })
    }, [item.name]);


    const cancelAdd = () => {
        onCancel();
    }
    const submitNewOption = () => {
        // validation
        // TODO: validate form
        // save
        onSubmit(newOption);

    }
    const renderFooter = () => (
        <div>
            <Button label="Cancel" type="button" icon="pi pi-times" onClick={() => cancelAdd()} className="p-button-text" />
            <Button label="Save" type="button" icon="pi pi-check" onClick={() => submitNewOption()} autoFocus />
        </div>
    )
    return (
        <Dialog
            header="New Item"
            visible={visible}
            style={{ width: '60vw' }}
            footer={renderFooter()}
            onHide={() => cancelAdd()}
            position="right"
        >
            <div className="p-fluid p-grid">
                <div className="p-field p-col-12 p-md-4">
                    <label htmlFor="inputgroup">name</label>
                    <InputText id="name"
                        disabled
                        type="text" value={newOption?.name}
                    />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label htmlFor="lastname1">email</label>
                    <InputText
                        id="email"
                        type="text"
                        value={newOption?.email}
                        onChange={(e) => setNewOption({
                            ...newOption,
                            email: e.currentTarget.value
                        })}
                        autoComplete="off"
                        placeholder="enter email ..."
                    />
                </div>
            </div>
        </Dialog>
    )
}

export default ModalAddItem;