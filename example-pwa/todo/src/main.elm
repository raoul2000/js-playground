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


view : Model -> Html Msg
view model =
    Layout.render Mdl
        model.mdl
        [ Layout.fixedHeader
        ]
        { header = [ h4 [] [ text "Stuff To Do !" ] ]
        , drawer = []
        , tabs = ( [], [] )
        , main =
            [ div []
                [ button [ onClick DeleteCompletedTasks ] [ text "delete completed tasks" ]
                , renderNewTaskForm model
                , renderTaskList model
                ]
            ]
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
