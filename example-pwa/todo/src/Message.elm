module Message exposing (..)

import Material

type Msg
    = None
    | AddTask
    | UpdateNewTaskName String
    | ToggleTaskComplete String
    | DeleteTask String
    | DeleteCompletedTasks
    | Mdl (Material.Msg Msg)

