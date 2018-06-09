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
    ( Green, Cmd.none )



-- MESSAGES


type Msg
    = Expand
    | Collapse
    | ChangeSelection String


toOptionValue : ColorOption -> String
toOptionValue opt =
    case opt of
        Blue ->
            "vblue"

        Green ->
            "vgreen"

        Red ->
            "vred"


colorOption : List ( ColorOption, String )
colorOption =
    [ ( Blue, "blue" )
    , ( Green, "green" )
    , ( Red, "red" )
    ]


stringToColorOption : String -> Maybe ColorOption
stringToColorOption string =
    List.filter (\n -> toOptionValue (Tuple.first n) == string) colorOption
        |> List.map (\n -> Tuple.first n)
        |> List.head



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ select [ onInput (\v -> ChangeSelection v) ]
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
        , text (toOptionValue model)
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

        ChangeSelection value ->
            case stringToColorOption value of
                Just colorOption ->
                    ( colorOption, Cmd.none )

                Nothing ->
                    ( model, Cmd.none )



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
