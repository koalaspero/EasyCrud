import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiformService {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    fresh:new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });
  constructor() { }

  populateForm(row: any){
    this.form.setValue({
      name: row.name,
      category: row.category,
      date: row.date,
      fresh: row.fresh,
      price: row.price,
      comment : row.comment
    })

  }
  


}
