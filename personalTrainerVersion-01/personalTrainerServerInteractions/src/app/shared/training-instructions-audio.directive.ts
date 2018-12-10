import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appTrainingInstructionsAudioDirective]",
  exportAs: "appTrainingInstructionsAudioDirective"
})
export class TrainingInstructionsAudioDirective {
  private audioPlayer: HTMLAudioElement;
  constructor(element: ElementRef) {
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

  public get currentTime(): Number {
    return this.audioPlayer.currentTime;
  }

  public get duration(): number {
    return this.audioPlayer.duration;
  }

  public get playbackComplete() {
    return this.duration === this.currentTime;
  }
}
