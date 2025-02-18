import { Routes } from '@angular/router';
import { SubscribeComponent } from './components/tunes/subscribe/subscribe.component';
import { TunesComponent } from './components/tunes/tunes.component';
import { TuneComponent } from './components/tunes/tune/tune.component';

export const routes: Routes = [
    {
    path: 'tunes',
    component: TunesComponent,
    children: [
      { path: 'tune', component: TuneComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: '', redirectTo: 'tune', pathMatch: 'full' }
    ]
  }
    
];
