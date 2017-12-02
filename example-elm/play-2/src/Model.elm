module Model exposing (..)


type Route
    = ViewAllRoute
    | AboutRoute
    | EditPlayerRoute PlayerId
    | NotFoundRoute


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
