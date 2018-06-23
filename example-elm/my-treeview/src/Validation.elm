module Validation exposing (..)


import Model.Node as Node
import Model.NodeData as NodeData

{--
--}
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


{--
Returns TRUE if the node is not the root node and if, having its type sert to Object
it doesn"r have any child
--}
missingObjectDefinition : Node.Node -> Bool
missingObjectDefinition node =
    node.data.propType == NodeData.Object && not (Node.hasChildren node) && node.id /= "0"

{--
Returns TRUE if the node is not the root node and that having a type different than Object
it has at least one child
--}
unexpectedObjectDefinition : Node.Node -> Bool
unexpectedObjectDefinition node =
    node.data.propType /= NodeData.Object && (Node.hasChildren node) && node.id /= "0"


validateNode : Node.Node -> Maybe String
validateNode node =
    if (missingObjectDefinition node) then
        Just """The type of this property is Object, 
        but you have not define any property for this object, so its not consistent.
        You can add child node or change the type of this property.
        """
    else if (unexpectedObjectDefinition node) then
        Just """The type of this property is not Object, however it has some children properties. 
        You should change the type of Property to Object or delete the child node.
        """
    else
        Nothing
