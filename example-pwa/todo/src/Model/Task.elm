module Model.Task exposing (Task, Model)

import Material


type alias Task =
    { name : String, completed : Bool }


type alias Model =
    { list : List Task
    , newTaskName : String
    , mdl : Material.Model
    }
