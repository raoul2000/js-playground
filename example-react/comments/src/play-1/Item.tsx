import React, { useState } from 'react';
import { Person, useItemStore, useUiStore } from './Store';

type Props = {
    item: Person,
    onDelete: (id: string) => void
};
const count: Record<string, number> = {};
const Item: React.FC<Props> = ({ item, onDelete }): JSX.Element => {

    /*   if (!count[item.id]) {
          count[item.id] = 0;
      }
      count[item.id]++;
      console.log(`item Id : ${item.id} - count = ${count[item.id]}`);
      console.log(count); */

    const [value, setValue] = useState<string>('');
    const [deleteItem, updateItem] = useItemStore(state => [state.deleteItem, state.updateItem]);
    const [editItem, editedItemId] = useUiStore(state => [state.editItem, state.editedItemId]);

    const handleDeleteItem = (itemId: string) => deleteItem(itemId);
    const handleEditItem = (itemId: string) => {
        if (editedItemId === item.id) {
            editItem(item.id, false);
            updateItem({
                ...item,
                name: value,
                modified: new Date()
            });
        } else {
            setValue(item.name);
            editItem(item.id, true);
        }
    };

    return (
        <>
            {
                editedItemId === item.id
                &&
                <div>
                    <strong>editing</strong>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            }
            <div>{item.id}</div>
            <div>name : {item.name}</div>
            <div>{item.modified.toLocaleString()}</div>
            {
                (editedItemId === '' || editedItemId === item.id)
                &&
                <>
                    <button onClick={(e) => handleEditItem(item.id)}>
                        {editedItemId === item.id ? 'Save' : 'edit'}
                    </button>
                    <button onClick={(e) => handleDeleteItem(item.id)}>
                        delete
                </button>
                </>
            }
        </>
    );
};
/* export default React.memo(Item, (prev, next) => {
    const bresult = prev.item.name === next.item.name;
    console.log(bresult);
    return bresult;
}); */
export default Item;