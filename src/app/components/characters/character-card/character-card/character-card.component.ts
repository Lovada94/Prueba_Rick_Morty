import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ICharacter } from '../../characters.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-card',
  imports: [ButtonModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {

  @Input() character?: ICharacter;

  @Output() onDetailClick: EventEmitter<String> = new EventEmitter<String>

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
  }

  showDetails(characterSlug: String): void {
    this.onDetailClick.emit(characterSlug);
  }

}
