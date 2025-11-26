import { Component, OnInit, ViewChild } from '@angular/core';
import { ICharacter, ICharacterFilter } from './characters.model';
import { IPagination } from '../utils/pagination.model';
import { CharactersService } from './characters.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CharacterDetailModalComponent } from '../shared/character-detail-modal/character-detail-modal.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToggleSwitchModule, ToggleSwitch } from 'primeng/toggleswitch';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CharacterCardComponent } from './character-card/character-card/character-card.component';

@Component({
  selector: 'app-characters',
  imports: [NgIf, 
    CommonModule, 
    CardModule, 
    ButtonModule, 
    PaginatorModule, 
    ProgressSpinnerModule, 
    ToggleSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    CharacterCardComponent
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  providers: [DialogService]
})
export class CharactersComponent implements OnInit{
  @ViewChild('toggleSwitch') toggleSwitch!: ToggleSwitch;
  character: ICharacter[] = [];
  links: IPagination | null = null;

  currentPage: number = 1;
  totalRecords = 4675;
  rows = 10;
  first = 0;
  rowsPerPageOptions = [5, 10, 20, 30];

  modalRef: DynamicDialogRef | undefined;

  loadingCharacters = true;

  errorOnSearch = false;
  formIsEmpty = false;
  switchFilter = false;
  filterForm?: FormGroup;
  house = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
  gender = ['Femenino', 'Masculino']
  filterOptions: ICharacterFilter = {
    page: 1,
    rows: 10,
    name: '',
    gender: '',
    house: ''
  }

  constructor(
    private characterService: CharactersService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit():void{
    this.initForm();
    this.getAllCharacters();
  }

  getAllCharacters(): void {
    this.characterService.getAllCharacters(this.filterOptions).subscribe({
      next: (res) => {
        this.character = res.body!.data.map((characters) => characters.attributes);
        this.links = res.body!.links;
        this.loadingCharacters = false;
        this.errorOnSearch = this.character.length === 0;
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
  this.rows = (event.rows ?? this.rows);

  this.filterOptions.page = this.currentPage;
  this.filterOptions.rows = this.rows;

  this.loadingCharacters = true;
  this.getAllCharacters();
  }

  showDetails(characterSlug: String) {
    this.modalRef = this.dialogService.open(CharacterDetailModalComponent, {
      data: {
      slug: characterSlug
    },
    width: '50vw',
    showHeader: false,
    focusOnShow: false
    });
  }

  searchCharacters(): void {
    this.formIsEmpty = this.verifyEmptyForm();
  
    if (this.filterForm) {
      this.filterOptions.name = this.filterForm.get('name')?.value || '';
      
      if (this.switchFilter) {
        this.filterOptions.house = this.filterForm.get('house')?.value || '';
        this.filterOptions.gender = this.translateGender(this.filterForm.get('gender')?.value) || '';
      } else {
        this.filterOptions.house = '';
        this.filterOptions.gender = '';
      }
  
      this.filterOptions.page = 1;
      this.filterOptions.rows = this.rows;
  
      this.getAllCharacters();
    }
  }

  getImage(): string {
    return 'assets/images/curiosity-search-cuate.svg';
  }

  handleSwitchFilter(): void {
    this.switchFilter = !this.switchFilter;

    if (this.filterForm) {
      const houseControl = this.filterForm.get('house');
      const genderControl = this.filterForm.get('gender');

      if (this.switchFilter) {
        houseControl?.enable();
        genderControl?.enable();
      } else {
        houseControl?.disable();
        genderControl?.disable();
      }
    }
  }

  hasErrorsHouse(fieldName: string): boolean {
    if (this.filterForm) {
      if (fieldName === 'house' && this.switchFilter) {
        return this.verifyHouse();
      }
    }

    return false;
  }

  hasErrorsGender(fieldName: string): boolean {
    if (this.filterForm) {
      if (fieldName === 'gender' && this.switchFilter) {
        return this.verifyGender();
      }
    }

    return false;
  }

  clearFormAndFilters(): void {
    if (this.filterForm) {
      this.toggleSwitch.writeValue(false);
      this.filterForm.reset({
        name: '',
        gender: { value: '', disabled: true },
        house: { value: '', disabled: true }
      });
      this.filterOptions.name = '';
      this.filterOptions.house = '';
      this.filterOptions.gender = '';
      this.currentPage = 1;
      this.filterOptions.rows = this.rows;
      this.formIsEmpty = false;
      this.getAllCharacters();
    }
  }

  initForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [''],
      house: [{value: '', disabled: true}, Validators.required],
      gender: [{value: '', disabled: true}, Validators.required]
    });
  }

  private verifyHouse(): boolean {
    return this.filterForm!.get('house')!.hasError('required') 
    && this.filterForm!.get('house')!.touched;
  }

  private verifyGender(): boolean {
    return this.filterForm!.get('gender')!.hasError('required') 
    && this.filterForm!.get('gender')!.touched;
  }

  private verifyEmptyForm(): boolean {
    const formValues = this.filterForm!.value;
    return !formValues.name && !formValues.house && !formValues.gender;
  }

  private translateGender(gender: string): string {
    if (gender === 'Masculino') {
      return 'Male';
    }
    if (gender === 'Femenino') {
      return 'Female';
    }
    return '';
  }
}
