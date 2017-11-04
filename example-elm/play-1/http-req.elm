import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

-- Model
type alias Model = {
  topic : String,
  gifUrl : String,
  busy : Bool
}

init : (Model, Cmd Msg)
init = (Model "cats" "waiting.gif" False,  getRandomGif "cats" )

-- update
type Msg =
  MorePlease
  | NewGif (Result Http.Error String)

update : Msg -> Model -> (Model, Cmd Msg)
update  msg model =
  case msg of
    MorePlease ->
      (
      { model | busy = True },
        getRandomGif model.topic
      )
    NewGif (Ok newUrl) ->
      (
        { model | gifUrl = newUrl , busy = False},
        Cmd.none
      )
    NewGif (Err _) ->
      (
        model,
        Cmd.none
      )

getRandomGif : String -> Cmd Msg
getRandomGif topic =
  let
    url =
      "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" ++ topic

    request =
      Http.get url decodeGifUrl
  in
    Http.send NewGif request

decodeGifUrl : Decode.Decoder String
decodeGifUrl =
  Decode.at ["data", "image_url"] Decode.string

-- view

view : Model -> Html Msg
view model =
  div []
    [
      h2 [] [ text model.topic ]
    , img [ src  model.gifUrl ] []
    , button [ onClick MorePlease ] [ text ("More Please ! " ++ toString model.busy)]
    ]


main =
  Html.program
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }
