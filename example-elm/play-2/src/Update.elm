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
                            , playerForm = Just (Player player.id player.name player.rank)
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
    case (Debug.log "msg" msg) of
        OnLocationChange location ->
            updateOnLocationChange (Router.parseLocation location) model

        SavePlayerForm ->
            updateModelOnSavePlayer model

        CancelPlayerFormEdit ->
            ( { model
                | playerForm = Nothing
              }
            , newUrl "/"
            )

        ChangePlayerRank newRank ->
            case model.playerForm of
                Just theForm ->
                    let
                        rankResult =
                            String.toInt
                                (if String.isEmpty newRank then
                                    "0"
                                 else
                                    newRank
                                )
                    in
                        case rankResult of
                            Err msg ->
                                ( model, Cmd.none )

                            Ok intRank ->
                                ( { model
                                    | playerForm = Just ({ theForm | rank = intRank })
                                  }
                                , Cmd.none
                                )

                Nothing ->
                    ( { model
                        | playerForm = Just (Player "" "" 0)
                      }
                    , Cmd.none
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
                        | playerForm = Just (Player "" newName 0)
                      }
                    , Cmd.none
                    )

        NoOp ->
            ( model, Cmd.none )
