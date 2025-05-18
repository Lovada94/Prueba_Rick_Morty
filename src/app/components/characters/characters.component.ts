import { Component } from '@angular/core';
import { ICharacter } from './characters.model';
import { IPagination } from '../utils/pagination.model';
import { CharactersService } from './characters.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-characters',
  imports: [NgIf, CommonModule,CardModule,ButtonModule,PaginatorModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {
  character: ICharacter[] = [];
  links: IPagination | null = null;
  currentPage: number = 1;
  totalRecords = 4675;
  rows = 10;
  first = 0;

  constructor(private characterService: CharactersService){}

  ngOnInit():void{
    this.getAllCharacters();
  }

  getAllCharacters(): void {
    this.characterService.getAllCharacters(this.currentPage).subscribe({
      next: (res) => {
        this.character = res.body!.data.map((characters) => characters.attributes);
        this.links = res.body!.links;
        console.log('Lamada completada')
        console.log(this.character)
      }
    });
  }

  trackByCharacterSlug(index: number, character: ICharacter): string {
    return character.slug;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
   }

   onPageChange(event: PaginatorState): void {
    this.currentPage = (event.page ?? 0) + 1;
    this.getAllCharacters();
  }
}
