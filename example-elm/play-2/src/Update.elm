module Update exposing (update)

import Message exposing (Msg(..))
import Model exposing (Model, PlayerId, Player)
import Router exposing (..)



update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnLocationChange location ->
            let
                newRoute =
                    Router.parseLocation location
            in
                ( { model | route = newRoute }, Cmd.none )
        ChangePlayerName newName ->
          case model.playerForm of
              Just theForm ->
                    (
                      { model |
                        playerForm =  Just ( { theForm | name = newName})
                    }
                    , Cmd.none
                    )

              Nothing ->
                  ( { model |
                    playerForm =  Just ( Player "" newName  )}, Cmd.none )

        NoOp ->
            ( model, Cmd.none )
