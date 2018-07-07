module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (onInput, onClick)
import Model.Task as Task exposing (Task, Model)
import View.Task exposing (..)
import Message exposing (Msg(..))
import Material
import Material.Scheme
import Material.List as Lists
import Material.Layout as Layout
import Material.Grid exposing (..)
import Material.Button as Button
import Material.Options as Options


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
                    | list = [ Task model.newTaskName False ] ++ model.list
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


mainGrid : Model -> Html Msg
mainGrid model =
    grid []
        [ cell [ size All 12 ]
            [ renderNewTaskForm model ]
        , cell [ size All 12 ]
            [ Button.render Mdl
                [ 0 ]
                model.mdl
                [ Options.onClick DeleteCompletedTasks
                , Options.css "margin" "0 24px"
                ]
                [ text "delete completed tasks" ]
            ]
        , cell [ size All 12 ]
            [ renderTaskList model
            ]
        ]


headerGrid : Model -> Html Msg
headerGrid model =
    grid []
        [ cell [ size All 12 ]
            [ h4 [] [ text "Stuff To Do !" ] ]
        ]


view : Model -> Html Msg
view model =
    Layout.render Mdl
        model.mdl
        [ Layout.fixedHeader
        ]
        { header = [ headerGrid model ]
        , drawer = []
        , tabs = ( [], [] )
        , main = [ mainGrid model ]
        }
        |> Material.Scheme.top


renderTaskList : Model -> Html Msg
renderTaskList model =
    Lists.ul []
        (List.indexedMap (\index item -> renderSingleTask index model item) model.list)


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
