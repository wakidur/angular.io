import { Directive, ElementRef } from "@angular/core";
/**
 * Remember that directives are HTML extensions without a view.
 * In Angular, the only place where direct DOM manipulation is acceptable and practiced is inside directives.
 */

 /**
  * The preceding selector property allows the framework to identify where to apply the directive.
  * We have replaced the generated [abeMyAudioDirective] attribute selector with just audio.
  */

  /**
   * The MyAudioDirective API has two functions (start and stop)
   *  and three getters (currentTime, duration, and a Boolean property called playbackComplete).
   */
@Directive({
  selector: "audio",
  exportAs: "MyAudio"
})
export class MyAudioDirective {
  public audioPlayer: HTMLAudioElement;
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

  public get playbackComplete() {
    return this.duration == this.currentTime;
  }
}
