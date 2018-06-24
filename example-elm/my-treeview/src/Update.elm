module Update exposing (update)

import Model exposing (..)
import Model.Node as Node
import Model.NodeData as NodeData
import Message as Msg
import Update.Save as Save
import Port as Port
import Encode exposing (encodeTree)


update : Msg.Msg -> Model -> ( Model, Cmd Msg.Msg )
update msg model =
    case msg of
        Msg.NoOp ->
            ( model, Cmd.none )

        Msg.EncodeModel -> 
            ( model, Port.sendData (Encode.encodeTree model.tree))

        Msg.SendData ->
            ( model, Port.sendData "hello")

        Msg.EditNode node ->
            ( { model
                | editedNodeData = node.data
                , state = Model.UpdateNode
              }
            , Cmd.none
            )

        Msg.CancelEdit ->
            ( { model
                | validationErrors = []
                , state = Model.Read
              }
            , Cmd.none
            )

        Msg.SaveEdit ->
            case model.selectedNodeId of
                Just nodeId ->
                    ( if model.state == Model.CreateNode then
                        Save.createNodeAndAppend model nodeId
                      else
                        Save.updateExistingNode model nodeId
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
            if model.state == Model.Read then
                ( { model | selectedNodeId = Just selectedNode.id }, Cmd.none )
            else
                ( model, Cmd.none )

        {--
        open the node edit form so the user may enter info for the node to add as child
        of the current selected node (the future parent)
        --}
        Msg.AddChildNodeToSelectedNode ->
            case model.selectedNodeId of
                Just nodeId ->
                    ( { model
                        | editedNodeData = NodeData.createDefaultNodeData
                        , state = Model.CreateNode
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
        WARNING : Delete selected node and all its descendants.
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
        {--| Expand/collapse a single node in the tree view
        --}

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
