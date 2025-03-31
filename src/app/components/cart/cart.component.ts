import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Curso } from '../../types/curso';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor( private cartService: CartService) { }

  getCursos() {
    return this.cartService.getCursos();
  }

  closeCart(){
    this.cartService.hideCart();
  }

  removeCurso(curso: Curso) {
    this.cartService.removeCurso(curso);
  }

  getTotal(){
    return this.cartService.getTotal();
  }

}
