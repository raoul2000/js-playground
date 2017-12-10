module EditPlayer exposing (editPlayer)

import Model exposing (..)
import Message exposing (Msg(..))
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)


editPlayer : Model -> PlayerId -> Html Msg
editPlayer model playerId =
    case model.playerForm of
        Just playerForm ->
            editPlayerForm (Debug.log "juyst" playerForm)

        Nothing ->
            let
                maybePlayer =
                    findPlayerById model playerId
            in
                case maybePlayer of
                    Just player ->
                        let
                          m = {model | playerForm = Player player.id player.name }
                        in
                            editPlayerForm (Debug.log "m.playerForm" m.playerForm)

                    Nothing ->
                        playerNotFound playerId


editPlayerForm : Player -> Html Msg
editPlayerForm player =
    div []
        [ input
            [ placeholder "player name"
            , value player.name
            , onInput ChangePlayerName
            ]
            []
        ]



-- trying to edit a player that doesn't exist (its id could not be found)


playerNotFound : PlayerId -> Html Msg
playerNotFound playerId =
    div []
        [ text "player not found " ]
