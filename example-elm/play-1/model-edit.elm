module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)


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


findPlayerById : List Player -> PlayerId -> Maybe Player
findPlayerById list playerId =
    list
        |> List.filter (\player -> player.id == playerId)
        |> List.head



-- MESSAGES


type Msg
    = StartEdit PlayerId
    | StopEdit
    | UpdatePlayerName String
    | SaveChanges



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "players" ]
        , renderPlayersList model
        , renderPlayerForm model
        ]


renderPlayerForm : Model -> Html Msg
renderPlayerForm model =
    case model.playerForm of
        Nothing ->
            div []
                [ text "no edit" ]

        Just player ->
            div []
                [ input
                    [ placeholder "player name"
                    , value player.name
                    , onInput UpdatePlayerName
                    ]
                    []
                , button [ onClick SaveChanges ] [ text "Save" ]
                ]


renderPlayersList : Model -> Html Msg
renderPlayersList model =
    let
        renderSinglePlayer player =
            div []
                [ text player.name
                , button [ onClick (StartEdit player.id) ] [ text "Start edit" ]
                ]
    in
        div []
            (List.map renderSinglePlayer model.players)



-- UPDATE


startEditModel : Model -> PlayerId -> Model
startEditModel model playerId =
    { model | playerForm = (findPlayerById model.players playerId) }


addplayerForm : Model -> List Player
addplayerForm model =
    case model.playerForm of
        Nothing ->
            model.players

        Just player ->
            player :: model.players


updateplayer : Model -> List Player
updateplayer model =
    case model.playerForm of
        Just updatedPlayer ->
            List.map
                (\player ->
                    if player.id == updatedPlayer.id then
                        updatedPlayer
                    else
                        player
                )
                model.players

        Nothing ->
            model.players


stopEditModel : Model -> Model
stopEditModel model =
    { model
        | players = updateplayer model
        , playerForm = Nothing
    }


updatePlayerName : Model -> String -> Model
updatePlayerName model newName =
    case model.playerForm of
        Just player ->
            { model | playerForm = Just { player | name = newName } }

        Nothing ->
            model


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StartEdit playerId ->
            ( startEditModel model playerId, Cmd.none )

        StopEdit ->
            ( stopEditModel model, Cmd.none )

        UpdatePlayerName newName ->
            ( updatePlayerName model newName, Cmd.none )

        SaveChanges ->
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
