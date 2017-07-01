export class NodeModel {
  private children: Array<NodeModel> = [];
  private expanded: boolean = true;

  constructor(
    private name,
    private metadata?: any
  ) { }

  getName()     {return this.name;  }
  getMetadata() {return this.metadata; }
  getChildren() { return this.children; }
  hasChildren() { return this.children.length !== 0 ; }
  isExpanded()  { return this.expanded; }
  toggle()      { this.expanded = !this.expanded; }
  addChild(node: NodeModel) { this.children.push(node);  }
}
