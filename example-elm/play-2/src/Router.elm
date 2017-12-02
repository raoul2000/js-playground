module Router exposing (..)

import Navigation exposing (Location)
import UrlParser exposing (..)
import Model exposing (..)


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map ViewAllRoute top
        , map AboutRoute (s "about")
        , map EditPlayerRoute (s "edit" </> string)
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
