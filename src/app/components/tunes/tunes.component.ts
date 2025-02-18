import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuneComponent } from "./tune/tune.component";
import { TuneserviceService } from '../../services/tuneservice.service';
import { SubscribeComponent } from "./subscribe/subscribe.component";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tunes',
  imports: [TuneComponent, CommonModule, SubscribeComponent, RouterModule, FormsModule],
  templateUrl: './tunes.component.html',
  styleUrl: './tunes.component.css'
})
export class TunesComponent implements OnInit {
  currentPageTunesCount: number = 0;
  tunes: any[] = [];
  searchText: string = '';
  skip: number = 0;
  limit: number = 10;
  totalTunes: number = 0;
  currentAudio: HTMLAudioElement | null = null;
  playingTune: string | null = null;
  showSubscribe: boolean = false;
  currentView: string = 'tune';
  selectedTune: any = null;

  constructor(private tunesService: TuneserviceService) { }
  
  ngOnInit() {
    this.fetchTunes();
  }

  fetchTunes() {
    this.tunesService.getTunes(this.skip, this.limit, this.searchText).subscribe(tunes => {
      this.tunes = tunes;
      this.totalTunes = tunes.length;
      this.currentPageTunesCount = this.tunes.length;
    });
  }
  
  togglePlay(fileName: string) {
    if (this.currentAudio) {
      if (this.playingTune === fileName) {
        if (this.currentAudio.paused) {
          this.currentAudio.play();
        } else {
          this.currentAudio.pause();
        }
        return;
      }
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    this.currentAudio = new Audio(fileName);
    this.currentAudio.play();
    this.playingTune = fileName;

    // Reset when the audio ends
    this.currentAudio.onended = () => {
      this.currentAudio = null;
      this.playingTune = null;
    };
  }
  prevousPage() {
    if (this.skip > 0) {
      this.skip -= this.limit;
      this.fetchTunes();
    }
  }
  nextPage() {
    if (this.currentPageTunesCount === this.limit) {
      this.skip += this.limit;
      this.fetchTunes();
    }
  
  }

  get currentPage(): number {
    return Math.floor(this.skip / this.limit) + 1;
  }
  tuneSubscribed(tune: any) {
    console.log("need to dispalye the tune component")
    localStorage.setItem('skiza_code', tune)
    this.currentView = 'showSubscribe';
    this.selectedTune = tune;
  }

  backToTunes() {
    this.currentView = 'tune'; 
    this.showSubscribe = false;
  }
}
