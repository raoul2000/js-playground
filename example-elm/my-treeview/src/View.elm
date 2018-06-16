module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Model exposing (..)
import Message exposing (..)
import Validation exposing (..)



renderPropertyTypeOption : PropertyType -> ( PropertyType, String ) -> Html Msg
renderPropertyTypeOption currentValue ( optionValue, optionText ) =
    option
        [ value (optionValue |> propertyTypeToValue)
        , selected (currentValue == optionValue)
        ]
        [ text optionText ]


renderNodeToggler : Node -> Html Msg
renderNodeToggler node =
    let
        buttonText =
            if hasChildren node then
                if node.view.expanded == True then
                    "-"
                else
                    "+"
            else
                ""
    in
        span
            [ class "toggle"
            , onClick (ToggleNodeView node)
            ]
            [ text buttonText ]


renderNodeLabel : Node -> Html Msg
renderNodeLabel node =
    span [ class "node-label" ]
        [ text node.data.propName ]


renderNode : Model -> Node -> Html Msg
renderNode model node =
    let
        selectionClassname =
            if model.selectedNodeId == Just node.id then
                "selected-node"
            else
                ""

        expandedClassname =
            if hasChildren node then
                if node.view.expanded == True then
                    "expanded-node"
                else
                    "collapsed-node"
            else
                " "

        childrenClassname =
            if hasChildren node then
                "has-children"
            else
                ""
        
        hint = 
            if Validation.objectProperty node then
                span []
                    [ text "!"]
            else
                text ""
    in
        li [ class (String.join " " [ selectionClassname, expandedClassname, childrenClassname ]) ]
            [ div
                [ onClick (NodeSelection node) ]
                [ renderNodeToggler node
                , renderNodeLabel node
                , hint
                ]
            , renderChildren model node.children
            ]


renderChildren : Model -> Children -> Html Msg
renderChildren model (Children nodeList) =
    if List.length nodeList == 0 then
        text ""
    else
        ul []
            (List.map
                (renderNode model)
                nodeList
            )


renderTreeView : Model -> Html Msg
renderTreeView model =
    ul []
        [ renderNode model model.tree
        ]


renderTreeInfo : Model -> Html Msg
renderTreeInfo model =
    let
        txtSelectedNodeId =
            case model.selectedNodeId of
                Just selectedNodeId ->
                    selectedNodeId ++ " viewMode = " ++ (toString model.viewMode)

                Nothing ->
                    "no selection"
    in
        div []
            [ text txtSelectedNodeId
            ]


renderToolbar : Model -> Html Msg
renderToolbar model =
    div []
        [ button
            [ onClick AddChildNodeToSelectedNode
            , class "btn btn-success"
            , disabled (not (model.viewMode) || (model.selectedNodeId == Nothing))
            ]
            [ text "add child node" ]
        , text " "
        , button
            [ onClick DeleteSelectedNode
            , class "btn btn-danger"
            , disabled (not (model.viewMode) || (model.selectedNodeId == Nothing))
            ]
            [ text "Delete Node" ]
        , text " "
        , button
            [ onClick DeselectAllNodes
            , class "btn btn-light"
            , disabled (not (model.viewMode) || (model.selectedNodeId == Nothing))
            ]
            [ text "Deselect All Nodes" ]
        , button
            [ onClick (CollapseAllNodes True)
            , class "btn btn-light"
            , disabled (not (model.viewMode))
            ]
            [ text "Collapse All" ]
        , button
            [ onClick (CollapseAllNodes False)
            , class "btn btn-light"
            , disabled (not (model.viewMode))
            ]
            [ text "Expand All" ]
        ]


renderSelectedNodeView : Node -> Html Msg
renderSelectedNodeView node =
    div []
        [ h3 []
            [ text node.data.propName ]
        , hr [] []
        , table [ class "table table-borderless table-hover table-sm node-view" ]
            [ tbody []
                [ tr []
                    [ th [ scope "row" ] [ text "Selector :" ]
                    , td [] [ text node.data.selector ]
                    ]
                , tr []
                    [ th [ scope "row" ] [ text "Multiple Values :" ]
                    , td [] [ text (toString node.data.isArray) ]
                    ]
                , tr []
                    [ th [ scope "row" ] [ text "Type :" ]
                    , td [] [ text (propertyTypeToText node.data.propType) ]
                    ]
                , if node.data.propType == AttributeValue then
                    tr []
                        [ th [ scope "row" ] [ text "Attribute Name :" ]
                        , td [] [ text node.data.attributeName ]
                        ]
                  else 
                    text ""
                ]
            ]
        , hr [] []
        , button
            [ class "btn btn-primary"
            , onClick (EditNode node)
            ]
            [ text "Edit Property" ]
        ]



{--
    div []
        [ div [] [ text ("property Name : " ++ node.data.propName) ]
        , div [] [ text ("Selector : " ++ node.data.selector) ]
        , div [] [ text ("Type : " ++ (propertyTypeToText node.data.propType)) ]
        , button [ onClick (EditNode node) ] [ text "Edit" ]
        ]
--}


renderOptionalAttributeNameFormGroup : NodeData -> Html Msg
renderOptionalAttributeNameFormGroup nodeData =
    if nodeData.propType == AttributeValue then
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


renderNodeEditForm : NodeData -> Html Msg
renderNodeEditForm nodeData =
    Html.div []
        [ div [ class "form-group" ]
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
                , onInput (\selection -> ChangePropertyTypeSelection (valueToPropertyType selection))
                ]
                (List.map
                    (renderPropertyTypeOption nodeData.propType)
                    propertyTypeOptions
                )
            ]
        , renderOptionalAttributeNameFormGroup nodeData
        , button
            [ class "btn btn-primary"
            , onClick (SaveEdit)
            ]
            [ text "Save" ]
        , button
            [ class "btn btn-light"
            , onClick (CancelEdit)
            ]
            [ text "Cancel" ]
        ]


renderRightPanel : Model -> Html Msg
renderRightPanel model =
    case model.selectedNodeId of
        Just nodeId ->
            case (findNodeById nodeId model.tree) of
                Just selectedNode ->
                    if model.viewMode then
                        renderSelectedNodeView selectedNode
                    else
                        renderNodeEditForm model.editedNodeData

                Nothing ->
                    div [] [ text "select a node" ]

        Nothing ->
            div [] [ text "select a node" ]


view : Model -> Html Msg
view model =
    div [ class "row" ]
        [ div
            [ class "col-sm" ]
            [ renderTreeInfo model
            , renderToolbar model
            , renderTreeView model
            ]
        , div [ class "col-sm" ]
            [ renderRightPanel model ]
        ]
