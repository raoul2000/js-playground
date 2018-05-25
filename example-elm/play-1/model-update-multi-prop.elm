module Main exposing (..)

import Html exposing (Html, button, div, text, program)
import Html.Events exposing (onClick)


-- MODEL


type alias Model =
    { expand : Bool
    , value : String
    , counter : Int
    }


init : ( Model, Cmd Msg )
init =
    ( Model False "init value" 0, Cmd.none )



-- MESSAGES


type Msg
    = Expand
    | Collapse



-- VIEW


view : Model -> Html Msg
view model =
    let
        divContent =
            if model.expand then
                [ button [ onClick Collapse ] [ text "Collapse" ]
                , text "Widget"
                ]
            else
                [ button [ onClick Expand ] [ text "Expand" ] ]
    in
        div []
            [ text model.value
            , div
                []
                divContent
            ]



-- UPDATE


updateModelOnExpand : Model -> Model
updateModelOnExpand model =
    let
        newValue =
            toString model.counter

        newCounter =
            model.counter + 1
    in
        { model
            | expand = True
            , value = newValue
            , counter = newCounter
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Expand ->
            ( { model
                | expand = True
                , value = toString model.counter
                , counter = model.counter + 1
              }
            , Cmd.none
            )

        Collapse ->
            ( { model | expand = False }, Cmd.none )



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
