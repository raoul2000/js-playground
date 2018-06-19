module View.Tree exposing (renderTreeInfo, renderTreeView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Model exposing (..)
import Message exposing (..)
import Validation exposing (..)


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
                    [ text "!" ]
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
    div [ class "treeview" ]
        [ ul []
            [ renderNode model model.tree ]
        ]


renderTreeInfo : Model -> Html Msg
renderTreeInfo model =
    let
        txtSelectedNodeId =
            case model.selectedNodeId of
                Just selectedNodeId ->
                    selectedNodeId ++ " viewMode = " ++ toString model.viewMode

                Nothing ->
                    "no selection"
    in
        div []
            [ text txtSelectedNodeId
            ]
