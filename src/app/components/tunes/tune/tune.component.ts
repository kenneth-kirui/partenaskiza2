import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tune',
  imports: [RouterModule, CommonModule],
  templateUrl: './tune.component.html',
  styleUrl: './tune.component.css'
})
export class TuneComponent {
  constructor(private router: Router, private route: ActivatedRoute){}

isPlaying:boolean = false;
 @Input()
  tune: {
    name: string,
    user_id: number,
    code: number,
    file_name:string
  } = { name: '', user_id: 0, code: 0, file_name: '' };
  @Input() playingTune: string | null = null;
  @Output() togglePlay = new EventEmitter<string>(); 
  @Output() subscribe = new EventEmitter<any>();
  

  onTogglePlay() {
    this.togglePlay.emit(this.tune.file_name);
  }
}
