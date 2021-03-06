module View.Toolbar exposing (renderToolbar)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Model exposing (..)
import Message exposing (..)


renderToolbar : Model -> Html Msg
renderToolbar model =
    div []
        [ button
            [ onClick AddChildNodeToSelectedNode
            , class "btn btn-success"
            , disabled (model.state /= Model.Read || (model.selectedNodeId == Nothing))
            ]
            [ text "add child node" ]
        , text " "
        , button
            [ onClick DeleteSelectedNode
            , class "btn btn-danger"
            , disabled (model.state /= Model.Read || (model.selectedNodeId == Nothing) || (model.selectedNodeId == Just "root"))
            ]
            [ text "Delete Node" ]
        , text " "
        , button
            [ onClick DeselectAllNodes
            , class "btn btn-light"
            , disabled (model.state /= Model.Read || (model.selectedNodeId == Nothing))
            ]
            [ text "Deselect All Nodes" ]
        , button
            [ onClick (CollapseAllNodes True)
            , class "btn btn-light"
            , disabled (model.state /= Model.Read)
            ]
            [ text "Collapse All" ]
        , button
            [ onClick (CollapseAllNodes False)
            , class "btn btn-light"
            , disabled (model.state /= Model.Read)
            ]
            [ text "Expand All" ]
        , button
            [ onClick (SendData)
            , class "btn btn-light"
            ]
            [ text "Send" ]
        , button
            [ onClick (EncodeModel)
            , class "btn btn-light"
            ]
            [ text "Encode" ]
        ]
