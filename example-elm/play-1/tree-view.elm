module App exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


-- example : https://github.com/gribouille/elm-treeview/blob/master/src/Treeview.elm
-- MODEL


type alias Node =
    { id : String
    , name : String
    , state : NodeState
    , children : Children
    }


type Children
    = Children (List Node)


type NodeState
    = Opened
    | Closed


type alias Options =
    { showRootNode : Bool
    }


type alias Model =
    { root : Node
    , options : Options
    }


initialModel : Model
initialModel =
    Model
        (Node "id1"
            "name1"
            Opened
            (Children
                [ Node
                    "id1.1"
                    "name1.1"
                    Opened
                    (Children [])
                , Node
                    "id1.2"
                    "name1.2"
                    Opened
                    (Children
                        [ Node
                            "id1.2.1"
                            "name1.2.1"
                            Opened
                            (Children [])
                        , Node
                            "id1.2.2"
                            "name1.2.2"
                            Opened
                            (Children [])
                        ]
                    )
                , Node
                    "id1.3"
                    "name1.3"
                    Opened
                    (Children [])
                ]
            )
        )
        (Options True)


init : ( Model, Cmd Msg )
init =
    ( initialModel, Cmd.none )



-- MESSAGES


type Msg
    = NoOp
    | ToggleVisibility Node


childrenNodeList : Children -> List Node
childrenNodeList (Children nodeList) =
    nodeList


isEmptyList : List Node -> Bool
isEmptyList nodeList =
    List.length nodeList == 0


nodeHasChildren : Node -> Bool
nodeHasChildren node =
    childrenNodeList node.children
        |> isEmptyList
        |> not

-- VIEW


renderFoldButton : Node -> Html Msg
renderFoldButton node =
    if nodeHasChildren node then
        if node.state == Opened then
            span [ onClick (ToggleVisibility node) ] [ text "[-]" ]
        else
            span [ onClick (ToggleVisibility node) ] [ text "[+]" ]
    else
        span [] []


renderNode : Node -> Html Msg
renderNode node =
    li [ class "node-item" ]
        (List.append
            [ span []
                [ renderFoldButton node
                , text node.id
                ]
            , text " "
            , text node.name
            ]
            (if node.state == Opened then
                List.map renderChildren [ node.children ]
             else
                []
            )
        )


renderChildren : Children -> Html Msg
renderChildren (Children nodeList) =
    if isEmptyList nodeList then
        Html.text ""
    else
        ul []
            (List.map renderNode nodeList)


renderTree : Model -> Html Msg
renderTree model =
    div [ class "tree-view" ]
        [ if model.options.showRootNode then
            ul [ class "root-node" ]
                [ renderNode model.root
                ]
          else
            renderChildren model.root.children
        ]


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "TreeView" ]
        , renderTree model
        ]



-- UPDATE


toggleVisibility : Model -> Node -> Model
toggleVisibility model node =
    { model | root = (toggleItem node.id model.root) }


toggleItem : String -> Node -> Node
toggleItem id node =
    if node.id == Debug.log "node Id" id then
        { node
            | state =
                (if node.state == Opened then
                    Closed
                 else
                    Opened
                )
        }
    else
        { node
            | children = Children (List.map (toggleItem id) (childrenNodeList node.children))
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        ToggleVisibility node ->
            ( toggleVisibility model node, Cmd.none )



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
