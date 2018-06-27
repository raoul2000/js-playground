module Decode exposing (..)

import Model.Node as Node
import Model.NodeData as NodeData
import Json.Decode exposing (..)
import Json.Decode.Pipeline as JDP exposing (decode, required, optional, requiredAt, optionalAt)



nodeIdDecoder : Decoder Node.NodeId
nodeIdDecoder =
    succeed (toString Json.Decode.string)


propertyTypeDecoder : Decoder NodeData.PropertyType
propertyTypeDecoder =
    succeed (toString Json.Decode.string)

nodeDataDecoder : Decoder NodeData.NodeData
nodeDataDecoder =
    decode NodeData.NodeData
        |> JDP.required "propName" Json.Decode.string
        |> JDP.required "selector" Json.Decode.string
        |> JDP.required "propType" Json.Decode.string
        |> JDP.required "attributeName" Json.Decode.string
        |> JDP.required "isArray" Json.Decode.bool
    



childrenDecoder : Decoder Node.Children
childrenDecoder =
    Json.Decode.map Node.Children (Json.Decode.list (Json.Decode.lazy (\_ -> nodeDecoder)))

nodeDecoder : Decoder Node.Node
nodeDecoder =
    decode Node.Node
        |> JDP.required "id" nodeIdDecoder
        |> JDP.required "name" Json.Decode.string
        |> JDP.required "data" nodeDataDecoder
        |> JDP.required "children" childrenDecoder    