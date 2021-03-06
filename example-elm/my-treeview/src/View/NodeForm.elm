module View.NodeForm exposing (renderNodeEditForm)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Model.Node as Node
import Model.NodeData as NodeData
import Model.Tree as Tree
import Model as Model exposing (State(..))
import Message exposing (..)


renderPropertyTypeOption : NodeData.PropertyType -> ( NodeData.PropertyType, String ) -> Html Msg
renderPropertyTypeOption currentValue ( optionValue, optionText ) =
    option
        [ value (optionValue |> NodeData.propertyTypeToValue)
        , selected (currentValue == optionValue)
        ]
        [ text optionText ]


{-| The attribute nae field is displayed only if user has selected the type "Attribute"
-}
renderOptionalAttributeNameFormGroup : NodeData.NodeData -> Html Msg
renderOptionalAttributeNameFormGroup nodeData =
    if nodeData.propType == NodeData.AttributeValue then
        div [ class "form-group" ]
            [ label [ for "attrName" ] [ text "Attribute Name" ]
            , input
                [ class "form-control"
                , id "attrName"
                , type_ "text"
                , value nodeData.attributeName
                , placeholder "attribute Name"
                , onInput InputAttributeName
                ]
                []
            ]
    else
        div [] []


renderValidationErrors : List String -> Html Msg
renderValidationErrors errors =
    if List.isEmpty errors then
        div [] []
    else
        div [ class "alert alert-danger" ]
            [ text "It seems that one or more entered values are not valid : "
            , ul []
                (List.map (\msg -> li [] [ text msg ]) errors)
            ]


renderRegularNodeEditForm : NodeData.NodeData -> List String -> Html Msg
renderRegularNodeEditForm nodeData validationErrors =
    Html.div []
        [ renderValidationErrors validationErrors
        , div [ class "form-group" ]
            [ label [ for "propName" ] [ text "Property Name" ]
            , input
                [ class "form-control"
                , id "propName"
                , type_ "text"
                , value nodeData.propName
                , placeholder "property Name"
                , onInput InputPropertyName
                ]
                []
            ]
        , div [ class "form-group" ]
            [ label [ for "selector" ] [ text "Selector" ]
            , input
                [ class "form-control"
                , id "selector"
                , type_ "text"
                , value nodeData.selector
                , placeholder "Selector (ex : div.post > p )"
                , onInput InputSelector
                ]
                []
            ]
        , div [ class "form-group form-check" ]
            [ input
                [ class "form-check-input"
                , id "isArray"
                , type_ "checkbox"
                , checked nodeData.isArray
                , onClick ToggleIsArray
                ]
                []
            , label
                [ class "form-check-label"
                , for "isArray"
                ]
                [ text "Selects all values that match the selector" ]
            ]
        , div [ class "form-group" ]
            [ label [ for "type" ] [ text "Type" ]
            , select
                [ class "form-control"
                , onInput (\selection -> ChangePropertyTypeSelection (NodeData.valueToPropertyType selection))
                ]
                (List.map
                    (renderPropertyTypeOption nodeData.propType)
                    NodeData.propertyTypeOptions
                )
            ]
        , renderOptionalAttributeNameFormGroup nodeData
        , button
            [ class "btn btn-primary"
            , onClick SaveEdit
            ]
            [ text "Save" ]
        , button
            [ class "btn btn-light"
            , onClick CancelEdit
            ]
            [ text "Cancel" ]
        ]


renderRootNodeEditForm : NodeData.NodeData -> List String -> Html Msg
renderRootNodeEditForm nodeData validationErrors =
    Html.div []
        [ renderValidationErrors validationErrors
        , div [ class "form-group" ]
            [ label [ for "propName" ] [ text "URL" ]
            , input
                [ class "form-control"
                , id "propName"
                , type_ "text"
                , value nodeData.propName
                , placeholder "URL"
                , onInput InputPropertyName
                ]
                []
            ]
        , button
            [ class "btn btn-primary"
            , onClick SaveEdit
            ]
            [ text "Save" ]
        , button
            [ class "btn btn-light"
            , onClick CancelEdit
            ]
            [ text "Cancel" ]
        ]

{--
Depending the intention, display a form or the other. 
When the ROOT node is selected and we are on an Update operation, display the root node form, otherwise
display the regular node form
--}
renderNodeEditForm : Model.State -> Node.Node -> NodeData.NodeData -> List String -> Html Msg
renderNodeEditForm state node nodeData validationErrors =
    if Tree.isRoot node && state == Model.UpdateNode then
        renderRootNodeEditForm nodeData validationErrors
    else
        renderRegularNodeEditForm nodeData validationErrors
