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



{--
Replaces in the player list a player record with a new one and returns the
new updated player list
--}


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



{--
Updates the model by modifying the player list taking into account the player form
entered by user. Once done, navigate to the home page
--}


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



{--
Convert the new Ranks from String to Int and on success updates the player form
rank field
--}


updateModelOnPlayerRankChange : Model -> String -> ( Model, Cmd Msg )
updateModelOnPlayerRankChange model newRank =
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



{--
Update the player form name field
--}


updateModelOnPlayerNameChange : Model -> String -> ( Model, Cmd Msg )
updateModelOnPlayerNameChange model newName =
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
            updateModelOnPlayerRankChange model newRank

        ChangePlayerName newName ->
            updateModelOnPlayerNameChange model newName

        NoOp ->
            ( model, Cmd.none )
