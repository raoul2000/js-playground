module EditPlayer exposing (editPlayer)

import Model exposing (..)
import Message exposing (Msg(..))
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)


{--
Displays the appropriate view depending on the playerForm property
--}


editPlayer : Model -> PlayerId -> Html Msg
editPlayer model playerId =
    case model.playerForm of
        Just playerForm ->
            editPlayerForm playerForm

        Nothing ->
            playerNotFound playerId



{--
Displays the player edit form
--}


editPlayerForm : Player -> Html Msg
editPlayerForm player =
    div []
        [ input
            [ placeholder "player name"
            , value player.name
            , onInput ChangePlayerName
            ]
            []
        , input
            [ placeholder "player rank"
            , value (toString player.rank)
            , onInput ChangePlayerRank
            ]
            []
        , hr [] []
        , button
            [ onClick SavePlayerForm ]
            [ text "save" ]
        , button
            [ onClick CancelPlayerFormEdit ]
            [ text "cancel" ]
        ]



{--
trying to edit a player that doesn't exist (its id could not be found)
--}


playerNotFound : PlayerId -> Html Msg
playerNotFound playerId =
    div []
        [ text "player not found " ]
