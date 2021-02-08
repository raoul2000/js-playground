import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type Person = {
    id: string,
    name: string;
    age: number;
    modified: Date;
};
type State1 = {
    items: Person[],
    setItems: (items: Person[]) => void,
    addItem: (item: Person) => void,
    deleteItem: (id: string) => void,
    updateItem: (item: Person) => void
};

export const useItemStore = create<State1>(devtools((set, get) => ({
    items: [],
    setItems: (items: Person[]) => set(state => ({
        ...state,
        items
    })),
    addItem: (item: Person) => {
        setTimeout(() => {
            set(state => ({
                ...state,
                items: [...state.items, item]
            }));            
        }, 1000); 
    },
    deleteItem: (id: string) => set(state => ({
        ...state,
        items: state.items.filter(item => item.id !== id)
    })),
    updateItem: (updatedItem: Person) => set(state => ({
        ...state,
        items: state.items.map(item => {
            if (item.id === updatedItem.id) {
                return updatedItem;
            } else {
                return item;
            }
        })
    })),

})));

type State2 = {
    editedItemId: string,
    editItem: (id: string, edit: boolean) => void
};

export const useUiStore = create<State2>(devtools(set => ({
    editedItemId: '',
    editItem: (id: string, edit: boolean) => set(state => ({
        ...state,
        editedItemId: edit ? id : ''
    }))
})));