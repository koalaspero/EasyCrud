import { Component, Inject, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDBService } from './services/product-db.service';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularCrud';
  dataList: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Producto', 'Categoria','Fecha','Fresh','Price','Action'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  searchKey: string = "";

  constructor(private dialog: MatDialog, private api: ProductDBService) {
    this.getAllProducts()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe( dialogResult => {
      if(dialogResult == "save"){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(row: any){
    this.dialog.open(DetailComponent, {
      width: '40%',
      data: {product: row, delete: false},
      disableClose: false
    }).afterClosed().subscribe( dialogResult => {
      if(dialogResult == "delete"){
        this.getAllProducts();
      }
    })
  }

  details(row: any){
    this.dialog.open(DetailComponent, {
      width: '40%',
      data: {product: row, delete: true},
      disableClose: false
    })
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe( dialogResult => {
      if(dialogResult == "update"){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next: (res)=>{
        this.dataList = new MatTableDataSource<any>(res);
        this.dataList.paginator = this.paginator;
      },
      error: (err)=>{
        alert("Error while fetching the records")
      }
    })
  }

}
