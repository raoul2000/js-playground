import React, { useEffect } from 'react';
import { Person, useItemStore } from './Store';
import { createItems } from './itemsHelper';
import { Actions } from './Actions';
import Item  from './Item';

export const Play1: React.FC<{}> = (): JSX.Element => {
    const [items, setItems, deleteItem, addItem] = useItemStore(state => [state.items, state.setItems, state.deleteItem, state.addItem]);

    useEffect(() => {
        setItems(createItems(3));
    }, []);

    const handleDeleteItem = (itemId:string) => deleteItem(itemId);
    const handleEditItem = (itemId:string) => {

    };
    const handleAddItem = (item:Person) => addItem(item);
    return (
        <div>
            <ol>
                {
                    items.map(item => (
                        <div key={item.id}>
                            <Item item={item} onDelete={handleDeleteItem}/>
                        </div>
                    ))
                }
            </ol>
            <hr />
            <Actions onAddItem={handleAddItem}/>
        </div>
    );
}