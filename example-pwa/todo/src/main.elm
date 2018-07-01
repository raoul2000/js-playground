module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)


type alias Task =
    { name : String, completed : Bool }


type alias TaskList =
    { list : List Task
    , newTaskName : String
    }


type Msg
    = None
    | AddTask
    | UpdateNewTaskName String
    | ToggleTaskComplete String
    | DeleteTask String
    | DeleteCompletedTasks


init : ( TaskList, Cmd Msg )
init =
    ( { list =
            [ Task "buy milk" True
            , Task "buy bread" False
            ]
      , newTaskName = ""
      }
    , Cmd.none
    )


update : Msg -> TaskList -> ( TaskList, Cmd Msg )
update msg model =
    case msg of
        None ->
            ( model, Cmd.none )

        UpdateNewTaskName value ->
            ( { model
                | newTaskName = value
              }
            , Cmd.none
            )

        AddTask ->
            -- TODO : validate task name uniqueness
            ( if model.newTaskName == "" then
                model
              else if taskNameAlreadyExist model.newTaskName model then
                model
              else
                { model
                    | list = List.append model.list [ Task model.newTaskName False ]
                    , newTaskName = ""
                }
            , Cmd.none
            )

        ToggleTaskComplete taskName ->
            ( { model
                | list =
                    List.map
                        (\n ->
                            if n.name == taskName then
                                { n | completed = not n.completed }
                            else
                                n
                        )
                        model.list
              }
            , Cmd.none
            )

        DeleteTask taskName ->
            ( { model
                | list = List.filter (\task -> not (task.name == taskName)) model.list
              }
            , Cmd.none
            )

        DeleteCompletedTasks ->
            ( { model
                | list = List.filter (\task -> not task.completed) model.list
              }
            , Cmd.none
            )



-- view


appWrapperStyle : Attribute msg
appWrapperStyle =
    style
        [ ( "margin", "1em" )
        , ( "padding", "1em" )
        ]


listStyle : Attribute msg
listStyle =
    style
        [ ( "padding", "0px" ) ]


listItemStyle : Attribute msg
listItemStyle =
    style
        [ ( "list-style", "none" )
        , ( "line-height", "2em" )
        ]


completedStyle : Attribute msg
completedStyle =
    style
        [ ( "color", "#aca6a6" )
        , ( "text-decoration", "line-through" )
        ]


uncompletedStyle : Attribute msg
uncompletedStyle =
    style
        [ ( "color", "inherit" ) ]


view : TaskList -> Html Msg
view taskList =
    div [ appWrapperStyle ]
        [ h1 [] [ text "task list" ]
        , hr [] []
        , button [ onClick DeleteCompletedTasks ] [ text "delete completed tasks" ]
        , renderTaskList taskList
        , input
            [ placeholder "task name"
            , value taskList.newTaskName
            , onInput UpdateNewTaskName
            ]
            []
        , button [ onClick AddTask ] [ text "new task" ]
        , div [] [ validateNewTask taskList ]
        ]


validateNewTask : TaskList -> Html Msg
validateNewTask taskList =
    if taskNameAlreadyExist taskList.newTaskName taskList then
        span [] [ text "task name already exists" ]
    else
        span [] []


taskNameAlreadyExist : String -> TaskList -> Bool
taskNameAlreadyExist newTaskName taskList =
    not (List.length (List.filter (\task -> task.name == newTaskName) taskList.list) == 0)


renderTaskList : TaskList -> Html Msg
renderTaskList taskList =
    ul [ listStyle ]
        (List.map renderSingleTask taskList.list)


renderSingleTask : Task -> Html Msg
renderSingleTask task =
    li
        [ listItemStyle
        , classList
            [ ( "completed", task.completed )
            ]
        ]
        [ input
            [ type_ "checkbox"
            , checked task.completed
            , onClick (ToggleTaskComplete task.name)
            ]
            []
        , span
            [ if task.completed then
                completedStyle
              else
                uncompletedStyle
            ]
            [ text (task.name ++ " ") ]
        , button [ onClick (DeleteTask task.name) ] [ text "delete" ]
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
