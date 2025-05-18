import { Component } from '@angular/core';
import { IPagination } from '../utils/pagination.model';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IPotions } from './potions.model';
import { PotionsService } from './potions.service';
import { ButtonModule } from 'primeng/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-potions',
  imports: [NgIf, CommonModule, ButtonModule, MatPaginatorModule],
  templateUrl: './potions.component.html',
  styleUrl: './potions.component.scss'
  
})
export class PotionsComponent {
potion: IPotions[] = [];
links: IPagination | null = null;
currentPage: number = 1;
length = 168;
pageSize = 10;
pageSizeOptions = [5, 10, 25, 100]


constructor(private potionService: PotionsService){}

  ngOnInit():void{
    this.getAllPotions();
  }

  getAllPotions(): void {
    this.potionService.getAllPotions(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.potion = res.body!.data.map((potions) => potions.attributes);
        this.links = res.body!.links;
        console.log('Lamada completada')
        console.log(this.potion)
      }
    });
  }

  trackByCharacterSlug(index: number, character: IPotions): string {
    return character.slug;
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

}
