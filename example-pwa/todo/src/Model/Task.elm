module Model.Task exposing (Task,TaskList)

type alias Task =
    { name : String, completed : Bool }


type alias TaskList =
    { list : List Task
    , newTaskName : String
    }