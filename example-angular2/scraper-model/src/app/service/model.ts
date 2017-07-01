export class NodeModel {
  private children:Array<NodeModel> = [];
  private expanded:boolean = true;

  constructor(
    private name,
    private metadata?:any
  ) {}

  getName() {
    return this.name;
  }

  getMetadata(){
    return this.metadata;
  }

  addChild(node:NodeModel) {
    this.children.push(node);
  }
  getChildren() {
    return this.children;
  }
  isExpanded() {
    return this.expanded;
  }
}
