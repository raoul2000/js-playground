export class NodeModel {
  private children: Array<NodeModel> = [];
  private expanded: boolean = true;
  private selected:boolean = false;

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
  
  isSelected()  { return this.selected; }
  select(node: NodeModel)  {
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
