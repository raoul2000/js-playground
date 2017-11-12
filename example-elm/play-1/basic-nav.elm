module App exposing (..)

import Html exposing (Html, div, text,a, program)
import Html.Attributes exposing (href)

import Navigation exposing (Location)
import UrlParser exposing (..)

-- ROUTING

type Route
    = ViewRoute
    | AboutRoute
    | EditRoute String
    | NotFoundRoute

matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map ViewRoute  (s "view" )
        , map AboutRoute (s "about")
        , map EditRoute (s "edit" </> string)
        ]

parseLocation : Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route
        Nothing ->
            NotFoundRoute

-- MODEL

type alias Model =   { text : String, route : Route}

initialModel : Route -> Model
initialModel route =
  { text = "hello", route = route }

init : Location -> ( Model, Cmd Msg )
init location =
    let
        currentRoute =
            parseLocation location
    in
        ( initialModel currentRoute, Cmd.none )

-- MESSAGES

type Msg = NoOp
  | OnLocationChange Location

-- VIEW

view : Model -> Html Msg
view model =
    div []
        [ a [ href "#view" ] [ text "view"]
        , text " | "
        , a [href "#about"]  [ text "about"]
        , page model
        ]

page : Model -> Html Msg
page model =
  case model.route of
    ViewRoute ->
      div [] [ text "view route "]
    AboutRoute ->
      div [] [ text "ABOUT route "]
    EditRoute string ->
      div [] [ text  ("EDIT route " ++ string)]
    NotFoundRoute ->
      div [] [ text "NOT FOUND route "]

-- UPDATE

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnLocationChange location ->
            let
                newRoute =
                    parseLocation location
            in
                ( { model | route = newRoute }, Cmd.none )
        NoOp ->
            ( model, Cmd.none )

-- SUBSCRIPTIONS

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
