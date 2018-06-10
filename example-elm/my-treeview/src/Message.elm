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
    | InputAttributeName String
    | ToggleIsArray
    | InputSelector String
    | ToggleNodeView Node
    | CollapseAllNodes Bool
    | ChangePropertyTypeSelection (Maybe PropertyType)
