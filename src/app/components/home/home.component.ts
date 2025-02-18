import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   @Output() navigate = new EventEmitter<string>();
    isMenuActive: boolean = false;
  navigateToSection(section: string): void {
      console.log('Navigating to section:', section);
      this.isMenuActive = false;
      this.navigate.emit(section);
    }

}
