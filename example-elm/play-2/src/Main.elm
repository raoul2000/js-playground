module App exposing (..)

import Message exposing (Msg(..))
import Model exposing (Model, PlayerId, Player)
import View exposing (view)
import Update exposing (update)
import Router exposing (..)
import Navigation exposing (..)


init : Location -> ( Model, Cmd Msg )
init location =
    let
        currentRoute =
            parseLocation (Debug.log "init - location" location)
    in
        ( { players =
                [ Player "1" "tom"
                , Player "2" "bob"
                , Player "3" "alf"
                ]
          , playerForm = Nothing
          , name = "dummy"
          , route = currentRoute
          }
          -- force a newUrl in order to correctly handle the case where user
          -- directly access to the player edit form 
        , newUrl location.hash
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
