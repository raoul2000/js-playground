module Message exposing (..)

import Model exposing (..)


type Msg
    = NoOp
    | NodeSelection Node
    | DeselectAllNodes
    | AddChildNodeToSelectedNode
    | DeleteSelectedNode
    | EditNode Node
    | SaveEdit
    | CancelEdit
    | InputPropertyName String
    | InputSelector String
    | ToggleNodeView Node
    | CollapseAllNodes Bool
