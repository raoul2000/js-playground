module Model exposing (..)


type alias NodeId =
    String


type Children
    = Children (List Node)


type alias NodeData =
    { propName : String
    , selector : String
    , propType : String
    }


type alias Node =
    { id : NodeId
    , name : String
    , data : NodeData
    , children : Children
    }


type alias Model =
    { tree : Node
    , selectedNodeId : Maybe NodeId
    , maxNodeId : Int
    , viewMode : Bool
    , editedNodeData : NodeData
    }



-- CREATE //////////////////////  --


createSampleTree : Node
createSampleTree =
    Node "0"
        "root"
        createDefaultNodeData
        (Children
            [ Node "2" "child2" createDefaultNodeData (Children [])
            , Node "3" "child3" createDefaultNodeData (Children [])
            , Node "4"
                "child4"
                createDefaultNodeData
                (Children
                    [ Node "5" "child5" createDefaultNodeData (Children []) ]
                )
            ]
        )


createNodeId : Model -> NodeId
createNodeId model =
    "node-" ++ toString model.maxNodeId


createDefaultNodeData : NodeData
createDefaultNodeData =
    { propName = "property", selector = "selector", propType = "text" }


createNode : Model -> Node
createNode model =
    Node (createNodeId model) (toString model.maxNodeId) createDefaultNodeData (Children [])



-- HELPERS --


isChildNode : NodeId -> Node -> Bool
isChildNode nodeId node =
    List.filter (\node -> node.id == nodeId) (nodeChildList node)
        |> List.isEmpty
        |> not


hasNoChildren : Node -> Bool
hasNoChildren node =
    List.isEmpty (nodeChildList node)


nodeChildList : Node -> List Node
nodeChildList node =
    case node.children of
        Children nodeList ->
            nodeList


findNodes : Node -> (Node -> Bool) -> List Node
findNodes node matchFunction =
    if (matchFunction node) then
        [ node ]
    else
        nodeChildList node
            |> List.map (\childNode -> findNodes childNode matchFunction)
            |> List.concat


findNodeById : NodeId -> Node -> Maybe Node
findNodeById nodeId rootNode =
    (\n -> n.id == nodeId)
        |> findNodes rootNode
        |> List.head


getNodeData : NodeId -> Node -> Maybe NodeData
getNodeData nodeId rootNode =
    case (findNodeById nodeId rootNode) of
        Just node ->
            Just node.data

        Nothing ->
            Nothing



-- UPDATE --


appendChild : Node -> Node -> Node
appendChild target newNode =
    { target
        | children =
            Children (List.append (nodeChildList target) [ newNode ])
    }


appendChildById : NodeId -> Node -> Node -> Node
appendChildById nodeId nodeToAppend rootNode =
    if rootNode.id == nodeId then
        appendChild rootNode nodeToAppend
    else
        { rootNode
            | children =
                Children
                    (nodeChildList rootNode
                        |> List.map (appendChildById nodeId nodeToAppend)
                    )
        }


updateNodeData : NodeId -> NodeData -> Node -> Node
updateNodeData nodeId nodeData rootNode =
    if rootNode.id == nodeId then
        { rootNode
            | data = nodeData
        }
    else
        { rootNode
            | children =
                Children
                    (nodeChildList rootNode
                        |> List.map (updateNodeData nodeId nodeData)
                    )
        }


deleteNodeById : NodeId -> Node -> Node
deleteNodeById nodeId parentNode =
    if not (isChildNode nodeId parentNode) then
        { parentNode
            | children =
                Children
                    (nodeChildList parentNode
                        |> List.map (deleteNodeById nodeId)
                    )
        }
    else
        { parentNode
            | children =
                Children
                    (nodeChildList parentNode
                        |> List.filter (\node -> node.id /= nodeId)
                    )
        }
