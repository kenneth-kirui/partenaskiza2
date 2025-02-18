import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent  {

  isScrolled: boolean = false;

  
  
  @Output() navigate = new EventEmitter<string>();
  isMenuActive: boolean = false;
  navigateToSection(section: string): void {
    this.isMenuActive = false;
    this.navigate.emit(section);
  }
  
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }
}
