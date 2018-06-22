module Message exposing (..)

import Model.Node as Node
import Model.NodeData as NodeData


type Msg
    = NoOp
    | NodeSelection Node.Node
    | DeselectAllNodes
    | AddChildNodeToSelectedNode
    | DeleteSelectedNode
    | EditNode Node.Node
    | SaveEdit
    | CancelEdit
    | InputPropertyName String
    | InputAttributeName String
    | ToggleIsArray
    | InputSelector String
    | ToggleNodeView Node.Node
    | CollapseAllNodes Bool
    | ChangePropertyTypeSelection (Maybe NodeData.PropertyType)
