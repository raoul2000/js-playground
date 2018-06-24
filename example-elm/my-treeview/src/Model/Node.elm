module Model.Node exposing (..)

import Model.NodeData as NodeData


type alias NodeId =
    String


type Children
    = Children (List Node)


type alias NodeView =
    { expanded : Bool }


type alias Node =
    { id : NodeId
    , name : String
    , data : NodeData.NodeData
    , view : NodeView
    , children : Children
    }


nodeChildList : Node -> List Node
nodeChildList node =
    case node.children of
        Children nodeList ->
            nodeList


hasNoChildren : Node -> Bool
hasNoChildren node =
    List.isEmpty (nodeChildList node)


hasChildren : Node -> Bool
hasChildren node =
    not (hasNoChildren node)


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


getNodeData : NodeId -> Node -> Maybe NodeData.NodeData
getNodeData nodeId rootNode =
    case findNodeById nodeId rootNode of
        Just node ->
            Just node.data

        Nothing ->
            Nothing


isChildNode : NodeId -> Node -> Bool
isChildNode nodeId node =
    List.filter (\nd -> nd.id == nodeId) (nodeChildList node)
        |> List.isEmpty
        |> not



-- UPDATE --
-- Add newNode as the last child to node target
-- The target node is also expanded so the new child
-- is visible


appendChild : Node -> Node -> Node
appendChild target newNode =
    appendChildren target [ newNode ]


appendChildren : Node -> List Node -> Node
appendChildren target newNodes =
    { target
        | children =
            Children (List.append (nodeChildList target) newNodes)
        , view = { expanded = True }
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


updateNodeData : NodeId -> NodeData.NodeData -> Node -> Node
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


updateNodeView : NodeId -> NodeView -> Node -> Node
updateNodeView nodeId nodeView rootNode =
    if rootNode.id == nodeId then
        { rootNode
            | view = { expanded = not rootNode.view.expanded }
        }
    else
        { rootNode
            | children =
                Children
                    (nodeChildList rootNode
                        |> List.map (updateNodeView nodeId nodeView)
                    )
        }



collapseAllNodes : Bool -> Node -> Node
collapseAllNodes collapse rootNode =
    { rootNode
        | view = { expanded = not collapse }
        , children =
            Children
                (nodeChildList rootNode
                    |> List.map (collapseAllNodes collapse)
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

createDefaultNodeView : NodeView
createDefaultNodeView =
    { expanded = True }