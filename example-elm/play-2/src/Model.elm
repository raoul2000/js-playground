module Model exposing (..)


type Route
    = ViewAllRoute
    | AboutRoute
    | EditPlayerRoute PlayerId
    | NotFoundRoute


type alias PlayerId =
    String


type alias Player =
    { id : PlayerId
    , name : String
    }


type alias Model =
    { players : List Player
    , playerForm : Player
    , name : String
    , route : Route
    }



{--
Find a player by its Id and returns a Maybe Player
--}


findPlayerById : Model -> PlayerId -> Maybe Player
findPlayerById model playerId =
    List.head <|
        List.filter (\player -> player.id == playerId) model.players
