
export class TaskModel {
    constructor(
      public description: string,
      public completed:boolean
    ){}
}

export class TodolistModel {

  constructor(
    public title: string,
    private tasks?:Array<TaskModel>
  ) {
  }

  getTasks(){
    if(this.tasks === null) {
      this.tasks = new Array<TaskModel>();
    }
    return this.tasks;
  }
}
