import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CharactersService } from '../../characters/characters.service';
import { ICharacter } from '../../characters/characters.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-detail-modal',
  imports: [CommonModule, ButtonModule],
  templateUrl: './character-detail-modal.component.html',
  styleUrl: './character-detail-modal.component.scss'
})
export class CharacterDetailModalComponent implements OnInit{

  character?: ICharacter;

  constructor(
    private characterService: CharactersService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ){}

  ngOnInit(): void {
    if (this.config.data?.slug){
      this.getCharacter(this.config.data.slug)
    }
  }

  getCharacter(slug: string) {
    this.characterService.getCharacter(slug).subscribe({
      next: (res) => {
        this.character = res.body!.data.attributes;
      }
    })
  }

  close(): void{
    this.ref.close();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
  }

}
