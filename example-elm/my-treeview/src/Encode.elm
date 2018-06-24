module Encode exposing (..)

import Model.Node exposing (Node, nodeChildList)
import Model.NodeData exposing (NodeData)
import Json.Encode exposing (encode, Value, string, int, float, bool, list, object)


encodeTree : Node -> String
encodeTree rootNode =
    Json.Encode.encode 2 (nodeEncoder rootNode)


nodeEncoder : Node -> Json.Encode.Value
nodeEncoder node =
    Json.Encode.object
        [ ( "id", Json.Encode.string node.id )
        , ( "data", nodeDataEncoder node.data )
        , ( "children", Json.Encode.list (List.map (\c -> nodeEncoder c) (nodeChildList node)) )
        ]


nodeDataEncoder : NodeData -> Json.Encode.Value
nodeDataEncoder nodeData =
    Json.Encode.object
        [ ( "propName", Json.Encode.string nodeData.propName )
        , ( "selector", Json.Encode.string nodeData.selector )
        , ( "attributeName", Json.Encode.string nodeData.attributeName )
        ]
