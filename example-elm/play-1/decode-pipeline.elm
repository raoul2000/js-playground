module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode exposing (..)
import Json.Decode.Pipeline as JDP exposing (decode, required, optional, requiredAt, optionalAt)


-- MODEL


type Role
    = Manager
    | Employee
    | Chief


type alias Object =
    { name : String
    , age : Int
    , role : Role
    }


stringObject1 : String
stringObject1 =
    """
        {
            "name" : "Arthur",
            "age"  : 22,
            "role" : "Employee"
        }
"""


initObject : Object
initObject =
    Object "Bobby" 12 Manager


type alias Model =
    { object : Object
    , asString : String
    , message : String
    }


initModel : Model
initModel =
    Model initObject stringObject1 ""


init : ( Model, Cmd Msg )
init =
    ( initModel, Cmd.none )


roleDecoder : Decoder Role
roleDecoder =
    let
        convert : String -> Decoder Role
        convert a =
            case a of
                "Manager" ->
                    succeed Manager

                "Employee" ->
                    succeed Employee

                "Chief" ->
                    succeed Chief

                _ ->
                    fail <|
                        "Trying to decode Role, but value \""
                            ++ a
                            ++ "\" is not supported."
    in
        string |> andThen convert


objectDecoder : Decoder Object
objectDecoder =
    decode Object
        |> JDP.required "name" string
        |> JDP.required "age" int
        |> JDP.required "role" roleDecoder



-- MESSAGES


type Msg
    = Decode
    | WorkNow (Result String Object)
    | CommitJSON String



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Json.Decode.Pipeline"]
        , button [ onClick (WorkNow (decodeString objectDecoder model.asString)) ] [ text "Decode" ]
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
            , li [] [ text ("role : " ++ (toString model.object.role)) ]
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
