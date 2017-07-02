export class DocumentModel {
  private rootNode:NodeModel;

  constructor() {
    this.rootNode = new NodeModel('root');
  }

  getRootNode():NodeModel { return this.rootNode;}

}

export class NodeModel {
  private children: Array<NodeModel> = [];
  private expanded: boolean = true;
  private selected:boolean = false;

  constructor(
    private name,
    private metadata?: any
  ) { }

  getName():String     {return this.name;  }
  getMetadata():any {return this.metadata; }
  getChildren():Array<NodeModel> { return this.children; }
  hasChildren():boolean { return this.children.length !== 0 ; }
  isExpanded():boolean  { return this.expanded; }
  toggle() :void     { this.expanded = !this.expanded; }
  addChild(node: NodeModel):NodeModel {
    this.children.push(node);
    return this;
  }

  isSelected():boolean  { return this.selected; }
  select(node: NodeModel):void   {
    if( this.name === node.name) {
      this.selected = true;
    } else {
      this.selected = false;
    }
    this.children.forEach(n => n.select(node));
  }
  /**
   * Mark this node and all its children as unselected
   */
  deselect() {
    this.selected = false;
    this.children.forEach(n => n.deselect());
  }
}
