import { DocumentModel, NodeModel, NodeType } from './model';

export class DocumentSerializer {

  public static serializeToJSON(doc:DocumentModel):any {
    let obj = {};
    DocumentSerializer.serializeObject(
      doc.getRootNode().getChildren(),
      obj
    );
    return obj;
  }

  private static serializeObject(nodes:NodeModel[],obj:any):any {

    nodes.forEach(node => {
      obj[node.getName()] = {
        'selector' : node.getSelector(),
        'type' : DocumentSerializer.serializeType(node)
      };
    });
  }

  private static serializeType(node:NodeModel):any {
    let nodeType = 'text';
    if(node.getType() === NodeType.text) {
        nodeType = 'text';
    } else if(node.getType() === NodeType.html) {
      nodeType = 'html';
    } else if(node.getType() === NodeType.composite) {
      nodeType = DocumentSerializer.serializeObject();
    }
  }
}
