import Html exposing (..)
import Array


type alias Task = { name : String, completed : Bool }
type alias TaskList = List Task

type Msg
  = None

init : (TaskList, Cmd Msg)
init = (
   [
    Task "buy milk"  False,
    Task "buy bread"  False
  ], Cmd.none)


isCompleted : Task -> Bool
isCompleted task =
  task.completed

update : Msg -> TaskList -> (TaskList, Cmd Msg)
update msg model =
  case msg of
    None ->
      (model, Cmd.none)


view : TaskList -> Html Msg
view  taskList =
  div []
  [
    h1 [] [ text "task list"]
 ,  List.map (\task -> task.name) taskList
  ]

taskView : Task -> Html Msg
taskView task =
  div [] [
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
