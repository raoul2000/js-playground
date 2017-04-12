import {Component, Input, OnChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Modal } from 'angular2-modal';
import { overlayConfigFactory } from 'angular2-modal';
import { VideoDialogContext, VideoDialogComponent } from './video-dialog.component';


@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player/video-player.html'
})
export class VideoPlayerComponent {
  private youtubeUrlPrefix = '//www.youtube.com/embed/';

  @Input() videos: Array<string>;
  safeVideoUrls: Array<SafeResourceUrl>;

  constructor(private modal: Modal) {}

  playVideo(videoId:string) {
    this.modal.open(
      VideoDialogComponent,
      overlayConfigFactory(new VideoDialogContext(videoId))
    );
  }
  /*
  ngOnChanges() {
    this.safeVideoUrls = this.videos ?
      this.videos.map(v => this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrlPrefix + v))
      : this.videos;
  }
  */
}
