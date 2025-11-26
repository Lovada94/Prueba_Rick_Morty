import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { IPotions } from '../../potions/potions.model';
import { PotionsService } from '../../potions/potions.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-potions-detail-modal',
  imports: [CommonModule, ButtonModule],
  templateUrl: './potions-detail-modal.component.html',
  styleUrl: './potions-detail-modal.component.scss'
})
export class PotionsDetailModalComponent implements OnInit{

  potions?: IPotions;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {slug: string},
    private potionsService: PotionsService,
    private dialogRef: MatDialogRef<PotionsDetailModalComponent>
  ){}

  ngOnInit(): void {
    if (this.data?.slug){
      this.getPotion(this.data.slug)
    }
  }

  getPotion(slug: string){
    this.potionsService.getPotion(slug).subscribe({
      next: (res) => {
        this.potions = res.body!.data.attributes;
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
