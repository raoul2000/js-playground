module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Model exposing (..)
import Message exposing (..)


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
    in
        li [ class (String.join " " [ selectionClassname, expandedClassname, childrenClassname ]) ]
            [ div
                [ onClick (NodeSelection node) ]
                [ renderNodeToggler node
                , renderNodeLabel node
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
            , disabled (not (model.viewMode) || (model.selectedNodeId == Nothing))
            ]
            [ text "add child node" ]
        , text " "
        , button
            [ onClick DeleteSelectedNode
            , disabled (not (model.viewMode) || (model.selectedNodeId == Nothing))
            ]
            [ text "Delete Node" ]
        , text " "
        , button
            [ onClick DeselectAllNodes
            , disabled (not (model.viewMode) || (model.selectedNodeId == Nothing))
            ]
            [ text "Deselect All Nodes" ]
        ]


renderSelectedNodeView : Node -> Html Msg
renderSelectedNodeView node =
    div []
        [ div [] [ text ("property Name : " ++ node.data.propName) ]
        , div [] [ text ("Selector : " ++ node.data.selector) ]
        , div [] [ text ("Type : " ++ node.data.propType) ]
        , button [ onClick (EditNode node) ] [ text "Edit" ]
        ]


renderNodeEditForm : NodeData -> Html Msg
renderNodeEditForm nodeData =
    div []
        [ input [ type_ "text", value nodeData.propName, placeholder "property Name", onInput InputPropertyName ] []
        , input [ type_ "text", value nodeData.selector, placeholder "selector", onInput InputSelector ] []
        , button [ onClick (SaveEdit) ] [ text "Save" ]
        , button [ onClick (CancelEdit) ] [ text "Cancel" ]
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
    div []
        [ h1 [] [ text "my treeview is great :) " ]
        , hr [] []
        , div
            [ style
                [ ( "width", "49%" )
                , ( "float", "left" )
                , ( "border-right", "4px solid #cccccc" )
                , ( "margin", "2px" )
                ]
            ]
            [ renderTreeInfo model
            , renderToolbar model
            , renderTreeView model
            ]
        , div [ style [ ( "margin", "2px" ) ] ]
            [ renderRightPanel model ]
        ]
