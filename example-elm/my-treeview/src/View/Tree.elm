module View.Tree exposing (renderTreeInfo, renderTreeView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Model as Model
import Model.Node as Node
import Message exposing (..)
import Validation exposing (..)


renderNodeToggler : Node.Node -> Html Msg
renderNodeToggler node =
    let
        buttonText =
            if Node.hasChildren node then
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


renderNodeLabel : Node.Node -> Html Msg
renderNodeLabel node =
    span [ class "node-label" ]
        [ text node.data.propName ]


renderNode : Model.Model -> Node.Node -> Html Msg
renderNode model node =
    let
        selectionClassname =
            if model.selectedNodeId == Just node.id then
                "selected-node"
            else
                ""

        expandedClassname =
            if Node.hasChildren node then
                if node.view.expanded == True then
                    "expanded-node"
                else
                    "collapsed-node"
            else
                " "

        childrenClassname =
            if Node.hasChildren node then
                "has-children"
            else
                ""

        hint =
            if Validation.validateNode node == Nothing then
                text ""
            else
                span []
                    [ text "!" ]
    in
        li [ class (String.join " " [ selectionClassname, expandedClassname, childrenClassname ]) ]
            [ div
                [ class "node-group"
                , onClick (NodeSelection node)
                ]
                [ renderNodeToggler node
                , renderNodeLabel node
                , hint
                ]
            , renderChildren model node.children
            ]


renderChildren : Model.Model -> Node.Children -> Html Msg
renderChildren model (Node.Children nodeList) =
    if List.length nodeList == 0 then
        text ""
    else
        ul []
            (List.map
                (renderNode model)
                nodeList
            )


renderTreeView : Model.Model -> Html Msg
renderTreeView model =
    div [ class "treeview" ]
        [ ul []
            [ renderNode model model.tree ]
        ]


renderTreeInfo : Model.Model -> Html Msg
renderTreeInfo model =
    div []
        [ text "" ]
