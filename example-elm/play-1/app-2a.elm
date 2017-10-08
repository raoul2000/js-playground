module Main exposing (..)

import Html exposing (Html, button, div, text, program)
import Html.Events exposing (onClick)


-- MODEL


type alias Model = { visible : Bool, value : Int }
---    Bool


init : ( Model, Cmd Msg )
init =
    ( {visible = False, value = 0 }, Cmd.none )



-- MESSAGES


type Msg
    = Expand
    | Collapse



-- VIEW


view : Model -> Html Msg
view model =
    if model.visible then
        div []
            [ button [ onClick Collapse ] [ text "Collapse" ]
            , text ("Widget" ++ toString model.value)
            ]
    else
        div []
            [ button [ onClick Expand ] [ text "Expand" ]
            , toString model.value
              |> text
            ]

-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Expand ->
            ( { model | visible = True, value = model.value +1 }, Cmd.none )

        Collapse ->
            ( {model | visible = False, value = model.value +1 }, Cmd.none )



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
