import React, { useState } from 'react';
import {Person,  useUiStore } from './Store';
import { createItem } from './itemsHelper';
import { setConstantValue } from 'typescript';

type Props = {
    onAddItem:(item:Person) => void
}
export const Actions: React.FC<Props> = ({onAddItem}): JSX.Element => {

    const [value, setValue] = useState<string>('');
    const editedItemId = useUiStore(state => state.editedItemId);

    const handleAddItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onAddItem({
            ...createItem(),
            name: value
        });
        setValue('');
    }
    return (
        <div>
            <input 
                value={value}
                onChange={(e) => setValue(e.target.value) }
            />
            <button
                onClick={handleAddItem}
                disabled={editedItemId !== ''}
            >add item</button>
        </div>
    );
}