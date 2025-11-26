import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPotions } from '../../potions.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-potions-card',
  imports: [ButtonModule],
  templateUrl: './potions-card.component.html',
  styleUrl: './potions-card.component.scss'
})
export class PotionsCardComponent {

  @Input() potion?: IPotions;

  @Output() onDetailClick: EventEmitter<String> = new EventEmitter<String>

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
  }

  showDetails(potionSlug: String): void {
    this.onDetailClick.emit(potionSlug);
  }

}
