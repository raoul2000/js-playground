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

        NoOp ->
            ( model, Cmd.none )
