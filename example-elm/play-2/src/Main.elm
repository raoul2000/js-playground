module App exposing (..)

import Message exposing (Msg(..))
import Model exposing (Model, PlayerId, Player)
import View exposing (view)
import Update exposing (update)
import Router exposing (..)
import Navigation exposing (Location)


init : Location -> ( Model, Cmd Msg )
init location =
    let
        currentRoute =
            parseLocation location
    in
        ( { players =
                [ Player "1" "tom"
                , Player "2" "bob"
                , Player "3" "alf"
                ]
          , name = "dummy"
          , route = currentRoute
          }
        , Cmd.none
        )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main : Program Never Model Msg
main =
    Navigation.program OnLocationChange
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
