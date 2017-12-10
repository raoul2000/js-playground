module View exposing (..)

import Model exposing (Model, Player)
import Message exposing (Msg(..))
import Html exposing (Html, div, text, a, program)
import Html.Attributes exposing (href)

import ViewAll exposing (viewAll)
import About   exposing (about)
import EditPlayer   exposing (editPlayer)



renderMainView : Model -> Html Msg
renderMainView model =
    case model.route of
        Model.ViewAllRoute ->
            viewAll model

        Model.AboutRoute ->
            about model

        Model.EditPlayerRoute playerId ->
            editPlayer model playerId

        Model.NotFoundRoute ->
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
