module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (..)
import Model.Node as Node
import Message exposing (..)
import View.Toolbar as Toolbar exposing (renderToolbar)
import View.NodeForm as NodeForm exposing (renderNodeEditForm)
import View.NodeView as NodeView exposing (renderSelectedNodeView)
import View.Tree as Tree exposing (renderTreeInfo, renderTreeView)



{-| Render the Node edit Form when the viewMode is FALSE and a node is selected
Render the node information panel when viewMode is TRUE and a node is selected
Render nothing otherwise
-}
renderRightPanel : Model -> Html Msg
renderRightPanel model =
    case model.selectedNodeId of
        Just nodeId ->
            case Node.findNodeById nodeId model.tree of
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
