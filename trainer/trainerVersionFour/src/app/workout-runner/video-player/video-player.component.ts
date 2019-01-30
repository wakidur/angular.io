import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewEncapsulation
} from "@angular/core";

import { Modal } from "ngx-modialog/plugins/bootstrap";
import { overlayConfigFactory } from "ngx-modialog";
import {
  VideoDialogComponent,
  VideoDialogContext
} from "./video-dialog/video-dialog.component";

@Component({
  selector: "app-video-player",
  templateUrl: "./video-player.component.html",
  styles: []
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  @Input() videos: Array<string>;

  constructor(private modal: Modal) {}

  ngOnChanges() {}

  ngOnInit() {}

  /**
   * playVideo
   */
  public playVideo(videoId: string) {
    this.modal.open(
      VideoDialogComponent,
      overlayConfigFactory(new VideoDialogContext(videoId))
    );
  }
}
