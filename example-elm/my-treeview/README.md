# Overview

This is an experiment to create a tree view with basic edition feature :


## Features

- [x] tree representation in a hierarchical way
- [x] single node selection
- [x] Add Node based on single user selection - node is added as a child of the current selection
- [x] Delete Node based on single user selection
- [x] Edit data of the selected node
- [x] Cancel Data node edition (no modification)
- [x] Save Data node modifications
- [ ] folder/unfold tree node


## Commands

### Install
```
npm install
```

### Dev
Start the HTTP dev server on http://localhost:8080 :
```
npm run dev:server
```

watch for source file change and run `elm make` on change :

```
npm run dev
```


# Run

From the project main folder run :
```
elm reactor
```

Then open your favorite browser at http://localhost:8000/my-treeview.elm
