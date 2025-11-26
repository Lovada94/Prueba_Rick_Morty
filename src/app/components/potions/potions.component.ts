import { Component } from '@angular/core';
import { IPagination } from '../utils/pagination.model';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IPotions } from './potions.model';
import { PotionsService } from './potions.service';
import { ButtonModule } from 'primeng/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PotionsDetailModalComponent } from '../shared/potions-detail-modal/potions-detail-modal.component';
import { FormsModule } from '@angular/forms';
import { PotionsCardComponent } from './potions-card/potions-card/potions-card.component';

@Component({
  selector: 'app-potions',
  imports: [NgIf, CommonModule, ButtonModule, MatPaginatorModule, MatDialogModule, FormsModule, PotionsCardComponent],
  templateUrl: './potions.component.html',
  styleUrl: './potions.component.scss',
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class PotionsComponent {
potion: IPotions[] = [];
links: IPagination | null = null;
currentPage: number = 1;
length = 168;
pageSize = 10;
pageSizeOptions = [5, 10, 20, 30]

name = '';
errorOnSearch = false;


constructor(
  private potionService: PotionsService,
  private dialogService: MatDialog
){}

  ngOnInit():void{
    this.getAllPotions();
  }

  getAllPotions(): void {
    this.potionService.getAllPotions(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.potion = res.body!.data.map((potions) => potions.attributes);
        this.links = res.body!.links;
      }
    });
  }

  trackByPotionSlug(index: number, potion: IPotions): string {
    return potion.slug;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sin_imagen.jpg'
    }

  onPageChange(event: PageEvent): void {
    this.currentPage = (event.pageIndex ?? 0) + 1;
    this.pageSize = (event.pageSize)
    this.getAllPotions();
  }

  showDetails(potionSlug: String) {
    this.dialogService.open(PotionsDetailModalComponent, {
    data: { slug: potionSlug },
    width: '50vw'
    });
  }

  searchPotions(): void {
    if (this.name !== '') {
     this.potionService.getPotionByName(this.name).subscribe({
      next: (res) => {
        this.potion = [];
        this.potion = res.body!.data.map((spells) => spells.attributes);
        this.length = this.length;
        this.errorOnSearch = this.potion.length === 0;
      },
      error: (err) => {
        this.errorOnSearch = true;
        this.potion = [];
      }
     })
    }
    if (this.name === '') {
      this.getAllPotions();
      this.errorOnSearch = false;
    }
  }

  getImage(): string {
    return 'assets/images/curiosity-search-cuate.svg';
  }

}
