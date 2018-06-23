module Main exposing (main)

import Html exposing (..)
import Model exposing (..)
import Message exposing (..)
import View exposing (..)
import Update exposing (..)


{--
Some doc here
--}


init : ( Model, Cmd Msg )
init =
    ( initialModel
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
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
