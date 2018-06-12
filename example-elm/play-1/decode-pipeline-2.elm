module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode exposing (..)
import Json.Decode.Pipeline as JDP exposing (decode, required, optional, requiredAt, optionalAt)

import Json.Encode exposing (encode, Value, string, int, float, bool, list, object)

-- MODEL


type alias NodeId =
    String


type Children
    = Children (List Node)


type alias Node =
    { id : NodeId
    , children : Children
    }


type alias Model =
    { tree : Node
    , maxNodeId : Int
    , asString : String
    , message : String
    }


createNodeId : Model -> NodeId
createNodeId model =
    "node-" ++ toString model.maxNodeId


createSampleTree : Node
createSampleTree =
    Node "0"
        (Children
            [ Node "2" (Children [])
            , Node "3" (Children [])
            , Node "4"
                (Children
                    [ Node "5" (Children [])
                    , Node "6" (Children [])
                    ]
                )
            ]
        )


treeAsString : String
treeAsString =
    """
        {
            "id" : "Arthur",
            "children"  : [
                { "id" : "bob", "children" : []},
                { "id" : "Pat", "children" : []}
            ]
        }
"""


initModel : Model
initModel =
    Model createSampleTree 7 treeAsString ""


init : ( Model, Cmd Msg )
init =
    ( initModel, Cmd.none )


nodeidDecoder : Decoder NodeId
nodeidDecoder =
    succeed (toString Json.Decode.string)


nodeDecoder : Decoder Node
nodeDecoder =
    decode Node
        |> JDP.required "id" Json.Decode.string
        |> JDP.required "children" childrenDecoder


childrenDecoder : Decoder Children
childrenDecoder =
    Json.Decode.map Children (Json.Decode.list (Json.Decode.lazy (\_ -> nodeDecoder)))


nodeEncoder : Node -> Json.Encode.Value
nodeEncoder node = 
    Json.Encode.object 
    [ ( "id", Json.Encode.string node.id)
    , ( "children" , Json.Encode.list (List.map (\c -> nodeEncoder c) (childrenNodeList node.children) ))
    ]

nodeToJson : Node -> String
nodeToJson node =
    Json.Encode.encode 2 (nodeEncoder node)
-- MESSAGES


type Msg
    = Decode
    | WorkNow (Result String Node)
    | CommitJSON String


childrenNodeList : Children -> List Node
childrenNodeList (Children nodeList) =
    nodeList



-- VIEW


renderChildren : Children -> Html Msg
renderChildren (Children nodeList) =
    if List.isEmpty nodeList then
        Html.text ""
    else
        ul []
            (List.map renderNode nodeList)


renderNode : Node -> Html Msg
renderNode node =
    li [ class "node-item" ]
        (List.append
            [ span []
                [ text (node.id ++ " children count = ")
                , childrenNodeList node.children
                    |> List.length
                    |> toString
                    |> text
                ]
            ]
            (List.map renderChildren [ node.children ])
        )


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Json.Decode.Pipeline" ]
        , button [ onClick (WorkNow (decodeString nodeDecoder model.asString)) ] [ text "Decode" ]
        , div [] [ text model.message ]
        , textarea
            [ style
                [ ( "width", "100%" )
                , ( "height", "200px" )
                ]
            , onInput CommitJSON
            ]
            [ text model.asString ]
        , ul [] [ renderNode model.tree ]
        , hr [] []
        , pre [] [ text (nodeToJson model.tree)]
        ]



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CommitJSON str ->
            ( { model
                | asString = str
              }
            , Cmd.none
            )

        Decode ->
            ( model, Cmd.none )

        WorkNow (Ok obj) ->
            ( { model
                | tree = obj
              }
            , Cmd.none
            )

        WorkNow (Err msg) ->
            ( { model
                | message = msg
              }
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
