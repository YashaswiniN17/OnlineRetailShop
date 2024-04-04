import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items:any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

  constructor(private http: HttpClient) { }

  addToCart(product: any): void {

    const newItem = { ...product,  Quantity: 1}; 
    this.items.push(newItem);
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
  isProductInCart(product: any): boolean {
    return this.items.some(item => item.id === product.id); 
  }

  getItems(): any[] {
    return this.items;
  }
  removeOrderedProducts(orderedProducts: any[]): void {
    // Filter out the ordered products from the cart
    this.items = this.items.filter(item => !orderedProducts.includes(item));
  }
    delete(id: number): void {
    this.items = this.items.filter((item) => item.id !== id); 
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  incrementQuantity(id: number): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.Quantity++;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  decrementQuantity(id: number): void {
    const item = this.items.find((i) => i.id === id);
    if (item && item.Quantity > 0) {
      item.Quantity--;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
  placeOrder(orderData: any) {
    return this.http.post<any>('https://localhost:44301/api/OrderProduct/Order', orderData);
  }
  clearOrderedProducts(orderedProducts: any[]): void {
    this.items = this.items.filter(item => !orderedProducts.includes(item));
  }
}