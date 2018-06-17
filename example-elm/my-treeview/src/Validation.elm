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
    , selectorIsNotEmpty]
        |> List.map (\validate -> 
            case (validate data) of
                Just errorMessage -> errorMessage 
                Nothing -> ""
            )
        |> List.filter (\errorMsg -> not(String.isEmpty errorMsg))
        
