
## Copying

copy all files for the DEV environment
```
> grunt mcopy:dev
```

copy all Archive integrations for the DEV environment
```
grunt mcopy:dev:archive
```

copy all Archive and editorial integrations for the DEV environment
```
grunt mcopy:dev:archive,editorial
```

copy file for integrations 'project-A', for all roles and for the DEV environment
```
grunt mcopy:dev:*:project-A
```

copy files for integration 'project-A' and 'project-B', for roles 'editorial'
and 'archive', and for the PROD environment
```
grunt mcopy:prod:archive,editorial:project-A,project-B
```

## Mapping

A Map is defined as a json file having the following structure :

```json
{
  "archive" : {
    "conf/file.xml" : "configuration/file.xml",
    "conf/another-file.xml" : "configuration/another-file.xml"
  },
  "editorial" : {
    "folder/file.txt" : "folder/file-alternate.json"
  }
}
```

### Project/roles map

Copy all files for DEV environment applying a file path convertion based on the mapping
file located in `[project]/server/[role]/map-my-map.json` if exists.

```
grunt mcopy:dev --map=my-map
```

### Global map

Copy all files for DEV environment applying a file path convertion based on the mapping
file located in `[grunt file folder]/common/my-map.js`. The mapping is applied for all
projects/roles.

```
grunt mcopy:dev --map=./common/my-map.js
```
