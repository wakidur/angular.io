import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewEncapsulation
} from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-video-player",
  templateUrl: "./video-player.component.html",
  styles: []
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  private youtubeUrlPrefix = "//www.youtube.com/embed/";
  @Input() videos: Array<string>;
  safeVideoUrls: Array<SafeResourceUrl>;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    console.log("ngOnChanges");
    this.safeVideoUrls = this.videos
      ? this.videos.map(v =>
          this.sanitizer.bypassSecurityTrustResourceUrl(
            this.youtubeUrlPrefix + v
          )
        )
      : this.videos;

  }

  ngOnInit() {
    console.log("ngOnInit");
  }
}
