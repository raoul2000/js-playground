module Main exposing (..)

import Html exposing (..)
import Model exposing (..)
import Message exposing (..)
import View exposing (..)


{--
Some doc here
--}


init : ( Model, Cmd Msg )
init =
    ( { tree = createSampleTree
      , selectedNodeId = Nothing
      , maxNodeId = 5
      , viewMode = True
      , editedNodeData = Model.createDefaultNodeData
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        EditNode node ->
            ( { model
                | viewMode = False
                , editedNodeData = node.data
              }
            , Cmd.none
            )

        CancelEdit ->
            ( { model
                | viewMode = True
              }
            , Cmd.none
            )

        SaveEdit ->
            case model.selectedNodeId of
                Just nodeId ->
                    ( { model
                        | tree = updateNodeData nodeId model.editedNodeData model.tree
                        , viewMode = True
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        InputPropertyName propertyNameValue ->
            let
                oldNodeData =
                    model.editedNodeData

                newNodeData =
                    { oldNodeData | propName = propertyNameValue }
            in
                ( { model
                    | editedNodeData = newNodeData
                  }
                , Cmd.none
                )

        InputSelector selectorValue ->
            let
                oldNodeData =
                    model.editedNodeData

                newNodeData =
                    { oldNodeData | selector = selectorValue }
            in
                ( { model
                    | editedNodeData = newNodeData
                  }
                , Cmd.none
                )

        {--
        Updates the selectedNodeId property
        --}
        NodeSelection selectedNode ->
            if model.viewMode then
                ( { model | selectedNodeId = Just selectedNode.id }, Cmd.none )
            else
                ( model, Cmd.none )

        {--
        add a node as children of the selected node. If no node is selected
        this function has no effect and returns the model unmodified
        --}
        AddChildNodeToSelectedNode ->
            case model.selectedNodeId of
                Just nodeId ->
                    let
                        newNode =
                            createNode model
                    in
                        ( { model
                            | tree = appendChildById nodeId newNode model.tree
                            , selectedNodeId = Just newNode.id
                            , maxNodeId = model.maxNodeId + 1
                          }
                        , Cmd.none
                        )

                Nothing ->
                    ( model, Cmd.none )

        DeselectAllNodes ->
            ( { model | selectedNodeId = Nothing }
            , Cmd.none
            )

        {--
        Delete selected node and all its descendants.
        --}
        DeleteSelectedNode ->
            case model.selectedNodeId of
                Just nodeId ->
                    ( { model
                        | tree = deleteNodeById nodeId model.tree
                        , selectedNodeId = Nothing
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        ToggleNodeView node ->
            ( { model
                | tree = updateNodeView node.id node.view model.tree
              }
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
