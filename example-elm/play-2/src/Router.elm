module Router exposing (..)

import Navigation exposing (Location)
import UrlParser exposing (..)


type Route
    = ViewAllRoute
    | AboutRoute
    | NotFoundRoute


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map ViewAllRoute top
        , map AboutRoute (s "about")
        ]



-- Returns a route from a Location using the matchers
-- defined above


parseLocation : Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route

        Nothing ->
            NotFoundRoute
