import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
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
  selector: 'app-many-videos',
  templateUrl: './many-videos.component.html',
  styleUrls: ['./many-videos.component.scss']
})
export class ManyVideosComponent {
  isRtl = document.documentElement.dir === 'rtl';

  catOptions: OwlOptions = {
    loop: false,
    dots: false,
    mouseDrag: true,
    touchDrag: true,
    nav: false,
    rtl: true,
    // stagePadding: 30 ,
    responsive: {
      0: { items: 1, margin: 8 },
      700: { items: 2, margin: 10 },
      1200: { items: 3, margin: 16 }
    }
  };

  trackById = (_: number, cat: any) => cat.id;

  videos: any;
  nonDefaultVideos: any;
  defaultVideo: any;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.api.GetAllVideos().subscribe({
      next: (res) => {
        console.log('res: ', res);

        // أول حاجة: تأكد إن res عبارة عن array
        // const list = Array.isArray(res) ? res : (res?.items ?? []);

        this.videos = res;
        this.defaultVideo = this.videos.find((v: any) => v.isDefault === true);
        this.nonDefaultVideos = this.videos.filter((v: any) => !v.isDefault);


        console.log('defaultVideo: ', this.defaultVideo);
        console.log('nonDefaultVideos: ', this.nonDefaultVideos);
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
      }
    });
  }



  @ViewChild('catCarousel', { static: false }) catCarousel!: CarouselComponent;

  goToProducts(id: number) { this.router.navigate(['products', id]); }

  // ----- Video state management -----
  private stateMap = new WeakMap<HTMLVideoElement, VideoState>();
  private ensureState(v: HTMLVideoElement): VideoState {
    let s = this.stateMap.get(v);
    if (!s) {
      s = {
        duration: 0,
        currentTime: 0,
        volume: v.volume ?? 1,
        muted: v.muted,
        bufferedEnd: 0,
        playing: !v.paused
      };
      this.stateMap.set(v, s);
    }
    return s;
  }
  state(v: HTMLVideoElement) { return this.ensureState(v); }
  isPlayingEl(v: HTMLVideoElement) { return this.ensureState(v).playing; }

  toggleVideo(v: HTMLVideoElement) {
    const s = this.ensureState(v);
    if (v.paused) { v.play(); s.playing = true; }
    else { v.pause(); s.playing = false; }
  }
  onLoaded(v: HTMLVideoElement) {
    const s = this.ensureState(v);
    s.duration = v.duration || 0;
    s.volume = v.volume ?? 1;
    s.muted = v.muted;
    this.onProgress(v);
  }
  onTimeUpdate(v: HTMLVideoElement) {
    const s = this.ensureState(v);
    s.currentTime = v.currentTime || 0;
  }
  onProgress(v: HTMLVideoElement) {
    const s = this.ensureState(v);
    try {
      const b = v.buffered;
      s.bufferedEnd = b.length ? b.end(b.length - 1) : 0;
    } catch { s.bufferedEnd = 0; }
  }
  getProgress(v: HTMLVideoElement) {
    const s = this.ensureState(v);
    return s.duration ? Math.min(100, (s.currentTime / s.duration) * 100) : 0;
  }
  getBuffered(v: HTMLVideoElement) {
    const s = this.ensureState(v);
    return s.duration ? Math.min(100, (s.bufferedEnd / s.duration) * 100) : 0;
  }
  seekByClick(e: MouseEvent, v: HTMLVideoElement) {
    const bar = e.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (isFinite(v.duration)) v.currentTime = Math.max(0, Math.min(v.duration * ratio, v.duration - 0.1));
  }
  changeVolume(v: HTMLVideoElement, e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    v.volume = val; v.muted = val === 0;
    const s = this.ensureState(v); s.volume = val; s.muted = v.muted;
  }
  toggleMute(v: HTMLVideoElement) {
    v.muted = !v.muted;
    this.ensureState(v).muted = v.muted;
  }
  toggleFullscreen(wrapper: HTMLElement) {
    const d: any = document;
    if (!d.fullscreenElement) wrapper.requestFullscreen?.();
    else d.exitFullscreen?.();
  }
  formatTime(sec?: number) {
    if (sec === undefined || isNaN(sec)) return '0:00';
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    const m = Math.floor(sec / 60).toString();
    return `${m}:${s}`;
  }

  dragging = false;

}
