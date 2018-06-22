module Validation exposing (..)


import Model.Node as Node
import Model.NodeData as NodeData


objectProperty : Node.Node -> Bool
objectProperty node =
    node.data.propType == NodeData.Object && not (Node.hasChildren node)


isNonEmptyTrimmedString : String -> Bool
isNonEmptyTrimmedString s =
    not <|
        String.isEmpty <|
            String.trim s


propertyNameIsNotEmpty : NodeData.NodeData -> Maybe String
propertyNameIsNotEmpty data =
    if isNonEmptyTrimmedString data.propName then
        Nothing
    else
        Just "Missing Property Name"


selectorIsNotEmpty : NodeData.NodeData -> Maybe String
selectorIsNotEmpty data =
    if isNonEmptyTrimmedString data.selector then
        Nothing
    else
        Just "Missing selector"


validateNodeForm : NodeData.NodeData -> List String
validateNodeForm data =
    [ propertyNameIsNotEmpty
    , selectorIsNotEmpty
    ]
        |> List.map
            (\validate ->
                case (validate data) of
                    Just errorMessage ->
                        errorMessage

                    Nothing ->
                        ""
            )
        |> List.filter (\errorMsg -> not (String.isEmpty errorMsg))



missingObjectDefinition : Node.Node -> Bool
missingObjectDefinition node =
    node.data.propType == NodeData.Object && not (Node.hasChildren node) && node.id /= "0"


unexpectedObjectDefinition : Node.Node -> Bool
unexpectedObjectDefinition node =
    node.data.propType /= NodeData.Object && (Node.hasChildren node)


validateNode : Node.Node -> Maybe String
validateNode node =
    if (missingObjectDefinition node) then
        Just "The type of this property is Object, but you have not define any property for this object."
    else if (unexpectedObjectDefinition node) then
        Just "The type of this property is not an object, however it has some children properties"
    else
        Nothing
