import Html exposing (..)
import Html.Events exposing (..)
import Random exposing (..)

type alias Model = { diceFace : Int }

model : Model
model = { diceFace = 1 }

type Msg = Roll | NewFace Int

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Roll ->
      (model, Random.generate NewFace (Random.int 1 6 ))

    NewFace newFace ->
      ( Model newFace, Cmd.none )


view : Model -> Html Msg
view  model =
  div []
  [
    h1 [] [ text (toString model.diceFace)]
  , button [ onClick Roll ] [ text "Roll"]
  ]


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

init : ( Model, Cmd Msg)
init =
  ( model , Cmd.none)

main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
