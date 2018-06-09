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
    | ChangeSelection (Maybe ColorOption)


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


toColorOption : String -> Maybe ColorOption
toColorOption string =
    List.filter (\n -> toOptionValue (Tuple.first n) == string) colorOption
        |> List.map (\n -> Tuple.first n)
        |> List.head



-- VIEW


renderColorOption : ColorOption -> ( ColorOption, String ) -> Html Msg
renderColorOption currentValue ( optionValue, optionText ) =
    option
        [ value (optionValue |> toOptionValue)
        , selected (currentValue == optionValue)
        ]
        [ text optionText ]


view : Model -> Html Msg
view model =
    div []
        [ select [ onInput (\selection -> ChangeSelection (toColorOption selection)) ]
            (List.map
                (renderColorOption model)
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

        ChangeSelection Nothing ->
            ( model, Cmd.none )

        ChangeSelection (Just colorOption) ->
            ( colorOption, Cmd.none )



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
