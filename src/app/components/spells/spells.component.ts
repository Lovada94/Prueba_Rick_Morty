import { SpellsService } from './spells.service';
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IPagination } from '../utils/pagination.model';
import { ISpells } from './spells.model';

@Component({
  selector: 'app-spells',
  imports: [NgIf, CommonModule],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  character: ISpells[] = [];
  links: IPagination | null = null;
  currentPage: number = 1;
  totalRecords = 315;
  rows = 10;
  first = 0;

constructor(private spellService: SpellsService){}

  ngOnInit():void{
      this.getAllCharacters();
    }

  getAllCharacters(): void {
    this.spellService.getAllCharacters(this.currentPage).subscribe({
      next: (res) => {
        this.character = res.body!.data.map((spells) => spells.attributes);
        this.links = res.body!.links;
        console.log('Lamada completada')
        console.log(this.character)
      }
    });
  }

  trackByCharacterSlug(index: number, character: ISpells): string {
    return character.slug;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
    }

//   onPageChange(event: PaginatorState): void {
//   this.currentPage = (event.page ?? 0) + 1;
//   this.getAllCharacters();
// }

}
