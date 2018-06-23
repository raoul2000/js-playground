module Model.Tree exposing (..)

import Model.Node as Node
import Model.NodeData as NodeData


isRoot : Node.Node -> Bool
isRoot node =
    node.id == "root"


rootNodeLabel : Maybe String -> String
rootNodeLabel nodeLabel =
    case nodeLabel of
        Just label ->
            label

        Nothing ->
            "root"


createRootNode : Maybe String -> Node.Node
createRootNode nodeLabel =
    Node.Node
        "root"
        (rootNodeLabel nodeLabel)
        NodeData.createDefaultNodeData
        Node.createDefaultNodeView
        (Node.Children [])
