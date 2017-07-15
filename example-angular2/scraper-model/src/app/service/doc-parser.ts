import { DocumentModel, NodeModel, NodeType } from './model';

export class DocumentParser {

  public static  parseJSONString(data:any): DocumentModel {

    let obj = typeof data === 'object' ? data : JSON.parse(data);
    let docInfo = obj['__document'];
    let docResult:DocumentModel = docInfo
      ? new DocumentModel(docInfo.id)
      : new DocumentModel();
    if(docInfo.name) {
      docResult.setName(docInfo.name);
    }

    DocumentParser.parseObject(
      obj,
      docResult.getRootNode()
    );
    console.log("DocumentModel result : ",docResult);
    return docResult;
  }
  //
  // obj = {
  //  'title' : {...}
  //  'body' : { ...}
  // }
  private static parseObject(obj:any, parentNode:NodeModel):void {
    console.log('processing object :',obj);
    let childrenKeys = [];
    Object.keys(obj)
    .filter( propName => propName !== '__document') // ignore document info node
    .forEach( propName => {
      console.log('processing property :',propName);
        let propValue = obj[propName];

        // detects duplicate name for sibling nodes
        if( childrenKeys.indexOf(propName) > -1) {
          throw new Error("duplicate property name : "+propName);
        }
        childrenKeys.push(propName);

        // create a node for this property
        let node = parentNode.getOwnerDocument().createNode(propName);

        // add node to parent
        parentNode.addChild(node);

        // complete node definition
        DocumentParser.parseProperty(propValue, node);
    });
  }
  // prop = {
  //  'selector' : 'string',
  //  'type' : {} | [] | 'string'
  // }
  private static parseProperty(prop:any, node:NodeModel) {
    // set nodes simple properties
    node.setSelector(prop.selector);

    // define what is this property type
    let propType = DocumentParser.parsePropertyType(prop.type);
    node.setType(propType.type);
    node.setList(propType.array);

    if( node.getType() === NodeType.composite ) {
      DocumentParser.parseObject(
        propType.value,
        node
      );
    }
  }

  private static parsePropertyType(propValue:any):any {
    let result:any = {
      'value' : null,
      'type'  : NodeType.text,  // default value type is 'text'
      'array' : false
    };

    if( propValue ) {

      // if it's an array, validate that it contains only one item
      // and consider this item as the type definition
      if( Array.isArray(propValue)) {
        if( propValue.length !== 1) {
          throw new Error("invalid value type : array must contain extactly one item");
        }
        propValue = propValue[0];
        result.array = true;
      }
      // simple case : value type is a string
      if( typeof propValue === "string") {
        switch(propValue.toLowerCase()) {
          case 'text': result.type = NodeType.text; break;
          case 'html': result.type = NodeType.html; break;
          default:
            throw new Error("invalid value type : "+propValue);
        }
      } else if(typeof propValue === 'object') {
        // we have a composite value type
        result.type = NodeType.composite;
        result.value = propValue;
      } else {
        throw new Error("invalid value type : "+propValue+" is not supported");
      }
    }
    return result;
  }
}
