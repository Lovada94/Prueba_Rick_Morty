import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(
    private router: Router,
  ){}

  getImageTitle(): String{
    return 'assets/images/harry-potter-logo.png'
  }

  getImageBackground(): String{
    return 'assets/images/harry-potter-fondo.webp'
  }

  navigateToCharacters (): void {
    this.router.navigate(['/characters']);
  }
}
