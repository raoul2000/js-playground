import { DocumentModel, NodeModel, NodeType } from './model';

export class DocumentParser {

  public static  parseJSONString(json:string): DocumentModel {
    let docResult:DocumentModel = new DocumentModel();
    let obj:any = JSON.parse(json);
    DocumentParser.parseProperty(
      docResult.getRootNode(),
      obj
    );
    return docResult;
  }

  private static parseProperty(node: NodeModel, obj:any):any {
    let childrenKeys = [];
    Object.keys(obj).forEach( k => {
      // detects duplicate name for sibling nodes
      if( childrenKeys.indexOf(k) > -1) {
        throw new Error("duplicate property name : "+k);
      }
      childrenKeys.push(k);
      let child = node.getOwnerDocument().createNode(k);

      let type = obj[k].type || NodeType.text;
      if( typeof type === 'object') {
          //parseProperty(child,type);
      }
      let objType = typeof type === 'object' ? type : null;
      let selector = obj[k].selector;

      child.setType(type);
      child.setSelector(selector);
      node.addChild(child);
    })
  }
}
