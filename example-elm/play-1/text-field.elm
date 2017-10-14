import Html exposing (Html, Attribute, div, input, text)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)


main =
  Html.beginnerProgram { model = model, view = view, update = update }


-- MODEL

type alias Model =
  { content : String
  }

model : Model
model =
  { content = "" }


-- UPDATE

type Msg
  = Change String

update : Msg -> Model -> Model
update msg model =
  case msg of
    Change newContent ->
      { model | content = newContent }


-- VIEW
myStyle =
  style [
    ("background-color", "red")
  ]

view : Model -> Html Msg
view model =
  div []
    [ input
      [
        myStyle,
        placeholder "Text to reverse",
        onInput Change
      ]
      []
    , div [] [ text (String.reverse model.content) ]
    ]
