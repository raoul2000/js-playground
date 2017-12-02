module View exposing (..)

import Model exposing (Model, Player)
import Message exposing (Msg(..))
import Html exposing (Html, div, text,a,  program)
import Html.Attributes exposing (href)
import Router exposing (..)


page : Model -> Html Msg
page model =
  case model.route of
    ViewAllRoute ->
      pageViewAll model
    AboutRoute ->
      div [] [ text "ABOUT route "]
    NotFoundRoute ->
      div [] [ text "NOT FOUND route "]

pageViewAll : Model -> Html Msg
pageViewAll model =
    renderPlayers model.players

renderMainNavbar : Model -> Html Msg
renderMainNavbar model =
    div []
        [ a [ href "#/" ] [ text "home"]
        , text " | "
        , a [href "#about"]  [ text "about"]
        ]


view : Model -> Html Msg
view model =
    div []
        [ renderMainNavbar model
        , page model
        ]


renderPlayers : List Player -> Html Msg
renderPlayers players =
    div []
        (List.map renderSinglePlayer players)


renderSinglePlayer : Player -> Html Msg
renderSinglePlayer player =
    div [] [ text ("player = " ++ player.name) ]
