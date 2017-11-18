module App exposing (..)

--import Html exposing (Html,  div, text, program)

import Html exposing (..)
import Html.Attributes exposing (..)


-- MODEL


type alias Node =
    { id : String
    , name : String
    , children : Children
    }


type Children
    = Children (List Node)


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
            (Children
                [ Node
                    "id1.1"
                    "name1.1"
                    (Children [])
                , Node
                    "id1.2"
                    "name1.2"
                    (Children
                        [ Node
                            "id1.2.1"
                            "name1.2.1"
                            (Children [])
                        , Node
                            "id1.2.2"
                            "name1.2.2"
                            (Children [])
                        ]
                    )
                , Node
                    "id1.3"
                    "name1.3"
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



-- VIEW


isEmptyList : List Node -> Bool
isEmptyList nodeList =
    List.length nodeList == 0


renderChildren : Children -> Html Msg
renderChildren children =
    case children of
        Children nodeList ->
            if isEmptyList nodeList then
                Html.text ""
            else
                ul []
                    (List.map renderNode nodeList)


renderNode : Node -> Html Msg
renderNode node =
    li [ class "node-item" ]
        (List.append
            [ text node.id
            , text " "
            , text node.name
            ]
            (List.map renderChildren [ node.children ])
        )


renderTree : Model -> Html Msg
renderTree model =
    div [ class "tree-view"]
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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
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
