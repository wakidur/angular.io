Model ----------------
Exercise
	public name: string,
    public title: string,
    public description: string,
    public image: string,
    public nameSound?: string,
    public procedure?: string,
    public videos?: Array<string>

ExercisePlan
	public exercise: Exercise, 
	public duration: number


WorkoutPlan
	public name: string,
    public title: string,
    public restBetweenExercise: number,
    public exercises: ExercisePlan[],
    public description?: string
	
	totalWorkoutDuration(): number {}

ExerciseProgressEvent
	 public exercise: ExercisePlan,
    public runningFor: number,
    public timeRemaining: number,
    public workoutTimeRemaining: number

ExerciseChangedEvent
	public current: ExercisePlan,
    public next: ExercisePlan

WorkoutLogEntry
	public startedOn: Date,
    public completed: boolean = false,
    public exercisesDone: number = 0,
    public lastExercise?: string,
    public endedOn?: Date
	
Core Module --------------------
	LocalStorageService
		getItem()
		setItem()
	WorkoutHistoryTrackerService
		startTracking()
		exerciseComplete()
		endTracking()
		getHistory()