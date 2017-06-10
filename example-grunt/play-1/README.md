```
grunt clean
grunt noduplicate
grunt copy:main
grunt copy:main --project="project-A project-B"
```

# Notes

- roles : for example `editorial`, `archive`, `digital`
- environments : for example `dev`, `qa`, `prod`

# 2 steps build phase

## step "Role"

For role name 'R' :
- scan project tree for files in `[PROJECT_NAME]/R/**/!(*@dev|@qa|@prod)`
- ignore files with environments extension : `@env`
- create destination filename by removing prefix `[PROJECT_NAME]`
- copy to `[BUILD]/`

## step "Environment"

for environment name 'ENV':
- scan project tree for files in `[PROJECT_NAME]/R/**/*@(ENV)`
- create destination filename by
 - removing prefix `[PROJECT_NAME]`
 - removing suffix `@env`
- copy to `[BUILD]/`
