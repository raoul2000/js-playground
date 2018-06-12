port module Main exposing (..)

-- Warning, : module must be of type port

import Html exposing (..)
import Html.Events exposing (..)


type alias Model =
    String


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick SendDataToJS ]
            [ text "Send Data to JavaScript" ]
        , pre []
            [ text ("Data received from JavaScript: " ++ model)
            ]
        ]


type Msg
    = SendDataToJS
    | ReceivedDataFromJS Model



-- Here we define the js function name that will be called


port sendData : String -> Cmd msg


port receiveData : (Model -> msg) -> Sub msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SendDataToJS ->
            ( model, sendData "Hello JavaScript!" )

        ReceivedDataFromJS data ->
            ( data, Cmd.none )


init : ( Model, Cmd Msg )
init =
    ( "", Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    receiveData ReceivedDataFromJS


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
