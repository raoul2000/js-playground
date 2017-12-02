module About exposing (about)

import Model exposing (..)
import Message exposing (Msg(..))
import Html exposing (Html, div, text,a,  program)

aboutText : String
aboutText
  = """
    This is the ABout page
    """


about : Model -> Html Msg
about model =
    div []
    [ text aboutText]
