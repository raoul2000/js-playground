module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (onClick)


-- MODEL


type alias PlayerId =
    String


type alias Player =
    { id : PlayerId
    , name : String
    }


type alias Model =
    { players : List Player
    , playerForm : Maybe Player
    }


init : ( Model, Cmd Msg )
init =
    ( { players =
            [ Player "1" "tom"
            , Player "2" "bob"
            , Player "3" "alf"
            ]
      , playerForm = Nothing
      }
    , Cmd.none
    )



-- MESSAGES


type Msg
    = StartEdit
    | StopEdit



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "players"]
        , renderPlayers model
        , renderPlayerForm model

        ]
{--
    if model.playerForm == Nothing then
        div []
            [ button [ onClick StartEdit ] [ text "Start edit" ]
            , text "Widget"
            ]
    else
        div []
            [ button [ onClick StopEdit ] [ text "Stop edit" ]
            , text "Widget"
            ]
--}

renderPlayerForm : Model -> Html Msg
renderPlayerForm model =
    _

renderPlayers : Model -> Html Msg
renderPlayers model =
    let
        renderSinglePlayer player =     div []
                [ text player.name
                , button [ onClick StartEdit ] [ text "Start edit" ]
                ]

    in
      div []
      (List.map renderSinglePlayer model.players)


-- UPDATE


startEditModel : Model -> Model
startEditModel model =
    { model | playerForm = Just (Player "0" "New") }


addplayerForm : Model -> List Player
addplayerForm model =
    case model.playerForm of
        Nothing ->
            model.players

        Just player ->
            player :: model.players


stopEditModel : Model -> Model
stopEditModel model =
    { model
        | players = addplayerForm model
        , playerForm = Nothing
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StartEdit ->
            ( startEditModel model, Cmd.none )

        StopEdit ->
            ( stopEditModel model, Cmd.none )



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
