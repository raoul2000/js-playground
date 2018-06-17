module View.Toolbar exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Model exposing (..)
import Message exposing (..)


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
