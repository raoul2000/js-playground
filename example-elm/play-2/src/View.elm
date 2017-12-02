module View exposing (..)

import Model exposing (Model, Player)
import Message exposing (Msg(..))
import Html exposing (Html, div, text, a, program)
import Html.Attributes exposing (href)
import Router exposing (..)

import ViewAll exposing (viewAll)
import About   exposing (about)


renderMainView : Model -> Html Msg
renderMainView model =
    case model.route of
        ViewAllRoute ->
            viewAll model

        AboutRoute ->
            about model

        NotFoundRoute ->
            div [] [ text "NOT FOUND route " ]


renderMainNavbar : Model -> Html Msg
renderMainNavbar model =
    div []
        [ a [ href "#/" ] [ text "home" ]
        , text " | "
        , a [ href "#about" ] [ text "about" ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ renderMainNavbar model
        , renderMainView model
        ]
