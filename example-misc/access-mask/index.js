const permAdd = 65536;
const perm = 3151775;

const perms = {
    r: {
        value: 1,
        name: "read",
    },
    a: {
        value: 2,
        name: "Modify basic attributes (name, description, etc). It allows the assignment of collaborators",
    },
    x: {
        value: 4,
        name: "Modify metadata",
    },
    s: {
        value: 8,
        name: "Modify the workflow status",
    },
    c: {
        value: 16,
        name: "Modify content",
    },
    d: {
        value: 32,
        name: "Delete (or discard, when applicable)",
    },
    p: {
        value: 64,
        name: "Modify object permissions",
    },
    l: {
        value: 128,
        name: "Link the object to other objects",
    },
    y: {
        value: 256,
        name: "Modify system metadata",
    },
    w: {
        value: 286,
        name: "write",
    },
    q: {
        value: 512,
        name: "Let the object be searchable",
    },
    v: {
        value: 1024,
        name: "Hide or show an object to users",
    },
    m: {
        value: 4096,
        name: "Move object",
    },
    //The following is a list of actions that applies only to folders:
    i: {
        value: 131072, // not sure
        name: "Add objects to the folder, create a child for a EOM::CompoundStory",
    },
    e: {
        value: 524288, // not sure
        name: "Delete objects from the folder",
    },
    I: {
        value: 0, // don't know
        name: "Create subfolders, create EOM::CompoundStory objects in a folder",
    },
    E: {
        value: 524288, // not sure
        name: "Delete subfolders, delete EOM::CompoundStory objects in a folder",
    },
    L: {
        value: 1048576,
        name: "Access the contents of a folder",
    },
    t: {
        value: 2097152,
        name: "Access objects whose path include the folder, even if 'List' permission is denied",
    },
};

// rwaxysclqmLtv
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

//console.log(dec2bin(permAdd));
console.log(dec2bin(2097152));

const result = Object.entries(perms)
    .map(([c, perm]) => (3151775 & perm.value) == 0 && c)
    .filter((c) => c);

console.log(result.sort());

console.log([..."rwaxysclqmLtv"].sort());

const createPermMask = (permAsNum) =>
    Object.entries(perms)
        .map(([c, perm]) => (permAsNum & perm.value) !== 0 && c)
        .filter((c) => c)
        .sort()
        .join("");

const comparePerms = (permAsNum, permAsString) =>
    createPermMask(permAsNum) == [...permAsString].sort().join("");


console.log(comparePerms(3151775, "rwaxysclqmLtv"));
