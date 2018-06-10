module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode exposing (..)


-- MODEL


type alias Object =
    { name : String
    , age : Int
    }


initObject : Object
initObject =
    Object "Bobby" 12


type alias Model =
    { object : Object
    , asString : String
    , message : String
    }


initModel : Model
initModel =
    Model initObject "{\"name\" : \"Peter\", \"age\" : 33}" ""


init : ( Model, Cmd Msg )
init =
    ( initModel, Cmd.none )


objectDecoder : Decoder Object
objectDecoder =
    map2 Object
        (field "name" string)
        (field "age" int)



-- MESSAGES


type Msg
    = Decode
    | WorkNow (Result String Object)
    | CommitJSON String



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick (WorkNow (decodeString objectDecoder model.asString)) ] [ text "Decode" ]
        , div [] [ text model.message ]
        , textarea
            [ style
                [ ( "width", "100%" )
                , ( "height", "200px" )
                ]
            , onInput CommitJSON
            ]
            [ text model.asString ]
        , ul []
            [ li [] [ text ("name : " ++ model.object.name) ]
            , li [] [ text ("age : " ++ (toString model.object.age)) ]
            ]
        ]



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CommitJSON str ->
            ( { model
                | asString = str
              }
            , Cmd.none
            )

        Decode ->
            ( model, Cmd.none )

        WorkNow (Ok obj) ->
            ( { model
                | object = obj
              }
            , Cmd.none
            )

        WorkNow (Err msg) ->
            ( { model
                | message = msg
              }
            , Cmd.none
            )



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
