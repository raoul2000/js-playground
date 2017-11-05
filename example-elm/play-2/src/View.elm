module View exposing (..)

import Model exposing (Model, Player)
import Message exposing (Msg(..))
import Html exposing (Html, div, text, program)


view : Model -> Html Msg
view model =
    div []
         [ renderPlayers model.players ]

renderPlayers : List Player -> Html Msg
renderPlayers players =
  div [] (
    List.map renderSinglePlayer players
  )


renderSinglePlayer : Player -> Html Msg
renderSinglePlayer player =
  div [] [ text player.name ]
