module Update exposing (update)

import Message exposing (Msg(..))
import Navigation exposing (..)


--import Model exposing (Model, PlayerId, Player, Route)

import Model exposing (..)
import Router exposing (..)


updateOnLocationChange : Route -> Model -> ( Model, Cmd Msg )
updateOnLocationChange route model =
    case route of
        EditPlayerRoute playerId ->
            let
                aPlayer =
                    findPlayerById model (Debug.log "location change" playerId)
            in
                case aPlayer of
                    Just player ->
                        ( { model
                            | route = route
                            , playerForm = Just (Player player.id player.name)
                          }
                        , Cmd.none
                        )

                    Nothing ->
                        ( { model | route = route, playerForm = Nothing }, Cmd.none )

        _ ->
            ( { model | route = route }, Cmd.none )


updatePlayerList : List Player -> Player -> List Player
updatePlayerList playerList playerForm =
    List.map
        (\player ->
            if player.id == playerForm.id then
                playerForm
            else
                player
        )
        playerList


updateModelOnSavePlayer : Model -> ( Model, Cmd Msg )
updateModelOnSavePlayer model =
    ( case model.playerForm of
        Just playerForm ->
            { model
                | players = updatePlayerList model.players playerForm
                , playerForm = Nothing
            }

        Nothing ->
            model
    , newUrl "/"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnLocationChange location ->
            updateOnLocationChange (Router.parseLocation location) model

        SavePlayerForm ->
            updateModelOnSavePlayer model

        CancelPlayerFormEdit ->
            ( { model
                | playerForm = Nothing }
            , newUrl "/"
            )

        ChangePlayerName newName ->
            case model.playerForm of
                Just theForm ->
                    ( { model
                        | playerForm = Just ({ theForm | name = (Debug.log "newName=" newName) })
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( { model
                        | playerForm = Just (Player "" newName)
                      }
                    , Cmd.none
                    )

        NoOp ->
            ( model, Cmd.none )
