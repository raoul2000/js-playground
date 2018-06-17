module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (..)
import Message exposing (..)

import View.Toolbar as Toolbar exposing (..)
import View.NodeForm as NodeForm exposing (..)
import View.NodeView as NodeView exposing (..)
import View.Tree as Tree exposing (..)


renderRightPanel : Model -> Html Msg
renderRightPanel model =
    case model.selectedNodeId of
        Just nodeId ->
            case (findNodeById nodeId model.tree) of
                Just selectedNode ->
                    if model.viewMode then
                        NodeView.renderSelectedNodeView selectedNode
                    else
                        NodeForm.renderNodeEditForm model.editedNodeData model.validationErrors

                Nothing ->
                    div [] [ text "select a node" ]

        Nothing ->
            div [] [ text "select a node" ]


view : Model -> Html Msg
view model =
    div [ class "row" ]
        [ div [ class "col-sm" ]
            [ Toolbar.renderToolbar model
            , Tree.renderTreeView model
            , Tree.renderTreeInfo model
            ]
        , div [ class "col-sm" ]
            [ renderRightPanel model ]
        ]
