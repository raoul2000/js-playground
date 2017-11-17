module App exposing (..)

import Html exposing (Html, div, text, program)
import Html.Attributes exposing (..)


-- MODEL


type alias Model =
    String


init : ( Model, Cmd Msg )
init =
    ( "Hello", Cmd.none )



-- MESSAGES


type Msg
    = NoOp



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ div
            [ style
                [ ( "color", "red " )
                , ( "border", "5px solid #eee" )
                , ( "padding", "1em" )
                , ( "margin", "1em" )
                ]
            ]
            [ text "inline CSS style" ]
        , div
            [ class "className1 className2"
            ]
            [ text "CSS Class names" ]
        ]



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
