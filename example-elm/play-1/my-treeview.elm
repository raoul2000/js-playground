module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


-- MODEL


type Children
    = Children (List Node)


type alias Node =
    { id : String
    , name : String
    , children : Children
    }


type alias Model =
    { tree : Node
    , selectedNodeId : Maybe String
    }


initTree : Node
initTree =
    Node "1"
        "root"
        (Children
            [ Node "2" "child2" (Children [])
            , Node "3" "child3" (Children [])
            , Node "4"
                "child4"
                (Children
                    [ Node "5" "child5" (Children []) ]
                )
            ]
        )


init : ( Model, Cmd Msg )
init =
    ( { tree = initTree, selectedNodeId = Nothing }
    , Cmd.none
    )



-- MESSAGES


type Msg
    = NoOp
    | NodeSelection Node
    | AddChildNode


nodeChildList : Node -> List Node
nodeChildList node =
    case node.children of
        Children nodeList ->
            nodeList


hasNoChildren : Node -> Bool
hasNoChildren node =
    List.isEmpty (nodeChildList node)



-- VIEW


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


renderNode : Model -> Node -> Html Msg
renderNode model node =
    let
        styleSel =
            case model.selectedNodeId of
                Just string ->
                    if node.id == string then
                        "SEL"
                    else
                        "NO"

                Nothing ->
                    "NO"
    in
        li []
            [ div [ onClick (NodeSelection node) ] [ text (node.name ++ styleSel) ]
            , renderChildren model node.children
            ]


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
                    selectedNodeId

                Nothing ->
                    "no selection"
    in
        div []
            [ text txtSelectedNodeId
            ]


renderTreeAction : Model -> Html Msg
renderTreeAction model =
    div []
        [ button [ onClick AddChildNode ] [ text "add child node" ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "my treeview" ]
        , hr [] []
        , renderTreeView model
        , renderTreeInfo model
        , renderTreeAction model
        ]



-- UPDATE


findNodeById : Node -> String -> Maybe Node
findNodeById node id =
    if node.id == id then
        Just node
    else if hasNoChildren node then
        Nothing
    else
        List.head (List.filter (\a -> False) (nodeChildList node))


addChildNode : Model -> Node -> Model
addChildNode model newNode =
    case model.selectedNodeId of
        Just nodeId ->
            model

        Nothing ->
            model


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        NodeSelection selectedNode ->
            ( { model | selectedNodeId = Just selectedNode.id }, Cmd.none )

        AddChildNode ->
            ( addChildNode model (Node "idnew" "namenew" (Children [])), Cmd.none )



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
