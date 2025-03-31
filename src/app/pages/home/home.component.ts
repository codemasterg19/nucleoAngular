import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userData: any;
  isLoggedIn: boolean = false;

  constructor(private userService: UsersService, private router: Router) {}

  async ngOnInit() {
    const user = await this.userService.getCurrentUser();
    if (user) {
      this.userData = user;
      this.isLoggedIn = true;
    }
  }
}
