module Update exposing (update)

import Message exposing (Msg(..))


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
                        ( { model | route = route
                                  , playerForm = Just (Player player.id player.name) }, Cmd.none )

                    Nothing ->
                        ( { model | route = route, playerForm = Nothing }, Cmd.none )

        _ ->
            ( { model | route = route }, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnLocationChange location ->
            updateOnLocationChange (Router.parseLocation location) model

        ChangePlayerName newName ->
            case model.playerForm of
                Just theForm ->
                    ( { model
                        | playerForm = Just ({ theForm | name = newName })
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
