module ViewAll exposing (viewAll)

import Model exposing (..)
import Message exposing (Msg(..))
import Html exposing (Html, div, text, a, ul, li)
import Html.Attributes exposing (href)


{--
Renders the view that displays all players
--}


viewAll : Model -> Html Msg
viewAll model =
    renderPlayers model.players



{--
Render a player row
--}


renderSinglePlayer : Player -> Html Msg
renderSinglePlayer player =
    li [] [ a [ href ("#edit/" ++ player.id) ] [ text (renderPlayerLabel player) ] ]



{--
Render the player list
--}


renderPlayers : List Player -> Html Msg
renderPlayers players =
    ul []
        (List.map renderSinglePlayer players)



{--
Creates and returns the player label
--}


renderPlayerLabel : Player -> String
renderPlayerLabel player =
    String.concat
        [ player.name
        , " "
        , toString player.rank
        ]
