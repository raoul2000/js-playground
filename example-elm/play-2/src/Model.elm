module Model exposing (..)

import Router exposing (..)


type alias PlayerId = String
type alias Player = {
  id   : PlayerId,
  name : String
}

type alias Model = {
  players : List Player,
  name    : String,
  route   : Route
}
