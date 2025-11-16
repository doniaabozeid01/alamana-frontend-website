import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';



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
  video: any;

  constructor(private api: ApiService) { }


  ngOnInit() {
    this.api.GetAllVideos().subscribe({
      next: (res) => {
        console.log(res);

        this.video = res.find((v: any) => v.isDefault === true);
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
      }
    });
  }

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
