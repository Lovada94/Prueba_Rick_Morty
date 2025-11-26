import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{

  formIsEmpty = false;
  filterForm?: FormGroup;

  constructor(
    private FormBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = this.FormBuilder.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      coments: ['', Validators.required]
    });
  }

  sendComents():void {
    this.formIsEmpty = this.verifyEmptyForm();

    if(this.filterForm) {
      const name = this.filterForm.get('name')?.value || '';
      const surnames = this.filterForm.get('surnames')?.value || '';
      const mail = this.filterForm.get('mail')?.value || '';
      const coments = this.filterForm.get('coments')?.value || '';
    
      console.log(name);
      console.log(surnames);
      console.log(mail);
      console.log(coments);
    }
  }

  private verifyEmptyForm():boolean {
    const formValues = this.filterForm!.value;
    return !formValues.name || !formValues.surnames || !formValues.mail || !formValues.coments;
  }

  hasErrorsName(fieldName: string): boolean {
    if (this.filterForm) {
      if (fieldName === 'name') {
        return this.verifyName();
      }
    }
    return false;
  }

  private verifyName(): boolean {
    return this.filterForm!.get('name')!.hasError('required') 
    && this.filterForm!.get('name')!.touched;
  }

  hasErrorsSurnames(fieldName: string): boolean {
    if (this.filterForm) {
      if (fieldName === 'surnames') {
        return this.verifySurnames();
      }
    }
    return false;
  }

  private verifySurnames(): boolean {
    return this.filterForm!.get('surnames')!.hasError('required') 
    && this.filterForm!.get('surnames')!.touched;
  }

  hasErrorsMail(fieldName: string): boolean {
    if (this.filterForm) {
      if (fieldName === 'mail') {
        return this.verifyMail();
      }
    }
    return false;
  }

  private verifyMail(): boolean {
    return this.filterForm!.get('mail')!.hasError('required') 
    && this.filterForm!.get('mail')!.touched;
  }

  hasErrorsMailPattern(fieldName: string): boolean {
    if (this.filterForm) {
      if (fieldName === 'mail') {
        return this.verifyMailPattern();
      }
    }
    return false;
  }

  private verifyMailPattern(): boolean {
    return this.filterForm!.get('mail')!.hasError('pattern') 
    && this.filterForm!.get('mail')!.touched;
  }

  hasErrorsComents(fieldName: string): boolean {
    if (this.filterForm) {
      if (fieldName === 'coments') {
        return this.verifyComents();
      }
    }
    return false;
  }

  private verifyComents(): boolean {
    return this.filterForm!.get('coments')!.hasError('required') 
    && this.filterForm!.get('coments')!.touched;
  }

  activateButton():boolean {
    if(!this.filterForm?.valid){
      return false;
    }
    return true;
  }

}
