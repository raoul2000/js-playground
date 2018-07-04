module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)
import Model.Task as Task exposing (Task)
import Material
import Material.Scheme
import Material.Button as Button
import Material.Options as Options exposing (css)
import Material.Toggles as Toggles


type alias Model =
    { list : List Task
    , newTaskName : String
    , mdl : Material.Model
    }


type Msg
    = None
    | AddTask
    | UpdateNewTaskName String
    | ToggleTaskComplete String
    | DeleteTask String
    | DeleteCompletedTasks
    | Mdl (Material.Msg Msg)

type alias Mdl =
    Material.Model

init : ( Model, Cmd Msg )
init =
    ( { list =
            [ Task "buy milk" True
            , Task "buy bread" False
            ]
      , newTaskName = ""
      , mdl = Material.model
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
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

        -- Boilerplate: Mdl action handler.
        Mdl msg_ ->
            Material.update Mdl msg_ model            



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


view : Model -> Html Msg
view model =
    div [ appWrapperStyle ]
        [ h1 [] [ text "task list" ]
        , hr [] []
        , button [ onClick DeleteCompletedTasks ] [ text "delete completed tasks" ]
        , renderTaskList model
        , input
            [ placeholder "task name"
            , value model.newTaskName
            , onInput UpdateNewTaskName
            ]
            []
        , button [ onClick AddTask ] [ text "new task" ]
        , Button.render Mdl
            [ 0 ]
            model.mdl
            [ Options.onClick AddTask
            , css "margin" "0 24px"
            ]
            [ text "new Task" ]
        , div [] [ validateNewTask model ]
        ]
        |> Material.Scheme.top


validateNewTask : Model -> Html Msg
validateNewTask taskList =
    if taskNameAlreadyExist taskList.newTaskName taskList then
        span [] [ text "task name already exists" ]
    else
        span [] []


taskNameAlreadyExist : String -> Model -> Bool
taskNameAlreadyExist newTaskName taskList =
    not (List.length (List.filter (\task -> task.name == newTaskName) taskList.list) == 0)


renderTaskList : Model -> Html Msg
renderTaskList model =
    ul [ listStyle ]
        (List.map (renderSingleTask model) model.list)


renderSingleTask : Model -> Task -> Html Msg
renderSingleTask model task =
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
        , Toggles.switch Mdl [0] model.mdl
            [ Options.onToggle (ToggleTaskComplete task.name)
            , Toggles.ripple
            , Toggles.value task.completed
            ]
            [ text task.name ]
        , span
            [ if task.completed then
                completedStyle
              else
                uncompletedStyle
            ]
            [ text (task.name ++ " ") ]
        , button [ onClick (DeleteTask task.name) ] [ text "delete" ]
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
