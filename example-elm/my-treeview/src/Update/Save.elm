module Update.Save exposing (..)

import Model exposing (..)
import Model.Node as Node
import Validation exposing (..)


{--
Updates the data of the selected node with the data entered in the form, only if
they are valid. Returns the updated model
--}


updateExistingNode : Model -> Node.NodeId -> Model
updateExistingNode model selectedNodeId =
    let
        validationErrors =
            Validation.validateNodeForm model.editedNodeData

        isValid =
            List.isEmpty validationErrors

        updatedTree =
            if isValid then
                Node.updateNodeData selectedNodeId model.editedNodeData model.tree
            else
                model.tree

        updatedState =
            if isValid then
                Model.Read
            else
                model.state
    in
        { model
            | tree = updatedTree
            , validationErrors = validationErrors
            , state = updatedState
        }



{--
If the form is valid :
- create a new node from it and append as a child of the node with ID nodeId.
- switch to Read state
--}


createNodeAndAppend : Model -> Node.NodeId -> Model
createNodeAndAppend model parentNodeId =
    let
        validationErrors =
            Validation.validateNodeForm model.editedNodeData

        isValid =
            List.isEmpty validationErrors

        updatedModel =
            if isValid then
                let
                    newNode =
                        Node.Node (createNodeId model) model.editedNodeData.propName model.editedNodeData createDefaultNodeView (Node.Children [])
                in
                    { model
                        | tree = Node.appendChildById parentNodeId newNode model.tree
                        , maxNodeId = model.maxNodeId + 1
                        , state = Model.Read
                    }
            else
                model
    in
        updatedModel
