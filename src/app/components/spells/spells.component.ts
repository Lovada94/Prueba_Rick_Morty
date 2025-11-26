import { SpellsDetailModalComponent } from './../shared/spells-detail-modal/spells-detail-modal.component';
import { SpellsService } from './spells.service';
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IPagination } from '../utils/pagination.model';
import { ISpells } from './spells.model';
import { ButtonModule } from 'primeng/button';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SpellsCardComponent } from './spells-card/spells-card/spells-card.component';

@Component({
  selector: 'app-spells',
  imports: [NgIf, CommonModule, ButtonModule,NgbPaginationModule, FormsModule, SpellsCardComponent],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  spell: ISpells[] = [];
  links: IPagination | null = null;
  currentPage: number = 1;
  collectionSize = 315;
  pageSize = 10;
  page = 1;

  name = '';
  errorOnSearch = false;

constructor(
  private spellService: SpellsService,
  private dialogSerice: NgbModal
){}

  ngOnInit():void{
      this.getAllSpells();
    }

  getAllSpells(): void {
    this.spellService.getAllSpells(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.spell = res.body!.data.map((spells) => spells.attributes);
        this.links = res.body!.links;
        console.log('Lamada completada')
        console.log(this.spell)
      }
    });
  }

  trackBySpellSlug(index: number, spell: ISpells): string {
    return spell.slug;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
    }

  onPageChange(event: number): void {
    this.currentPage = event;
    this.getAllSpells();
  }

  showDetails(spellSlug: String){
    const modalRef = this.dialogSerice.open(SpellsDetailModalComponent, {
      size: 'large',
      backdrop: 'static'
    });
    modalRef.componentInstance.slug = spellSlug;
  }

  searchSpells(): void {
    if (this.name !== '') {
     this.spellService.getSpellByName(this.name).subscribe({
      next: (res) => {
        this.spell = [];
        this.spell = res.body!.data.map((spells) => spells.attributes);
        this.collectionSize = this.collectionSize;
        this.errorOnSearch = this.spell.length === 0;
      },
      error: (err) => {
        this.errorOnSearch = true;
        this.spell = [];
      }
     })
    }
    if (this.name === '') {
      this.getAllSpells();
      this.errorOnSearch = false;
    }
  }

  getImage(): string {
    return 'assets/images/curiosity-search-cuate.svg';
  }

}
