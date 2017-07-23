import { DocumentModel, NodeModel, NodeType } from './model';

export class DocumentSerializer {

  public static serializeToJSON(doc:DocumentModel):any {
    let objResult = DocumentSerializer.serializeObject(
      doc.getRootNode().getChildren()
    );
    objResult['__document'] = {
      "id" : doc.getId(),
      "name" : doc.getName()
    }
    return objResult;
  }

  private static serializeObject(nodes:NodeModel[]):any {
    let obj = {};
    nodes.forEach(node => {
      obj[node.getName()] = {
        'selector' : node.getSelector(),
        'type' : DocumentSerializer.serializeType(node)
      };
    });
    return obj;
  }

  private static serializeType(node:NodeModel):any {
    let nodeType = 'text';

    if(node.getType() === NodeType.text) {
        nodeType = 'text';
    } else if(node.getType() === NodeType.html) {
      nodeType = 'html';
    } else if(node.getType() === NodeType.attribute) {
      nodeType = '@'+node.getAttrName();
    } else if(node.getType() === NodeType.composite) {
      nodeType = DocumentSerializer.serializeObject(
        node.getChildren()
      );
    } else {
      throw new Error("invalid value type : "+node.getType());
    }
    if( node.getList() === true) {
      return  [nodeType];
    } else {
      return nodeType;
    }
  }
}
