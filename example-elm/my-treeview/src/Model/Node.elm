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

