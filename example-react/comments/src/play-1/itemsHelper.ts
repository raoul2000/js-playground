import { Person } from './Store';

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}
export const createItems = (q: number) => {
    const items: Person[] = [];
    for (let index = 0; index < q; index++) {
        const id = getRandomInt(3000);
        items.push({
            id: `id-${id}`,
            name: `name-${id}`,
            age: id,
            modified: new Date()
        })
    }
    return items;
}

export const createItem = () => {
    const id = getRandomInt(3000);
    return {
        id: `id-${id}`,
        name: `name-${id}`,
        age: id,
        modified: new Date()
    };
}