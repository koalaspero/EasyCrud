import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDBService } from '../services/product-db.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  title = "Details"
  product: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public details: any, 
  private api: ProductDBService, private dialogRef: MatDialogRef<DetailComponent>) { }

  ngOnInit(): void {

  }

  deleteProduct(){
    this.api.deleteProd(this.details.product.id).subscribe({
      next:(res)=>{
        alert("Product deleted successfully")
        this.dialogRef.close('delete');
      },
      error: ()=>{
        alert("Error while deleting the product")
      }
    })
  }
}
