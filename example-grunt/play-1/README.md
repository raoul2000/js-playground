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

## creating ansible playbook

Empty folder creation tasks (with the `file` task) **must go first**
because this is the only way to ensure empty folders gets created.

```yaml
- name: 'create empty folder : config/empty-dir1/dir2'                    
  file:                                                              
    path: '/path/{{ansible_user}}/mnt/tmp/config/empty-dir1/dir2'
    state: directory                                                 
    recurse: 'yes'    
  ```  
Then we have 2 options : process each items or copy the complete tree structure

### Copy each items

Copy each file individually and optionally, set its **mode**
```yaml
- name: copy config/config.bash
  copy:
    src: ../archive/config/config.bash
    dest: '/amypath/{{ansible_user}}/mnt/tmp/config/config.bash'
    backup: 'yes'
    mode: 'u=rwx,g=rx,o=rx'
```

### Copy folder

Copy the `archive` folder and all its children recursively (but skip empty folders).

```yaml
- name: copy archive                            
  copy:                                         
    src: ../archive/                            
    dest: '/path/{{ansible_user}}/mnt/tmp/'  
    backup: 'yes'  
```

This will correctly handle backup, but specific mode must be changed manually in following tasks.

## added bar task

Select env, role and int to copy.

```
grunt mycopy:dev
grunt mycopy:dev:editorial
grunt mycopy:dev:editorial,archive
grunt mycopy:dev:*:project-A,project-B
```
