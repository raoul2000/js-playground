module View exposing (..)

import Model exposing (Model)
import Message exposing (Msg(..))
import Html exposing (Html, div, text, program)


view : Model -> Html Msg
view model =
    div []
        [ text model ]
