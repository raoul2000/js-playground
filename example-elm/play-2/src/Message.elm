module Message exposing (..)

import Navigation exposing (Location)

type Msg
    = NoOp
    | OnLocationChange Location
    | ChangePlayerName String
    | SavePlayerForm
