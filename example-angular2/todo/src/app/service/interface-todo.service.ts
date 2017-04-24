import { TaskModel } from './models.service';

export interface ITodoService {
  list():Array<TaskModel>;
}
