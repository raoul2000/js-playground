port module Port exposing (..)
import Model as Model


port sendData : String -> Cmd msg

-- port receiveData : (Model.Model -> msg) -> Sub msg