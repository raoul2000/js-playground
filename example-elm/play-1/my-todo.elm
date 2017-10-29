import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)


type alias Task     = { name : String, completed : Bool }
type alias TaskList = {
  list : List Task,
  newTaskName : String
}

type Msg
  = None
  | AddTask
  | UpdateNewTaskName String

init : (TaskList, Cmd Msg)
init = (
   { list = [
        Task  "buy milk"  True,
        Task "buy bread"  False
      ]
  , newTaskName = ""}, Cmd.none)


update : Msg -> TaskList -> (TaskList, Cmd Msg)
update msg model =
  case msg of
    None ->
      (model, Cmd.none)
    UpdateNewTaskName value->
      (
        {model | newTaskName = value}
      , Cmd.none)
    AddTask ->
      (
        { model |
            list =  Task model.newTaskName False :: model.list
          , newTaskName = "" }
        , Cmd.none
      )


view : TaskList -> Html Msg
view  taskList =
  div []
  [
     h1 [] [ text "task list"]
  ,  hr [] []
  ,  renderTaskList taskList
  ,  input [ placeholder "task name"
           , value taskList.newTaskName
           , onInput UpdateNewTaskName
           ]
           []
  ,  button [ onClick AddTask ] [ text "new task" ]
  ]


renderTaskList : TaskList -> Html Msg
renderTaskList taskList =
  ul [] (
    List.map renderSingleTask taskList.list
  )

renderSingleTask : Task -> Html Msg
renderSingleTask task =
  li
    [ classList
      [
        ("completed", task.completed)
      ]
    ]
    [
      text task.name
    ]


subscriptions : TaskList -> Sub Msg
subscriptions model =
  Sub.none

main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
