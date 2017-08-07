import { UUID } from 'angular2-uuid';

// use NodeType[NodeType.text] returns 'text'
export const enum NodeType {
  text, html, attribute, composite
}

export class DocumentSummary {
  constructor(
    private id:string,
    private name:string
  ){}

  public getId():string {
    return this.id;
  }
  public getName():string {
    return this.name;
  }
}

export class DocumentModel {
  private rootNode: NodeModel;
  private name:string;

  constructor(private id?:string) {
    this.id = id || UUID.UUID();
    this.rootNode = new NodeModel('root',this);
    this.rootNode.setType(NodeType.composite);
  }
  getId():string { return this.id;}

  createNode(name:string):NodeModel {
    return new NodeModel(name,this);
  }
  getRootNode(): NodeModel { return this.rootNode; }
  select(node?:NodeModel) {
    this.rootNode.select(node);
  }

  equal(otherDocument:DocumentModel):boolean {
    return this.getId() === otherDocument.getId();
  }
  getName():string {
    return this.name;
  }
  setName(name:string) {
    this.name = name;
  }
}

export class NodeModel {
  private id: string;

  private parent?:NodeModel;
  private children: Array<NodeModel> = [];
  private expanded: boolean = false;
  private selected: boolean = false;

  private selector:string;
  private type:NodeType = NodeType.text;
  private attrName:string;
  private metadata:any = {};
  private list:boolean = false;

  constructor(
    private name: string,
    private ownerDocument:DocumentModel
  ) {
    this.id = UUID.UUID();
  }
  private checkSameOwnerDocument(node:NodeModel) {
    if( ! this.getOwnerDocument().equal(node.getOwnerDocument())) {
      throw new Error(`node ${node.getId()} doesn't belong to the same document`);
    }
  }
  getId():string            { return this.id; }
  getName(): string         { return this.name; }

  getOwnerDocument():DocumentModel {
    return this.ownerDocument;
  }

  getParent():NodeModel { return this.parent;}
  setParent(node:NodeModel):NodeModel {
    this.checkSameOwnerDocument(node);
    this.parent = node;
    return this;
  }
  getList():boolean { return this.list;}
  setList(v:boolean) { this.list = v;}

  getSelector(): string     { return this.selector; }
  setSelector(sel: string):NodeModel  {
    this.selector = sel;
    return this;
  }

  getType(): NodeType         { return this.type; }
  setType(type: NodeType):NodeModel {
    this.type = type;
    return this;
  }

  getAttrName(): string         { return this.attrName; }
  setAttrName(attrName: string):NodeModel {
    this.attrName = attrName;
    return this;
  }

  getMetadata(): any        { return this.metadata; }
  setMetadata(metadata):NodeModel {
    this.metadata = metadata;
    return this;
  }

  getChildren(): Array<NodeModel> { return this.children; }
  hasChildren(): boolean { return this.children.length !== 0; }
  isRootNode():boolean { return this.getId() === this.getOwnerDocument().getRootNode().getId()}
  isComposite():boolean { return this.type === NodeType.composite ;}

  addChild(node: NodeModel): NodeModel {
    this.checkSameOwnerDocument(node);
    node.setParent(this);
    this.children.push(node);
    return this;
  }

  isExpanded(): boolean { return this.expanded; }
  setExpanded(expanded:boolean) { return this.expanded = expanded; }
  toggle(): void { this.expanded = !this.expanded; }

  isSelected(): boolean { return this.selected; }
  select(node?: NodeModel): void {
    if( ! node ) {
      this.selected = false;
    } else {
      this.checkSameOwnerDocument(node);
      this.selected = this.getId() === node.getId();
    }
    this.children.forEach(n => n.select(node));
  }
  /**
   * Mark this node and all its children as NOT selected
   */
  deselect() {
    this.selected = false;
    this.children.forEach(n => n.deselect());
  }

  remove() {
    let success:boolean = false;
    let parent:NodeModel = this.getParent();
    if(parent) {
      this.getParent().removeChild(this);
      success = true;
    }
    return success;
  }
  removeChild(child: NodeModel):boolean {
    this.checkSameOwnerDocument(child);
    let success:boolean = false;
    let idx:number = this.children.findIndex(x => x.getId() === child.getId());
    if (idx > -1) {
      this.children.splice(idx, 1);
    }
    return success;
  }
}
