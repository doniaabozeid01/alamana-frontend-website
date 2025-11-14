import { Component } from '@angular/core';



interface VideoState {
  duration: number;
  currentTime: number;
  volume: number;
  muted: boolean;
  bufferedEnd: number; // seconds
  playing: boolean;
}



@Component({
  selector: 'app-one-video',
  templateUrl: './one-video.component.html',
  styleUrls: ['./one-video.component.scss']
})
export class OneVideoComponent {

isPlayingEl(videoWrapper: HTMLElement): boolean {
  const video = videoWrapper.querySelector('video') as HTMLVideoElement;
  return !video.paused;
}

toggleVideo(videoWrapper: HTMLElement) {
  const video = videoWrapper.querySelector('video') as HTMLVideoElement;

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

}
