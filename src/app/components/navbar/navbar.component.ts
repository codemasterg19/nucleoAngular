import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor( private authService: AuthService, private router: Router, private cartService: CartService){}

  openCart(){
    this.cartService.showCart();
  }

  getCurrentUser(){
    return this.authService.getCurrentUser();
  }

  logout(){
    const confirmar = confirm("Estas seguro de cerrar sesión?");
    if(!confirmar) return;

    this.authService.logout()
    .then(() => {
      console.log("Sesión cerrada");
      this.router.navigate(['/login']);
    })
    .catch (err => console.log(err));
  }

}
