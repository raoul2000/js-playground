import { ExercisePlan } from '../components/workout-runner/model'

export class WorkoutHistoryTracker {
    private maxHistoryItems: number = 20;
    private currentWorkoutLog: WorkoutLogEntry = null;
    private workoutHistory: Array<WorkoutLogEntry> = [];
    private workoutTracked: boolean;

    constructor() {
      console.log('constructor WorkoutHistoryTracker');
    }

    get tracking(): boolean {
        return this.workoutTracked;
    }

    startTracking() {
        this.workoutTracked = true;
        this.currentWorkoutLog = new WorkoutLogEntry(new Date());
        if (this.workoutHistory.length >= this.maxHistoryItems) {
            this.workoutHistory.shift();
        }
        this.workoutHistory.push(this.currentWorkoutLog);
    }

    exerciseComplete(exercise: ExercisePlan) {
        this.currentWorkoutLog.lastExercise = exercise.exercise.title;
        ++this.currentWorkoutLog.exercisesDone;
    }

    endTracking(completed: boolean) {
        this.currentWorkoutLog.completed = completed;
        this.currentWorkoutLog.endedOn = new Date();
        this.currentWorkoutLog = null;
        this.workoutTracked = false;
    };

    getHistory(): Array<WorkoutLogEntry> {
        return this.workoutHistory;
    }

}
export class WorkoutLogEntry {
    constructor(
        public startedOn: Date,
        public completed: boolean = false,
        public exercisesDone: number = 0,
        public lastExercise?: string,
        public endedOn?: Date
    ) { }
}
