module View.NodeView exposing (renderSelectedNodeView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Model.Node as Node
import Model.NodeData as NodeData
import Message exposing (..)
import Validation exposing (..)




renderWarningMissingChild : Node.Node -> Html Msg
renderWarningMissingChild node =
    case validateNode node of
        Just msg ->
            div [ class "alert alert-warning" ]
                [ text msg ]

        Nothing ->
            div [] []


renderSelectedNodeView : Node.Node -> Html Msg
renderSelectedNodeView node =
    div []
        [ h3 []
            [ text node.data.propName ]
        , hr [] []
        , renderWarningMissingChild node
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
                    , td []
                        [ text (NodeData.propertyTypeToText node.data.propType) ]
                    ]
                , if node.data.propType == NodeData.AttributeValue then
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
