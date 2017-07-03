import { UUID } from 'angular2-uuid';

export class DocumentModel {
  private rootNode: NodeModel;

  constructor() {
    this.rootNode = new NodeModel('root');
  }

  getRootNode(): NodeModel { return this.rootNode; }

}

export class NodeModel {
  private id: string;
  private children: Array<NodeModel> = [];
  private ownerDocument:DocumentModel;
  private expanded: boolean = true;
  private selected: boolean = false;

  constructor(
    private name,
    private selector?: string,
    private type?: string,
    private metadata?: any
  ) {
    this.id = UUID.UUID();
  }

  getId():string            { return this.id; }
  getName(): string         { return this.name; }

  getSelector(): string     { return this.selector; }
  setSelector(sel: string)  { this.selector = sel; }

  getType(): string         { return this.type; }
  setType(type: string)     { this.type = type; }


  getMetadata(): any        { return this.metadata; }
  setMetadata(metadata):any { this.metadata = metadata; }

  getChildren(): Array<NodeModel> { return this.children; }
  hasChildren(): boolean { return this.children.length !== 0; }
  isExpanded(): boolean { return this.expanded; }
  toggle(): void { this.expanded = !this.expanded; }
  addChild(node: NodeModel): NodeModel {
    this.children.push(node);
    return this;
  }

  isSelected(): boolean { return this.selected; }
  select(node: NodeModel): void {
    this.selected = this.getId() === node.getId();
    this.children.forEach(n => n.select(node));
  }
  /**
   * Mark this node and all its children as NOT selected
   */
  deselect() {
    this.selected = false;
    this.children.forEach(n => n.deselect());
  }

  removeChild(child: NodeModel) {
    let idx = this.children.findIndex(x => x.getId() === child.getId());
    if (idx > -1) {
      this.children.splice(idx, 1);
    }
  }
}
