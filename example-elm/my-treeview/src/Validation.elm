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


hasSelector : Node -> Bool
hasSelector node =
    isNonEmptyTrimmedString node.data.selector

hasPropertyName : Node -> Bool
hasPropertyName node = 
    isNonEmptyTrimmedString node.data.propName

validationNode : Node -> List (Maybe String)
validationNode node =
    List.map (\n -> Nothing) [ hasSelector, hasPropertyName]

