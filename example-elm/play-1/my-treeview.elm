module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


-- MODEL


type alias NodeId =
    String


type Children
    = Children (List Node)


type alias NodeData =
    { propName : String
    , selector : String
    , propType : String
    }


type alias Node =
    { id : NodeId
    , name : String
    , data : NodeData
    , children : Children
    }


type alias Model =
    { tree : Node
    , selectedNodeId : Maybe NodeId
    , maxNodeId : Int
    , viewMode : Bool
    }


initTree : Node
initTree =
    Node "0"
        "root"
        (NodeData "pName" "selector" "type")
        (Children
            [ Node "2" "child2" (NodeData "pName" "selector" "type") (Children [])
            , Node "3" "child3" (NodeData "pName" "selector" "type") (Children [])
            , Node "4"
                "child4"
                (NodeData "pName" "selector" "type")
                (Children
                    [ Node "5" "child5" (NodeData "pName" "selector" "type") (Children []) ]
                )
            ]
        )


init : ( Model, Cmd Msg )
init =
    ( { tree = initTree, selectedNodeId = Nothing, maxNodeId = 5, viewMode = True }
    , Cmd.none
    )



-- MESSAGES


type Msg
    = NoOp
    | NodeSelection Node
    | DeselectAllNodes
    | AddChildNodeToSelection
    | DeleteSelectedNode
    | EditNode Node



{--
Return node children as a List of Nodes
--}


nodeChildList : Node -> List Node
nodeChildList node =
    case node.children of
        Children nodeList ->
            nodeList


hasNoChildren : Node -> Bool
hasNoChildren node =
    List.isEmpty (nodeChildList node)



-- VIEW


selectedNodeStyle : Attribute msg
selectedNodeStyle =
    style
        [ ( "background-color", "black" )
        , ( "color", "white" )
        ]


renderNode : Model -> Node -> Html Msg
renderNode model node =
    let
        nodeStyle =
            case model.selectedNodeId of
                Just string ->
                    if node.id == string then
                        selectedNodeStyle
                    else
                        style []

                Nothing ->
                    style []
    in
        li []
            [ div
                [ nodeStyle
                , onClick (NodeSelection node)
                ]
                [ text node.name ]
            , renderChildren model node.children
            ]


renderChildren : Model -> Children -> Html Msg
renderChildren model (Children nodeList) =
    if List.length nodeList == 0 then
        text ""
    else
        ul []
            (List.map
                (renderNode model)
                nodeList
            )


renderTreeView : Model -> Html Msg
renderTreeView model =
    ul []
        [ renderNode model model.tree
        ]


renderTreeInfo : Model -> Html Msg
renderTreeInfo model =
    let
        txtSelectedNodeId =
            case model.selectedNodeId of
                Just selectedNodeId ->
                    selectedNodeId ++ " viewMode = " ++ (toString model.viewMode)

                Nothing ->
                    "no selection"
    in
        div []
            [ text txtSelectedNodeId
            ]


renderToolbar : Model -> Html Msg
renderToolbar model =
    div []
        [ button [ onClick AddChildNodeToSelection ] [ text "add child node" ]
        , text " "
        , button [ onClick DeleteSelectedNode ] [ text "Delete Node" ]
        , text " "
        , button [ onClick DeselectAllNodes ] [ text "Deselect All Nodes" ]
        ]


renderSelectedNodeView : Node -> Html Msg
renderSelectedNodeView node =
    div []
        [ div [] [ text ("property Name : " ++ node.data.propName) ]
        , div [] [ text ("Selector : " ++ node.data.selector) ]
        , div [] [ text ("Type : " ++ node.data.propType) ]
        , button [ onClick (EditNode node) ] [ text "Edit" ]
        ]


renderNodeEditForm : Node -> Html Msg
renderNodeEditForm node =
    div [] [ text "form" ]


renderRightPanel : Model -> Html Msg
renderRightPanel model =
    case model.selectedNodeId of
        Just nodeId ->
            case (findNodeById nodeId model.tree) of
                Just selectedNode ->
                    if model.viewMode then
                        renderSelectedNodeView selectedNode
                    else
                        renderNodeEditForm selectedNode

                Nothing ->
                    div [] [ text "select a node" ]

        Nothing ->
            div [] [ text "select a node" ]


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "my treeview" ]
        , hr [] []
        , div
            [ style
                [ ( "width", "49%" )
                , ( "float", "left" )
                , ( "border-right", "4px solid #cccccc" )
                , ( "margin", "2px" )
                ]
            ]
            [ renderTreeInfo model
            , renderToolbar model
            , renderTreeView model
            ]
        , div [ style [ ( "margin", "2px" ) ] ]
            [ renderRightPanel model ]
        ]



-- UPDATE


findNodes : Node -> (Node -> Bool) -> List Node
findNodes node matchFunction =
    if (matchFunction node) then
        [ node ]
    else
        nodeChildList node
            |> List.map (\childNode -> findNodes childNode matchFunction)
            |> List.concat


findNodeById : NodeId -> Node -> Maybe Node
findNodeById nodeId rootNode =
    (\n -> n.id == nodeId)
        |> findNodes rootNode
        |> List.head


appendChild : Node -> Node -> Node
appendChild target newNode =
    { target
        | children =
            Children (List.append (nodeChildList target) [ newNode ])
    }


appendChildById : NodeId -> Node -> Node -> Node
appendChildById nodeId nodeToAppend rootNode =
    if rootNode.id == nodeId then
        appendChild rootNode nodeToAppend
    else
        { rootNode
            | children =
                Children
                    (nodeChildList rootNode
                        |> List.map (appendChildById nodeId nodeToAppend)
                    )
        }


isChildNode : NodeId -> Node -> Bool
isChildNode nodeId node =
    List.filter (\node -> node.id == nodeId) (nodeChildList node)
        |> List.isEmpty
        |> not



{--
Delete a node by its Id, among all descendants of a given parentNode.
--}


deleteNodeById : NodeId -> Node -> Node
deleteNodeById nodeId parentNode =
    if not (isChildNode nodeId parentNode) then
        { parentNode
            | children =
                Children
                    (nodeChildList parentNode
                        |> List.map (deleteNodeById nodeId)
                    )
        }
    else
        { parentNode
            | children =
                Children
                    (nodeChildList parentNode
                        |> List.filter (\node -> node.id /= nodeId)
                    )
        }


createNodeId : Model -> NodeId
createNodeId model =
    "node-" ++ toString model.maxNodeId


createNode : Model -> Node
createNode model =
    Node (createNodeId model) (toString model.maxNodeId) (NodeData "pName" "selector" "type") (Children [])


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        EditNode node ->
            ( { model
                | viewMode = False
              }
            , Cmd.none
            )

        {--
        Updates the selectedNodeId property
        --}
        NodeSelection selectedNode ->
            ( { model | selectedNodeId = Just selectedNode.id }, Cmd.none )

        {--
        add a node as children of the selected node. If no node is selected
        this function has no effect and returns the model unmodified
        --}
        AddChildNodeToSelection ->
            case model.selectedNodeId of
                Just nodeId ->
                    let
                        newNode =
                            createNode model
                    in
                        ( { model
                            | tree = appendChildById nodeId newNode model.tree
                            , selectedNodeId = Just newNode.id
                            , maxNodeId = model.maxNodeId + 1
                          }
                        , Cmd.none
                        )

                Nothing ->
                    ( model, Cmd.none )

        DeselectAllNodes ->
            ( { model | selectedNodeId = Nothing }
            , Cmd.none
            )

        {--
        Delete selected node and all its descendants.
        --}
        DeleteSelectedNode ->
            case model.selectedNodeId of
                Just nodeId ->
                    ( { model
                        | tree = deleteNodeById nodeId model.tree
                        , selectedNodeId = Nothing
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
