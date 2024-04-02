import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {
  @ViewChild('ProductForm') productForm!: NgForm;
  readonly addlink="https://localhost:44301/api/Product/AddProducts";
  constructor(private https:HttpClient, private _snackBar: MatSnackBar){}
  products: {
    ID?: string;
    ProductName: string;
    quantity: number;
    IsActive: boolean;
} = {
    ID: '',
    ProductName: '',
    quantity: 0,
    IsActive: false
};
  addproduct(pro:{Pname:string,Pquan:number}){
    this.products={
    
      ProductName:pro.Pname,
      quantity:pro.Pquan,
      IsActive:true
    };
    this.https.post(this.addlink,this.products).subscribe((res)=>{
      console.log(res);
  });
  this._snackBar.open('Product successfully added', 'Close', {
  duration: 3000,
  });
  this.productForm.resetForm();
  }
}