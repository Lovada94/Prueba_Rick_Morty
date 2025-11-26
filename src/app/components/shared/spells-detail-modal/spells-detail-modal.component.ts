import { SpellsService } from './../../spells/spells.service';
import { Component, OnInit } from '@angular/core';
import { ISpells } from '../../spells/spells.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-spells-detail-modal',
  imports: [CommonModule, ButtonModule],
  templateUrl: './spells-detail-modal.component.html',
  styleUrl: './spells-detail-modal.component.scss'
})
export class SpellsDetailModalComponent implements OnInit {
  slug!: string;
  spell?: ISpells

  constructor(
    private spellsService: SpellsService,
    private dialogRef: NgbActiveModal
  ){}

  ngOnInit(): void {
    if (this.slug) {
      this.getSpell(this.slug)
    }
  }

  getSpell(slug: string){
    this.spellsService.getSpell(slug).subscribe({
      next: (res) => {
        this.spell = res.body!.data.attributes
      }
    })
  }

  close(): void{
    this.dialogRef.close();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
  }

}
