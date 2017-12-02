module Update exposing (update)

import Message exposing (Msg(..))
import Model exposing (Model, PlayerId, Player)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )
