import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)


type alias Task = { name : String, completed : Bool }
type alias TaskList = { list : List Task}

type Msg
  = None
  | NewTask String

init : (TaskList, Cmd Msg)
init = (
   { list = [
    Task  "buy milk"  True,
    Task "buy bread"  False
  ]}, Cmd.none)


isCompleted : Task -> Bool
isCompleted task =
  task.completed

update : Msg -> TaskList -> (TaskList, Cmd Msg)
update msg model =
  case msg of
    None ->
      (model, Cmd.none)
    NewTask name ->
      (model, Cmd.none)
--      ( { name = name, completed = False } :: model.list , Cmd.none)


view : TaskList -> Html Msg
view  taskList =
  div []
  [
    h1 [] [ text "task list"]
  ,  hr [] []
  ,  renderTaskList taskList
  ,  input [ placeholder "Text to reverse", onInput NewTask ] []
  ,  button [] [ text "new task" ]
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
