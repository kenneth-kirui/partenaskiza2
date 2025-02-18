import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { TunesComponent } from "./components/tunes/tunes.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule, NavComponent, HomeComponent, AboutComponent, ContactsComponent, TunesComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'section-navigation';

  isScrolled: boolean = false;

  currentSection: string = 'home';
  
  constructor(private viewportScroller: ViewportScroller) {}

  navigateToSection(section: string): void {
    switch (section) {
      case 'home':
        console.log('Navigate to Home section');
        this.viewportScroller.scrollToAnchor(section);
        break;
      case 'about':
        console.log('Navigate to About section');
        this.viewportScroller.scrollToAnchor(section);
        break;
      case 'tune':
        console.log('Navigate to Tune section');
        this.viewportScroller.scrollToAnchor(section);
        break;
      case 'contacts':
        console.log(`Navigate to Contacts section ${section}`);
        this.viewportScroller.scrollToAnchor(section);
        break;
      default:
        console.log('Section not found, navigating to Home section');
        this.viewportScroller.scrollToAnchor('home');
        break;
        
     
    }
  }
}
