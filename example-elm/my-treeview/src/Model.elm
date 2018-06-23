module Model exposing (..)

import Model.Node as Node
import Model.NodeData as NodeData
import Model.Tree as Tree


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


initialModel : Model
initialModel =
    { tree = createSampleTree
    , selectedNodeId = Nothing
    , maxNodeId = 5
    , state = Read
    , editedNodeData = NodeData.createDefaultNodeData
    , validationErrors = []
    }


createSampleTree : Node.Node
createSampleTree =
    Node.appendChildren (Tree.createRootNode (Just "root")) <|
        [ Node.Node "2" "child2" NodeData.createDefaultNodeData createDefaultNodeView (Node.Children [])
        , Node.Node "3" "child3" NodeData.createDefaultNodeData createDefaultNodeView (Node.Children [])
        , Node.Node "4"
            "child4"
            NodeData.createDefaultNodeData
            createDefaultNodeView
            (Node.Children
                [ Node.Node "5" "child5" NodeData.createDefaultNodeData createDefaultNodeView (Node.Children []) ]
            )
        ]


createNodeId : Model -> Node.NodeId
createNodeId model =
    "node-" ++ toString model.maxNodeId


createDefaultNodeView : NodeView
createDefaultNodeView =
    { expanded = True }


createNode : Model -> Node.Node
createNode model =
    Node.Node
        (createNodeId model)
        (toString model.maxNodeId)
        NodeData.createDefaultNodeData
        createDefaultNodeView
        (Node.Children [])
