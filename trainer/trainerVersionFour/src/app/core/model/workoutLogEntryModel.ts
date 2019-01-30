export class WorkoutLogEntry {
  constructor(
    public startedOn: Date,
    public completed: boolean = false,
    public exercisesDone: number = 0,
    public lastExercise?: string,
    public endedOn?: Date
  ) {}
}


export class WorkoutLogEntryForm {
  public startedOn: Date;
  public completed: boolean;
  public exercisesDone: number;
  public lastExercise?: string;
  public endedOn?: Date;
}
