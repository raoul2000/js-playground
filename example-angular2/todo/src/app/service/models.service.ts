
export class TaskModel {
    constructor(
      public description: string,
      public completed:boolean,
      public id?:number,
      public listId?:number
    ){}

    getId() {
      return this.id;
    }

    printSomething(){
      console.log("something from task model");
    }


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
