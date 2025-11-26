import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISpells } from '../../spells.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-spells-card',
  imports: [ButtonModule],
  templateUrl: './spells-card.component.html',
  styleUrl: './spells-card.component.scss'
})
export class SpellsCardComponent {

  @Input() spell?: ISpells;

  @Output() onDetailClick: EventEmitter<String> = new EventEmitter<String>

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
  }

  showDetails(spellSlug: String): void {
    this.onDetailClick.emit(spellSlug);
  }

}
