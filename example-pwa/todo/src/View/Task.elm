module View.Task exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model.Task as Task exposing (Task, Model)
import Message exposing (Msg(..))
import Material
import Material.Button as Button
import Material.Toggles as Toggles
import Material.Textfield as Textfield
import Material.List as Lists
import Material.Typography as Typo
import Material.Options as Options


type alias Mdl =
    Material.Model


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


renderNewTaskForm : Model -> Html Msg
renderNewTaskForm model =
    div []
        [ Textfield.render Mdl
            [ 2 ]
            model.mdl
            [ Textfield.label "Enter a New Task"
            , Textfield.floatingLabel
            , Textfield.value model.newTaskName
            , Options.onInput UpdateNewTaskName
            ]
            []
        , Button.render Mdl
            [ 0 ]
            model.mdl
            [ Options.onClick AddTask
            , Options.css "margin" "0 24px"
            ]
            [ text "Add" ]
        , div [] [ validateNewTask model ]
        ]


renderSingleTask : Int -> Model -> Task -> Html Msg
renderSingleTask index model task =
    Lists.li
        []
        [ Lists.content []
            [ Lists.avatarIcon "turned_in" []
            , span
                [ if task.completed then
                    completedStyle
                  else
                    uncompletedStyle
                ]
                [ Options.styled p
                    [ Typo.headline ]
                    [ text task.name ]
                ]
            ]
        , Lists.content2 []
            [ Toggles.switch Mdl
                [ index ]
                model.mdl
                [ Options.onToggle (ToggleTaskComplete task.name)
                , Toggles.ripple
                , Toggles.value (not task.completed)
                ]
                []
            ]
        ]


validateNewTask : Model -> Html Msg
validateNewTask taskList =
    if taskNameAlreadyExist taskList.newTaskName taskList then
        span [] [ text "task name already exists" ]
    else
        span [] []


taskNameAlreadyExist : String -> Model -> Bool
taskNameAlreadyExist newTaskName taskList =
    not (List.length (List.filter (\task -> task.name == newTaskName) taskList.list) == 0)
