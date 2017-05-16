
export class TaskModel {
    constructor(
      public description: string,
      public completed:boolean
    ){}
}

export class TodolistModel {

  constructor(
    public title: string,
    private id: string,
    private tasks?:Array<TaskModel>
  ) {
  }

  getId() {
    return this.id;
  }
  
  getTasks(){
    if(this.tasks === null) {
      this.tasks = new Array<TaskModel>();
    }
    return this.tasks;
  }
}
