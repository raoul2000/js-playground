module Model.NodeData exposing (NodeData, PropertyType(..), propertyTypeOptions, propertyTypeToValue, propertyTypeToText, valueToPropertyType, createDefaultNodeData)


type PropertyType
    = RawText
    | HtmlText
    | AttributeValue
    | Object


type alias NodeData =
    { propName : String
    , selector : String
    , propType : PropertyType
    , attributeName : String
    , isArray : Bool
    }


propertyTypeOptions : List ( PropertyType, String )
propertyTypeOptions =
    [ ( RawText, "Simple Text" )
    , ( HtmlText, "HTML text" )
    , ( AttributeValue, "Attribute Value" )
    , ( Object, "Object" )
    ]


propertyTypeToValue : PropertyType -> String
propertyTypeToValue propertyType =
    case propertyType of
        RawText ->
            "text"

        HtmlText ->
            "htmltext"

        AttributeValue ->
            "attrval"

        Object ->
            "object"


propertyTypeToText : PropertyType -> String
propertyTypeToText propertyType =
    let
        result =
            propertyTypeOptions
                |> List.filter (\n -> (Tuple.first n) == propertyType)
                |> List.head
    in
        case result of
            Nothing ->
                "error"

            Just ( _, propText ) ->
                propText


valueToPropertyType : String -> Maybe PropertyType
valueToPropertyType value =
    List.filter (\n -> propertyTypeToValue (Tuple.first n) == value) propertyTypeOptions
        |> List.map (\n -> Tuple.first n)
        |> List.head


createDefaultNodeData : NodeData
createDefaultNodeData =
    { propName = "property"
    , selector = "selector"
    , propType = RawText
    , attributeName = "attribute name"
    , isArray = False
    }
