module ViewAll exposing (viewAll)

import Model exposing (..)
import Message exposing (Msg(..))
import Html exposing (Html, div, text, a)
import Html.Attributes exposing (href)


renderPlayers : List Player -> Html Msg
renderPlayers players =
    div []
        (List.map renderSinglePlayer players)


renderSinglePlayer : Player -> Html Msg
renderSinglePlayer player =
    div [] [ a [ href ("#edit/" ++ player.id) ] [ text (renderPlayerLabel player) ] ]


renderPlayerLabel : Player -> String
renderPlayerLabel player =
    String.concat
        [ player.name
        , " "
        , toString player.rank
        ]


viewAll : Model -> Html Msg
viewAll model =
    renderPlayers model.players
