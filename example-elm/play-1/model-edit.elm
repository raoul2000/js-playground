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
    = StartEditPlayer PlayerId
    | UpdatePlayerName String
    | SaveChanges
    | CancelEditPlayer



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
                , button [ onClick CancelEditPlayer ] [ text "Cancel" ]
                ]


renderPlayersList : Model -> Html Msg
renderPlayersList model =
    let
        renderSinglePlayer player =
            li []
                [ text player.name
                , if model.playerForm == Nothing then
                    button [ onClick (StartEditPlayer player.id) ] [ text "Start edit" ]
                  else
                    div [] []
                ]
    in
        ul []
            (List.map renderSinglePlayer model.players)



-- UPDATE

{--
Start edition of player by Id. Assign the player form to the model of the matching
player
--}
startEditModel : Model -> PlayerId -> Model
startEditModel model playerId =
    { model | playerForm = (findPlayerById model.players playerId) }

{--
Modifies the player list of the model by replacing the model of playerId with
the player form if it is no empty. Returns the updated player list.
If no player form is available, returns the player list with no change
--}
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

{--
Clears the player form and returns the model
--}
cancelEditplayer : Model -> Model
cancelEditplayer model =
    { model | playerForm = Nothing }

{--
Clear the player form and updates the player list
--}
stopEditModel : Model -> Model
stopEditModel model =
    { model
        | players = updateplayer model
        , playerForm = Nothing
    }

{--
Modofies the player form name with the value passed as argument and returns the
updated model
--}
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
        StartEditPlayer playerId ->
            -- copy the model of player 'plauerId' to the player form which is
            -- going to be modified by user
            ( startEditModel model playerId, Cmd.none )

        UpdatePlayerName newName ->
            -- the player is being edited, its name
            ( updatePlayerName model newName, Cmd.none )

        SaveChanges ->
            -- player edit is done : update the player model with
            -- values entered in the player form
            ( stopEditModel model, Cmd.none )

        CancelEditPlayer ->
            -- user canceled player edition
            ( cancelEditplayer model, Cmd.none )



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
