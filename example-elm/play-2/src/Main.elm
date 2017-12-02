module App exposing (..)

import Message exposing (Msg(..))
import Model exposing (Model, PlayerId, Player)
import View exposing (view)
import Update exposing (update)
import Html exposing (Html, div, text, program)

-- MODEL

init : ( Model, Cmd Msg )
init =
    ({ players = [ Player "1" "tom"
                  , Player "2" "bob"
                  , Player "3" "alf"
                  ]
      , name = "dummy"
      }
    , Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

-- MAIN

main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
