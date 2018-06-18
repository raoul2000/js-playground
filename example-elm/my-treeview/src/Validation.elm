module Validation exposing (..)

import Model exposing (..)


objectProperty : Node -> Bool
objectProperty node =
    node.data.propType == Object && not (hasChildren node)


isNonEmptyTrimmedString : String -> Bool
isNonEmptyTrimmedString s =
    not <|
        String.isEmpty <|
            String.trim s


propertyNameIsNotEmpty : NodeData -> Maybe String
propertyNameIsNotEmpty data =
    if isNonEmptyTrimmedString data.propName then
        Nothing
    else
        Just "Missing Property Name"


selectorIsNotEmpty : NodeData -> Maybe String
selectorIsNotEmpty data =
    if isNonEmptyTrimmedString data.selector then
        Nothing
    else
        Just "Missing selector"


validateNodeForm : NodeData -> List String
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


missingObjectDefinition : Node -> Bool
missingObjectDefinition node =
    node.data.propType == Object && not (hasChildren node) && node.id /= "0"


unexpectedObjectDefinition : Node -> Bool
unexpectedObjectDefinition node =
    node.data.propType /= Object && (hasChildren node)


validateNode : Node -> Maybe String
validateNode node =
    if (missingObjectDefinition node) then
        Just "The type of this property is Object, but you have not define any property for this object."
    else if (unexpectedObjectDefinition node) then
        Just "The type of this property is not an object, however it has some children properties"
    else
        Nothing
