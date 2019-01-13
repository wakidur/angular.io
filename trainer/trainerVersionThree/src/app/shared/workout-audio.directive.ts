import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appWorkoutAudio]",
  exportAs: "WorkoutAudio"
})
export class WorkoutAudioDirective {
  private audioPlayer: HTMLAudioElement;
  constructor(public element: ElementRef) {
    this.audioPlayer = element.nativeElement;
  }

  /**
   * stop
   */
  public stop() {
    this.audioPlayer.pause();
  }

  /**
   * start
   */
  public start() {
    this.audioPlayer.play();
  }

  public get currentTime(): number {
    return this.audioPlayer.currentTime;
  }
  public get duration(): number {
    return this.audioPlayer.duration;
  }
  public get playbackComplete(): boolean {
    return this.duration == this.currentTime;
  }
}
