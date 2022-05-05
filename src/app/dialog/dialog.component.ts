import { Component, Inject, OnInit } from '@angular/core';
import { ApiformService } from '../services/apiform.service';
import { ProductDBService } from '../services/product-db.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  freshList = ["Brand New","Second Hand","Refurbished"]
  actionBtn= "Save"
  title = "Register new data"
  constructor(public formDB: ApiformService, @Inject(MAT_DIALOG_DATA) public editData: any, 
    private api: ProductDBService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    if(this.editData){
      this.formDB.populateForm(this.editData);
      this.actionBtn = "Update"
      this.title = "Update data"
    }else{
      this.formDB.form.reset();
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.formDB.form.valid){
        this.api.postProduct(this.formDB.form.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully")
            this.formDB.form.reset();
            this.dialogRef.close('save');
          },
          error: ()=>{
            alert("Error while adding the product")
          }
        })
      }
    }else{
      this.api.updateProd(this.editData.id, this.formDB.form.value)
      .subscribe({
        next: (res) => {
          alert("Product updated successfully");
          this.formDB.form.reset();
          this.dialogRef.close('update')
        },
        error: () =>{
          alert("Product could not be updated")
        }
      })
    }
  }

}
