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

validationNode : Node -> List Bool
validationNode node =
    [ hasSelector, hasPropertyName]
        |> List.map (\validationRule -> validationRule node) 

validatePropertyName : String -> List String
validatePropertyName value =
    

