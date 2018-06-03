module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


-- MODEL


type ColorOption
    = Blue
    | Green
    | Red


type alias Model =
    ColorOption


init : ( Model, Cmd Msg )
init =
    ( Red, Cmd.none )



-- MESSAGES


type Msg
    = Expand
    | Collapse
    | ChangeSelection


toOptionValue : ColorOption -> String
toOptionValue opt =
    case opt of
        Blue ->
            "vblue"

        Green ->
            "vgreen"

        Red ->
            "vred"


colorOption =
    [ ( Blue, "blue" )
    , ( Green, "green" )
    , ( Red, "red" )
    ]



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ select [ onInput ChangeSelection ]
            (List.map
                (\n ->
                    option
                        [ value (Tuple.first n |> toOptionValue)
                        , selected ((Tuple.first n) == model)
                        ]
                        [ text (Tuple.second n) ]
                )
                colorOption
            )
        ]



{--

--}
-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Expand ->
            ( Green, Cmd.none )

        Collapse ->
            ( Red, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
