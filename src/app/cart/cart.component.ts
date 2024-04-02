import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GetproductComponent } from '../getproduct/getproduct.component';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class CartComponent implements OnInit {
  PName: string = '';
  products:any[]=[];
  cartService = inject(CartService);

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private router: Router,private alertService:AlertService) {}

  ngOnInit(): void {
    const navigation = window.history.state;
    if (navigation && navigation.product) {
      const product = navigation.product;
      this.PName = product.PName;
      this.products.push(product);
    }
  }

  deleteFromCart(item: any): void {
    this.cartService.delete(item.id); 
    this.products = this.cartService.getItems();
  }
  placeOrder(orderData: any): void{
    this.cartService.placeOrder(orderData).subscribe(
      (orderedProducts:any[]) => {
        console.log('Order placed successfully!', orderedProducts);
        this.alertService.showSuccess('Order placed successfully!');
        this.cartService.clearOrderedProducts(orderedProducts);
      },
      (error:any) => {
        this.alertService.showError('Failed to place order. Please try again later.');
        console.error('Failed to place order:', error);
      }
    );
  }
  }