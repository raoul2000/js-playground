module Model exposing (..)

import Model.Node as Node
import Model.NodeData as NodeData


type alias NodeView =
    { expanded : Bool }


type State
    = Read
    | UpdateNode
    | CreateNode


type alias Model =
    { tree : Node.Node
    , selectedNodeId : Maybe Node.NodeId
    , maxNodeId : Int
    , state : State
    , editedNodeData : NodeData.NodeData
    , validationErrors : List String
    }



-- CREATE //////////////////////  --


createSampleTree : Node.Node
createSampleTree =
    Node.appendChildren createTree <|
        [ Node.Node "2" "child2" createDefaultNodeData createDefaultNodeView (Node.Children [])
        , Node.Node "3" "child3" createDefaultNodeData createDefaultNodeView (Node.Children [])
        , Node.Node "4"
            "child4"
            createDefaultNodeData
            createDefaultNodeView
            (Node.Children
                [ Node.Node "5" "child5" createDefaultNodeData createDefaultNodeView (Node.Children []) ]
            )
        ]


createNodeId : Model -> Node.NodeId
createNodeId model =
    "node-" ++ toString model.maxNodeId


isRoot : Node.Node -> Bool
isRoot node =
    node.id == "node-0"


createDefaultNodeView : NodeView
createDefaultNodeView =
    { expanded = True }


createDefaultNodeData : NodeData.NodeData
createDefaultNodeData =
    { propName = "property"
    , selector = "selector"
    , propType = NodeData.RawText
    , attributeName = "attribute name"
    , isArray = False
    }


createNode : Model -> Node.Node
createNode model =
    Node.Node (createNodeId model) (toString model.maxNodeId) createDefaultNodeData createDefaultNodeView (Node.Children [])


createTree : Node.Node
createTree =
    Node.Node "root" "root node" createDefaultNodeData createDefaultNodeView (Node.Children [])
