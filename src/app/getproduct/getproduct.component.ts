import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../alert.service';

@Component({

  selector: 'app-getproduct',
  templateUrl: './getproduct.component.html',
  styleUrl: './getproduct.component.css',
})
export class GetproductComponent implements OnInit {
  readonly getk =
    'https://localhost:44301/api/Product/GetAllProducts';
    cartService = inject(CartService);
    products: any;
  
  constructor(private https: HttpClient, private router:Router,private alertService: AlertService ) {}
  ngOnInit(): void {
  this.getProduct();
  }
  getProduct() {
    this.https.get(this.getk).subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }
  searchText:string = '';

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
  }
  addToCart(product:any):void{
    if (product.quantity === 0) {
      this.alertService.showError('This product is out of stock.');
      return; 
    }
    this.cartService.addToCart(product);
    this.alertService.showSuccess('Product added to cart!');
  } 
}

