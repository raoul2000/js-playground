module Update exposing (update)

import Model exposing (..)
import Model.Node as Node
import Message as Msg
import Validation exposing (..)



update : Msg.Msg -> Model -> ( Model, Cmd Msg.Msg )
update msg model =
    case msg of
        Msg.NoOp ->
            ( model, Cmd.none )

        Msg.EditNode node ->
            ( { model
                | viewMode = False
                , editedNodeData = node.data
              }
            , Cmd.none
            )

        Msg.CancelEdit ->
            ( { model
                | viewMode = True
                , validationErrors = []
              }
            , Cmd.none
            )

        Msg.SaveEdit ->
            case model.selectedNodeId of
                Just nodeId ->
                    let
                        validationErrors =
                            Validation.validateNodeForm model.editedNodeData

                        isValid =
                            List.isEmpty validationErrors

                        updatedTree =
                            if isValid then
                                Node.updateNodeData nodeId model.editedNodeData model.tree
                            else
                                model.tree

                        updatedViewMode =
                            isValid
                    in
                        ( { model
                            | tree = updatedTree
                            , viewMode = updatedViewMode
                            , validationErrors = validationErrors
                          }
                        , Cmd.none
                        )

                Nothing ->
                    ( model, Cmd.none )

        Msg.InputPropertyName propertyNameValue ->
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

        Msg.InputAttributeName attributeNameValue ->
            let
                oldNodeData =
                    model.editedNodeData

                newNodeData =
                    { oldNodeData | attributeName = attributeNameValue }
            in
                ( { model
                    | editedNodeData = newNodeData
                  }
                , Cmd.none
                )

        Msg.InputSelector selectorValue ->
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

        Msg.ToggleIsArray ->
            let
                oldNodeData =
                    model.editedNodeData

                newNodeData =
                    { oldNodeData | isArray = not oldNodeData.isArray }
            in
                ( { model
                    | editedNodeData = newNodeData
                  }
                , Cmd.none
                )

        Msg.ChangePropertyTypeSelection Nothing ->
            ( model, Cmd.none )

        Msg.ChangePropertyTypeSelection (Just newPropertyType) ->
            let
                oldNodeData =
                    model.editedNodeData

                newNodeData =
                    { oldNodeData | propType = newPropertyType }
            in
                ( { model
                    | editedNodeData = newNodeData
                  }
                , Cmd.none
                )

        {--
        Updates the selectedNodeId property
        --}
        Msg.NodeSelection selectedNode ->
            if model.viewMode then
                ( { model | selectedNodeId = Just selectedNode.id }, Cmd.none )
            else
                ( model, Cmd.none )

        {--
        add a node as children of the selected node. If no node is selected
        this function has no effect and returns the model unmodified
        --}
        Msg.AddChildNodeToSelectedNode ->
            case model.selectedNodeId of
                Just nodeId ->
                    let
                        newNode =
                            createNode model
                    in
                        ( { model
                            | tree = Node.appendChildById nodeId newNode model.tree
                            , selectedNodeId = Just newNode.id
                            , maxNodeId = model.maxNodeId + 1
                          }
                        , Cmd.none
                        )

                Nothing ->
                    ( model, Cmd.none )

        Msg.DeselectAllNodes ->
            ( { model | selectedNodeId = Nothing }
            , Cmd.none
            )

        {--
        Delete selected node and all its descendants.
        --}
        Msg.DeleteSelectedNode ->
            case model.selectedNodeId of
                Just nodeId ->
                    ( { model
                        | tree = Node.deleteNodeById nodeId model.tree
                        , selectedNodeId = Nothing
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        Msg.ToggleNodeView node ->
            ( { model
                | tree = Node.updateNodeView node.id node.view model.tree
              }
            , Cmd.none
            )

        Msg.CollapseAllNodes collapse ->
            ( { model
                | tree = Node.collapseAllNodes collapse model.tree
              }
            , Cmd.none
            )
