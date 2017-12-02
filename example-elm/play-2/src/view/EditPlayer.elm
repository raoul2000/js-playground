module EditPlayer exposing (editPlayer)

import Model exposing (..)
import Message exposing (Msg(..))
import Html exposing (Html, div, text,a,  program)

editPlayer : Model -> PlayerId -> Html Msg
editPlayer model playerId =
    div []
    [ text "edit"]
